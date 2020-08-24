let chai = require('chai');
const chaiHttp = require('chai-http');
const moment = require('moment');

const app = require('../app');
const { Record } = require('../models/models');

chai.use(chaiHttp);
const expect = chai.expect;
let requester;

describe('ENDPOINT /status', function () {
	beforeEach(function () {
		requester = chai.request(app);
	});

	afterEach(function () {
		requester.close();
	});

	it('should return error message when query.route is missing', done => {
		requester.get('/status').end((err, res) => {
			if (err) {
				done(err);
			}
			expect(res.body).to.have.property('error', 'Please provide a valid route.');
			return done();
		});
	});

	it('should return appropriate status when query.route is provided', done => {
		const sampleRoute = 'A';
		Record.findOne({
			where: {
				routeName: sampleRoute
			},
			order: [['id', 'DESC']]
		})
			.then(record => {
				requester.get(`/status?route=${sampleRoute}`).end((err, res) => {
					if (err) {
						done(err);
					}
					if (!record) {
						expect(res.body).to.have.property(
							'message',
							`No information is available for route ${sampleRoute}.`
						);
					} else {
						expect(res.body).to.have.property('route', sampleRoute);
						expect(res.body).to.have.property('delayed', record.delay);
						expect(res.body).to.have.property('timestamp');
					}
					return done();
				});
			})
			.catch(err => done(err));
	});
});

describe('ENDPOINT /uptime', function () {
	beforeEach(function () {
		requester = chai.request(app);
	});

	afterEach(function () {
		requester.close();
	});

	it('should return error message when query.route is missing', done => {
		requester.get('/uptime').end((err, res) => {
			if (err) {
				done(err);
			}
			expect(res.body).to.have.property('error', 'Please provide a valid route.');
			return done();
		});
	});

	it('should return appropriate uptime when query.route is provided', done => {
		const sampleRoute = 'test-route';
		const sampleRecords = [
			{
				routeName: sampleRoute,
				datetime: new Date('2020-08-24T10:00:00.000Z'),
				delay: true
			},
			{
				routeName: sampleRoute,
				datetime: new Date('2020-08-24T11:00:00.000Z'),
				delay: false
			},
			{
				routeName: sampleRoute,
				datetime: new Date('2020-08-24T14:00:00.000Z'),
				delay: true
			}
		];
		Record.bulkCreate(sampleRecords)
			.then(() => {
				requester.get(`/uptime?route=${sampleRoute}`).end(async (err, res) => {
					if (err) {
						done(err);
					}

					const now = new Date();
					const total = now - sampleRecords[0].datetime;
					const downtime =
						now -
						sampleRecords[2].datetime +
						(sampleRecords[1].datetime - sampleRecords[0].datetime);
					const percentage = 1 - downtime / total;

					expect(res.body).to.have.property('route', sampleRoute);
					expect(res.body.uptime).to.be.approximately(percentage, 0.001);
					expect(res.body).to.have.property('start', moment(sampleRecords[0].datetime).format());
					expect(res.body).to.have.property('end');
					await Record.destroy({ where: { routeName: sampleRoute } });
					return done();
				});
			})
			.catch(err => done(err));
	});
});

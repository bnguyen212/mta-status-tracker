const express = require('express');
const moment = require('moment');

const router = express.Router();

const { Record } = require('../models/models');

/**
 * TODO (IMPROVEMENT): add a timestamp value in req.query to view route status at a given time
 */
router.get('/status', function (req, res, next) {
	if (req.query.route) {
		Record.findOne({
			where: {
				routeName: req.query.route
			},
			order: [['id', 'DESC']]
		})
			.then(record => {
				if (record) {
					const response = {
						route: record.routeName,
						delayed: record.delay,
						timestamp: moment(record.datetime).format()
					};
					res.json(response);
				} else {
					res.json({ message: `No information is available for route ${req.query.route}.` });
				}
			})
			.catch(err => {
				console.error(err);
				res.json({ error: 'Internal error, please try again later.' });
			});
	} else {
		res.json({ error: 'Please provide a valid route.' });
	}
});

router.get('/uptime', function (req, res, next) {
	if (req.query.route) {
		Record.findAll({
			where: { routeName: req.query.route },
			order: [['id', 'ASC']]
		})
			.then(records => {
				if (!records.length) {
					return res.json({ message: `No record found for route ${req.query.route}.` });
				}
				let totalTime = 0;
				let downTime = 0;
				for (let i = 1; i < records.length; i++) {
					const difference = records[i].datetime - records[i - 1].datetime;
					if (!records[i].delay) {
						downTime += difference;
					}
					totalTime += difference;
				}
				// calculate the time between now and last record
				const now = new Date();
				const fromNowtoLastRecord = now - records[records.length - 1].datetime;
				totalTime += fromNowtoLastRecord;
				if (records[records.length - 1].delay) {
					downTime += fromNowtoLastRecord;
				}

				const response = {
					route: req.query.route,
					uptime: 1 - downTime / totalTime,
					start: records[0].datetime,
					end: now
				};

				res.json(response);
			})
			.catch(err => {
				console.error(err);
				res.json({ error: 'Internal error, please try again later.' });
			});
	} else {
		res.json({ error: 'Please provide a valid route' });
	}
});

module.exports = router;

const Nightmare = require('nightmare');
const $ = require('cheerio');

const { Record } = require('../models/models');

const engine = Nightmare({ show: false });

const MTA_URL = 'https://new.mta.info/';

// Print to the console whenever a route changes status from delay to no delay, and vice versa
const checkStatusChange = (routeName, currentlyDelayed) => {
	return Record.findOne({
		where: {
			routeName
		},
		order: [['id', 'DESC']]
	}).then(record => {
		if (record && record.delay !== currentlyDelayed) {
			const msg = currentlyDelayed ? 'experiencing delays' : 'now recovered';
			console.log(`Line ${routeName} is ${msg}.`);
			return true;
		} else if (!record) {
			if (currentlyDelayed) {
				console.log(`Line ${routeName} is experiencing delays.`);
			}
			return true;
		} else {
			return false;
		}
	});
};

const grabData = () => {
	console.log('Scraping the page at ', new Date());
	engine
		.goto(MTA_URL)
		.evaluate(() => document.body.innerHTML)
		.then(html => {
			$.load(html)('#status-subway')
				.find('.by-status')
				.each(function () {
					const status = $(this).find('h5').text();
					// For simplicity, use Set to avoid multiple instances of route S (due to the distinction between routes S, SR, and SF)
					const routes = new Set(
						$(this)
							.find('li')
							.map(function () {
								return $(this).find('span').text();
							})
							.get()
					);

					const datetime = new Date(); // For consistency among all new records

					// The DB should keep a record every time a route changes status from delay to on-time and vice-versa
					routes.forEach(async routeName => {
						const statusChange = await checkStatusChange(routeName, status === 'Delays');
						if (statusChange) {
							await Record.create({
								routeName,
								datetime,
								delay: status === 'Delays'
							});
						}
					});
				});
		});
};

setInterval(grabData, 60000);

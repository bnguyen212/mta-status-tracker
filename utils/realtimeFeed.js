const request = require('request');
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');

/*
 * UNUSED CODE
 *
 * There is inconsistency between MTA's realtime feed format and Google Transit API's recommended format.
 * https://developers.google.com/transit/gtfs-realtime/examples/trip-updates-full
 * MTA realtime feed only provide the updated arrival and/or departure time, without providing the original scheduled time and delay amount
 */

const realtimeFeeds = {
	ACE: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace',
	BDFM: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm',
	G: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-g',
	JZ: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-jz',
	NQRW: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw',
	L: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-l',
	'123456': 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs',
	'7': 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-7',
	SIR: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-si'
};

function fetchRealtimeData() {
	Object.keys(realtimeFeeds).forEach(function (feedName) {
		var requestSettings = {
			method: 'GET',
			url: realtimeFeeds[feedName],
			encoding: null,
			headers: {
				'x-api-key': process.env.MTA_API_KEY
			}
		};
		request(requestSettings, (error, response, body) => {
			if (!error && response.statusCode == 200) {
				try {
					var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
					feed.entity.forEach(async e => {
						if (e.tripUpdate) {
							// Parse for update to arrival & departure times at each stop
						}
					});
				} catch (err) {
					console.error(err);
				}
			}
		});
	});
}

module.exports = { fetchRealtimeData };

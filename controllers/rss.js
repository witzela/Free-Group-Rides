var BLOG_URL = 'http://cascade.org/dailyRides/feed/';
var DATE;
var MONTH_MAP = { JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6, JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12 };
var MONTH_LENGTH_MAP = { 1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31 };

exports.loadRssFeed = function(o, tries) {
	var url = BLOG_URL;
	DATE = getCurrentDate();
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET', url, false);
	xhr.send(null);

	if (xhr.status === 200) {
		var xml = xhr.responseXML;
		if (xml === null || xml.documentElement === null) {
			alert('Error reading RSS feed. Make sure you have a network connection and try refreshing.');
			if (o.error) { o.error(); }
			return;
		}

		var items = xml.getElementsByTagName("item");
		var data = [];

		for (var i = 0; i < items.length; i++) {

			var item = items.item(i);
			data.push({
				author: formatAuthor(item),
				title: getRssText(item, 'title'),
				link: getRssText(item, 'link'),
				pubDate: parseDate(getRssText(item, 'pubDate')),
			});			
		}
		
		return data;
	} else {
		alert('error: ' + xhr.status);
		return;
	}
};

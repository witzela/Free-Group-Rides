var rss = require('rss');

var rowData = rss.loadRssFeed();

var rows = [];

var createRows = function(data) {
	_.each(data, function(rowData) {
		rows.push(Alloy.createController('row') {
			author: item.author,
			title: item.title,
			link: item.link,
			pubDate: item.pubDate
		});
	}
};
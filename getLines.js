var cfb = require("cfb.js");
const util = require("util");
var config = require("./config");
var defaultClient = cfb.ApiClient.instance;

// Configure API key authorization: ApiKeyAuth
var ApiKeyAuth = defaultClient.authentications["ApiKeyAuth"];
ApiKeyAuth.apiKey = config.apiKey;
var api = new cfb.BettingApi();
var currentWeek = calculateCurrentWeek();
var opts = {
	year: "2021", // {Number} Year/season filter for games
	week: currentWeek, // {Number} Week filter
	seasonType: "regular", // {String} Season type filter (regular or postseason)
};
api.getLines(opts).then(
	function (data) {
		console.log(
			util.inspect(data, { showHidden: false, depth: null, colors: true })
		);
		var fs = require("fs");
		fs.writeFile("lines/linesWeek" + currentWeek + ".json", JSON.stringify(data), function (err) {
			if (err) {
				console.log(err);
			}
		});
	},
	function (error) {
		console.error(error);
	}
);

function calculateCurrentWeek() {
	var week0 = new Date(2021, 07, 28);
	var currentTime = new Date();
	return weeksBetween(week0, currentTime);
}
function weeksBetween(d1, d2) {
	return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
}

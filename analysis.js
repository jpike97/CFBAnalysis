let keeperPredictions = require("./predictions/keeperPredictions.json");
let dpdRankings = require("./predictions/dpdRankings.json");
let linesJSON = require("./lines/linesWeek8.json");
var fs = require('fs');
linesJSON.forEach((line) => processLine(line));

function processLine(item) {
	item["dpdSpread"] = calculateDPDSpread(item["homeTeam"], item["awayTeam"]);
	item["keeperSpread"] = calculateKeeperSpread(item["homeTeam"]);

	compareLine(item);
}

function calculateDPDSpread(hometeam, awayteam) {
	let dpdHomeTeam = dpdRankings.filter((team) => {
		return team.Team === hometeam;
	});
	let dpdAwayTeam = dpdRankings.filter((team) => {
		return team.Team === awayteam;
	});

	dpdHomeTeam = dpdHomeTeam[0];
	dpdAwayTeam = dpdAwayTeam[0];

	if (dpdHomeTeam != undefined && dpdAwayTeam != undefined) {
		let dpdCalculatedSpread = dpdHomeTeam.Score - dpdAwayTeam.Score;
		//console.log(dpdCalculatedSpread);
		//home team is favored technically
		if (dpdCalculatedSpread > 0) {
			return dpdHomeTeam.Team + " -" + dpdCalculatedSpread;
		}
		//away team is favored technically
		else {
			return dpdAwayTeam.Team + " -" + dpdCalculatedSpread * -1;
		}
	}
}

function calculateKeeperSpread(hometeam) {
	let formattedHomeTeam = hometeam.replace(/\s/g, "");
	let gameLine = keeperPredictions.filter((matchup) => {
    let formattedFavorite = !isEmpty(matchup.Favorite) ? matchup.Favorite.replace(/[\s@_]/g,'') : "No Favorite";
    let formattedUnderdog = !isEmpty(matchup.Underdog) ? matchup.Underdog.replace(/[\s@_]/g,'') : "No Underdog";
		return formattedFavorite === formattedHomeTeam || formattedUnderdog === formattedHomeTeam;
	});
	let formattedKeeperSpread = "";
	if (gameLine[0] != undefined) { 
		formattedKeeperSpread = hometeam + " -" + gameLine[0].spread;
	}
	//console.log(gameLine[0].spread);
	//console.log(gameline[0])
	return formattedKeeperSpread;
}

//comparelines
function compareLine(line) { 
	let dpdSpread = line["dpdSpread"];
	let keeperSpread = line["keeperSpread"];
	let vegasSpread = "";
	//console.log(line);
	if (line.lines[0] != undefined) { 
		vegasSpread = line.lines[0].spread;
		//console.log(predictedSpread);
	}
	console.log(`predicted spread is ${predictedSpread}`)

}

//console.log(compareLines(linesJSON));

//yeah so what?
function isEmpty(str) {
  return (!str || str.length === 0 || str === undefined) ;
}
// var jsonToWriteToFile = JSON.stringify(linesJSON);


// fs.writeFile('myjsonfile.json', jsonToWriteToFile, 'utf8', function(err) {
//     if (err) throw err;
//     console.log('complete');
//     });

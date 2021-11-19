let keeperPredictions = require("./predictions/keeperPredictions.json");
let dpdRankings = require("./predictions/dpdRankings.json");
let linesJSON = require("./lines/linesWeek11.json");
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
	if (dpdSpread == undefined) { 
		return;
	}
	//console.log(line);
	if (line.lines[0] != undefined) { 
		vegasSpread = line.lines[0].formattedSpread;
		//console.log(predictedSpread);
	}
	
	var vegasSpreadNumber = vegasSpread.split('-')[1];
	var [keeperFavorite, keeperSpreadNumber] = keeperSpread.split('-');
	var [dpdFavorite, dpdSpreadNumber] = dpdSpread.split('-');

	//console.log((keeperSpreadNumber - vegasSpreadNumber));
	//console.log(`vegas spread is ${vegasSpreadNumber} keeperSpread is ${keeperSpreadNumber} dpdSpreadNumber is ${dpdSpreadNumber}`);
	//TODO: make sure both models agree on teams lol. then ding ding ding. right now variant spreads can give misleading results
	if (Math.abs(keeperSpreadNumber - vegasSpreadNumber) > 5 && Math.abs(dpdSpreadNumber - vegasSpreadNumber) > 5 && keeperFavorite === dpdFavorite) {
		console.log("ding ding ding!");
		//this is wrong!
		console.log(line["dpdSpread"]);
		console.log(line["keeperSpread"]);
	}
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

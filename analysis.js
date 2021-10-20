let keeperPredictions = require('./predictions/keeperPredictions.json');
let dpdRankings = require('./predictions/dpdRankings.json');
let linesJSON = require('./lines/linesWeek8.json');

linesJSON.forEach(line => processLine(line));

function processLine(item) {
    item["dpdSpread"] = calculateDPDSpread(item["homeTeam"], item["awayTeam"]);
    item["keeperSpread"] = "Keeper";
  }

function calculateDPDSpread(hometeam, awayteam) { 
    let dpdHomeTeam = dpdRankings.filter(team => {
        return team.Team === hometeam;
      });
    let dpdAwayTeam = dpdRankings.filter(team => {
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

console.log(linesJSON);

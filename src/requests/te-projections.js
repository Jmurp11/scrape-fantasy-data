const request = require('request');
const cheerio = require('cheerio');
const tableParser = require('cheerio-tableparser');

const options = {
    url: 'https://www.fantasypros.com/nfl/projections/te.php?scoring=HALF&week=draft'
};

var teArray = [];
var teInfoArray = [];
var receptionsArray = [];
var recYardsArray = [];
var recTdArray = [];
var fumblesArray = [];
var fantasyPointsArray = [];
export const teProjections = () => {
    request(options.url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(html);

            tableParser($);
            tableParser($);
            var data = $("#data").parsetable();

            // [0] player name / team
            data[0].forEach(element => {
                const string = element;
                const name = string.substring(string.indexOf('"player-name">'), string.indexOf('</a>'));
                const fullName = name.substring(name.indexOf('>') + 1, name.length);
                let firstName = fullName.substring(0, fullName.indexOf(' '));
                firstName = firstName.replace('&apos;', `'`);
                let lastName = fullName.substring(fullName.indexOf(' '), fullName.length);
                lastName = lastName.replace(' ', '');
                const teamParsed = string.substring(string.indexOf('</a> '), string.lastIndexOf(' <a '));
                let team = teamParsed.substring(teamParsed.indexOf(' '), teamParsed.length);
                team = team.replace(' ', '');
                const te = {
                    firstName,
                    lastName,
                    team
                }
                if (te.firstName.length > 0) {
                    teInfoArray.push(te);
                };
            });


            // [1] receptions
            data[1].forEach(element => {
                if (!isNaN(element)) {
                    receptionsArray.push(element);
                }
            });

            // [2] rec yards
            data[2].forEach(element => {
                recYardsArray.push(element);
            });
            recYardsArray.shift();
            recYardsArray.shift();

            // [3] rec td
            data[3].forEach(element => {
                recTdArray.push(element);
            });
            recTdArray.shift();
            recTdArray.shift();

            // [4] fumbles
            data[4].forEach(element => {
                if (!isNaN(element)) {
                    fumblesArray.push(element);
                }
            });

            // [5] fantasyPoints
            data[5].forEach(element => {
                if (!isNaN(element)) {
                    fantasyPointsArray.push(element);
                }
            });
            fantasyPointsArray.shift();

            for (let i = 0; i < teInfoArray.length; i++) {
                const teProjections = {
                    firstName: teInfoArray[i].firstName,
                    lastName: teInfoArray[i].lastName,
                    team: teInfoArray[i].team,
                    attempts: 0,
                    completions: 0,
                    passYards: 0,
                    passTd: 0,
                    int: 0,
                    carries: 0,
                    rushYards: 0,
                    rushTd: 0,
                    fumbles: fumblesArray[i],
                    receptions: receptionsArray[i],
                    receivingYards: recYardsArray[i],
                    receivingTds: recTdArray[i],
                    fantasyPoints: fantasyPointsArray[i]
                };
                teArray.push(teProjections);
            }
        }
    });
}



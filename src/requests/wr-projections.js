const request = require('request');
const cheerio = require('cheerio');
const tableParser = require('cheerio-tableparser');

const options = {
    url: 'https://www.fantasypros.com/nfl/projections/wr.php?scoring=HALF&week=draft'
};

var wrArray = [];
var wrInfoArray = [];
var attemptsArray = [];
var rushYardsArray = [];
var rushTdArray = [];
var receptionsArray = [];
var recYardsArray = [];
var recTdArray = [];
var fumblesArray = [];
var fantasyPointsArray = [];
export const wrProjections = () => {
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
                const wr = {
                    firstName,
                    lastName,
                    team
                }
                if (wr.firstName.length > 0) {
                    wrInfoArray.push(wr);
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

            // [4] attempts
            data[4].forEach(element => {
                if (!isNaN(element)) {
                    attemptsArray.push(element);
                }
            });

            // [5] rush yards
            data[5].forEach(element => {
                if (!isNaN(element)) {
                    rushYardsArray.push(element);
                }
            });
            rushYardsArray.shift();

            // [6] rush td
            data[6].forEach(element => {
                if (!isNaN(element)) {
                    rushTdArray.push(element);
                }
            });
            rushTdArray.shift();

            // [7] fumbles
            data[7].forEach(element => {
                if (!isNaN(element)) {
                    fumblesArray.push(element);
                }
            });

            // [8] fantasyPoints
            data[8].forEach(element => {
                if (!isNaN(element)) {
                    fantasyPointsArray.push(element);
                }
            });
            fantasyPointsArray.shift();

            for (let i = 0; i < wrInfoArray.length; i++) {
                const wrProjections = {
                    firstName: wrInfoArray[i].firstName,
                    lastName: wrInfoArray[i].lastName,
                    team: wrInfoArray[i].team,
                    attempts: 0,
                    completions: 0,
                    passYards: 0,
                    passTd: 0,
                    int: 0,
                    carries: attemptsArray[i],
                    rushYards: rushYardsArray[i],
                    rushTd: rushTdArray[i],
                    fumbles: fumblesArray[i],
                    receptions: receptionsArray[i],
                    receivingYards: recYardsArray[i],
                    receivingTds: recTdArray[i],
                    fantasyPoints: fantasyPointsArray[i]
                };
                wrArray.push(wrProjections);
            }
        }
        console.log(wrArray.length);
    });
}


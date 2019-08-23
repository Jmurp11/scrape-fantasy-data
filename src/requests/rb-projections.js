import { request } from 'graphql-request';
import { scrapeRequest, cheerio, tableParser, getHost } from '../constants';
import { addProjection } from '../queries';


const options = {
    url: 'https://www.fantasypros.com/nfl/projections/rb.php?scoring=HALF&week=draft'
};

var rbArray = [];
var rbInfoArray = [];
var attemptsArray = [];
var rushYardsArray = [];
var rushTdArray = [];
var receptionsArray = [];
var recYardsArray = [];
var recTdArray = [];
var fumblesArray = [];
var fantasyPointsArray = [];
export const rbProjections = () => {
    scrapeRequest(options.url, async (error, response, html) => {
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
                const rb = {
                    firstName,
                    lastName,
                    team
                }
                if (rb.firstName.length > 0) {
                    rbInfoArray.push(rb);
                };
            });

            // [1] attempts
            data[1].forEach(element => {
                if (!isNaN(element)) {
                    attemptsArray.push(element);
                }
            });

            // [2] rush yards
            data[2].forEach(element => {
                rushYardsArray.push(element);
            });
            rushYardsArray.shift();
            rushYardsArray.shift();

            // [3] rush td
            data[3].forEach(element => {
                rushTdArray.push(element);
            });
            rushTdArray.shift();
            rushTdArray.shift();

            // [4] receptions
            data[4].forEach(element => {
                if (!isNaN(element)) {
                    receptionsArray.push(element);
                }
            });

            // [5] rec yards
            data[5].forEach(element => {
                if (!isNaN(element)) {
                    recYardsArray.push(element);
                }
            });
            recYardsArray.shift();

            // [6] rec td
            data[6].forEach(element => {
                if (!isNaN(element)) {
                    recTdArray.push(element);
                }
            });
            recTdArray.shift();

            // [7] fumbles
            data[7].forEach(element => {
                if (!isNaN(element)) {
                    fumblesArray.push(element);
                }
            });

            // [10] fantasyPoints
            data[8].forEach(element => {
                if (!isNaN(element)) {
                    fantasyPointsArray.push(element);
                }
            });
            fantasyPointsArray.shift();

            for (let i = 0; i < rbInfoArray.length; i++) {
                const rb = {
                    firstName: rbInfoArray[i].firstName,
                    lastName: rbInfoArray[i].lastName,
                    team: rbInfoArray[i].team,
                    attempts: 0,
                    completions: 0,
                    passYards: 0,
                    passTd: 0,
                    interception: 0,
                    carries: attemptsArray[i],
                    rushYards: rushYardsArray[i],
                    rushTd: rushTdArray[i],
                    fumbles: fumblesArray[i],
                    receptions: receptionsArray[i],
                    receivingYards: recYardsArray[i],
                    receivingTd: recTdArray[i],
                    fantasyPoints: fantasyPointsArray[i]
                };

                await request(getHost(), addProjection(
                    rb.firstName,
                    rb.lastName,
                    rb.team,
                    rb.completions,
                    rb.attempts,
                    rb.passTd,
                    rb.passYards,
                    rb.interception,
                    rb.carries,
                    rb.rushYards,
                    rb.rushTd,
                    rb.fumbles,
                    rb.receptions,
                    rb.receivingYards,
                    rb.receivingTd,
                    rb.fantasyPoints
                )).catch(e => { console.error(e)});
            }
        }
    });
}

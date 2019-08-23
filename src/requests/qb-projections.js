import { request } from 'graphql-request';
import { scrapeRequest, cheerio, tableParser, getHost } from '../constants';
import { addProjection } from '../queries';

const options = {
    url: 'https://www.fantasypros.com/nfl/projections/qb.php?week=draft'
};

var qbArray = [];
var qbInfoArray = [];
var attemptsArray = [];
var completionsArray = [];
var passYardsArray = [];
var passTdArray = [];
var intArray = [];
var rushAttArray = [];
var rushYardsArray = [];
var rushTdArray = [];
var fumblesArray = [];
var fantasyPointsArray = [];

export const qbProjections = () => {
    scrapeRequest(options.url, async (error, response, html) => {
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(html);

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
                const qb = {
                    firstName,
                    lastName,
                    team
                }
                if (qb.firstName.length > 0) {
                    qbInfoArray.push(qb);
                };
            });

            // [1] attempts
            data[1].forEach(element => {
                if (!isNaN(element)) {
                    attemptsArray.push(element);
                }
            });

            // [2] completions
            data[2].forEach(element => {
                if (!isNaN(element)) {
                    completionsArray.push(element);
                }
            });
            completionsArray.shift();

            // [3] passYards
            data[3].forEach(element => {
                element = element.toString();
                element = element.replace(',', '');
                passYardsArray.push(element);
            });
            passYardsArray.shift();
            passYardsArray.shift();

            // [4] tds
            data[4].forEach(element => {
                if (!isNaN(element)) {
                    passTdArray.push(element);
                }
            });
            passTdArray.shift();

            // [5] ints
            data[5].forEach(element => {
                if (!isNaN(element)) {
                    intArray.push(element);
                }
            });
            intArray.shift();

            // [6] carries
            data[6].forEach(element => {
                if (!isNaN(element)) {
                    rushAttArray.push(element);
                }
            });

            // [7] rushYards
            data[7].forEach(element => {
                element = element.toString();
                element = element.replace(',', '');
                if (!isNaN(element)) {
                    rushYardsArray.push(element);
                }
            });
            rushYardsArray.shift();

            // [8] rushTds
            data[8].forEach(element => {
                if (!isNaN(element)) {
                    rushTdArray.push(element);
                }
            });
            rushTdArray.shift();

            // [9] fumbles
            data[9].forEach(element => {
                if (!isNaN(element)) {
                    fumblesArray.push(element);
                }
            });

            // [10] fantasyPoints
            data[10].forEach(element => {
                if (!isNaN(element)) {
                    fantasyPointsArray.push(element);
                }
            });
            fantasyPointsArray.shift();

            for (let i = 0; i < qbInfoArray.length; i++) {
                const qb = {
                    firstName: qbInfoArray[i].firstName,
                    lastName: qbInfoArray[i].lastName,
                    team: qbInfoArray[i].team,
                    attempts: attemptsArray[i],
                    completions: completionsArray[i],
                    passYards: passYardsArray[i],
                    passTd: passTdArray[i],
                    interception: intArray[i],
                    carries: rushAttArray[i],
                    rushYards: rushYardsArray[i],
                    rushTd: rushTdArray[i],
                    fumbles: fumblesArray[i],
                    receptions: 0,
                    receivingYards: 0,
                    receivingTd: 0,
                    fantasyPoints: fantasyPointsArray[i]
                };
    
                await request(getHost(), addProjection(
                    qb.firstName,
                    qb.lastName,
                    qb.team,
                    qb.completions,
                    qb.attempts,
                    qb.passTd,
                    qb.passYards,
                    qb.interception,
                    qb.carries,
                    qb.rushYards,
                    qb.rushTd,
                    qb.fumbles,
                    qb.receptions,
                    qb.receivingYards,
                    qb.receivingTd,
                    qb.fantasyPoints
                )).catch(e => { console.error(e)});
            }
        }
    });
}

import { request } from 'graphql-request';
import { scrapeRequest, cheerio, tableParser, getHost } from '../constants';
import { createPlayer } from '../queries';

const options = {
    url: 'https://www.fantasypros.com/nfl/rankings/half-point-ppr-cheatsheets.php'
};

var playerInfoArr = [];
var rankArr = [];
var players = [];

export const rankings = () => {
    scrapeRequest(options.url, async (error, response, html) => {
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(html);

            tableParser($);
            var data = $(".player-table").parsetable();

            // Get Name, Team, Position
            data[1].forEach(element => {
                const string = element;
                const name = string.substring(string.indexOf('data-name="'), string.indexOf('" data-shortname='));
                const fullName = name.substring(name.indexOf('"') + 1, name.length);
                let firstName = fullName.substring(0, fullName.indexOf(' '));
                firstName = firstName.replace('&apos;', `'`);
                firstName = firstName.replace(' ', '');
                let lastName = fullName.substring(fullName.indexOf(' '), fullName.length);
                lastName = lastName.replace(' ', '');
                const positionParsed = string.substring(string.indexOf('data-position="'), string.lastIndexOf('"'));
                const teamParsed = string.substring(string.indexOf('data-team="'), string.indexOf('" data-position='));

                const position = positionParsed.substring(positionParsed.indexOf('"') + 1, positionParsed.length);
                const team = teamParsed.substring(teamParsed.indexOf('"') + 1, teamParsed.length);

                const player = {
                    firstName,
                    lastName,
                    position,
                    team
                };
                console.log(`${player.firstName}${player.lastName}`);
                if (player.firstName.length > 0) {
                    playerInfoArr.push(player);
                }
            });

            // Get Rank and Tier
            var tier = 0;

            data[0].forEach(element => {
                if (isNaN(element)) {
                    if (element.includes('Tier')) {
                        tier = element.substring(element.indexOf(' ' + 1, element.length));
                    }
                } else {
                    const rank = element;
                    const rankAndTier = {
                        rank,
                        tier
                    };
                    rankArr.push(rankAndTier);
                }
            });
            rankArr.splice(rankArr.length - 1, 1);
        }

        for (let i = 0; i < playerInfoArr.length; i++) {
            const player = {
                firstName: playerInfoArr[i].firstName,
                lastName: playerInfoArr[i].lastName,
                team: playerInfoArr[i].team,
                position: playerInfoArr[i].position,
                rank: rankArr[i].rank,
                tier: rankArr[i].tier
            };
            await request(getHost(), createPlayer(
                player.firstName,
                player.lastName,
                player.team,
                player.position,
                player.rank,
                player.tier
            )).catch(e => { console.error(e)});
        }
    });
}

export const createTeam = (
    city,
    nickname,
    abbreviation,
    imageUrl
) => {
    return `
        mutation {
            createTeam(input: {
                city:"${city}",
                nickname:"${nickname}",
                abbreviation:"${abbreviation}",
                imageUrl:"${imageUrl}"
            }) {
                success{
                    message
                }
                errors {
                    message
                }
            }
        }
    `
}

export const addTeamStats = (
    team,
    bye,
    rank,
    passRank,
    rushRank,
    pointsFor,
    yards,
    plays,
    yardsPerPlay,
    turnovers,
    passAttempts,
    passCompletions,
    passYards,
    passTd,
    interception,
    netYardsPerPass,
    rushAttempt,
    rushYards,
    rushTd,
    yardsPerRush,
    scorePercentage,
    turnoverPercentage,
    offensiveLineRank,
    runningBackSoS
) => {
    return `
        mutation {
            addTeamStats(input: {
                team: ${team}, bye: ${bye}, rank: ${rank}, 
                passRank: ${passRank}, rushRank: ${rushRank}, pointsFor: ${pointsFor},
                yards: ${yards}, plays: ${plays}, yardsPerPlay: ${yardsPerPlay},
                turnovers: ${turnovers}, passAttempts: ${passAttempts},
                passCompletions: ${passCompletions}, passYards: ${passYards},
                passTd: ${passTd}, interception: ${interception},
                netYardsPerPass: ${netYardsPerPass}, rushAttempt: ${rushAttempt},
                rushYards: ${rushYards}, rushTd: ${rushTd}, yardsPerRush: ${yardsPerRush},
                scorePercentage: ${scorePercentage}, turnoverPercentage: ${turnoverPercentage},
                offensiveLineRank: ${offensiveLineRank}, runningBackSoS: ${runningBackSoS} 
            }) {
                success{
                    message
                }
                errors {
                    message
                }
            }
        }
    `;
};

export const createPlayer = (firstName, lastName, team, position,
    rank, adp, tier) => {
    return `
        mutation {
            createPlayer(input: {
                firstName: "${firstName}", lastName: "${lastName}", 
                team: "${team}", position: "${position}", rank: ${parseInt(rank, 10)},
                adp: ${adp}, tier: "${tier}"
            }) {
                success{
                    message
                }
                errors {
                    message
                }
            }
        }
    `;
};

export const addProjection = (
    firstName, lastName, team, completions, attempts,
    passTd, passYards, interception, carries, rushYards, rushTd, fumbles,
    receptions, receivingYards,
    receivingTd, fantasyPoints
) => {
    return `
        mutation {
            createProjection(input: {
                firstName: "${firstName}", lastName: "${lastName}", team: "${team}", completions: ${parseFloat(completions, 10)}, attempts: ${parseFloat(attempts, 10)}, 
                passYards: ${parseFloat(passYards, 10)}, passTd: ${parseFloat(passTd, 10)}, 
                interception: ${parseFloat(interception, 10)}, carries: ${parseFloat(carries, 10)}, rushYards: ${parseFloat(rushYards, 10)}, rushTd: ${parseFloat(rushTd, 10)}, 
                fumbles: ${parseFloat(fumbles, 10)}, receptions: ${parseFloat(receptions, 10)}, receivingYards: ${parseFloat(receivingYards, 10)}, 
                receivingTd: ${parseFloat(receivingTd, 10)}, fantasyPoints: ${parseFloat(fantasyPoints, 10)}
            }) {
                success{
                    message
                }
                errors {
                    message
                }
            }
        }
    `;
};

export const teamByAbbreviation = (abbreviation) => {
    return `
        query {
            teamByAbbreviation(abbreviation: "${abbreviation}") {
                id
            }
        }
    `;
}
export const createTeam = (
    city,
    nickname,
    abbreviation,
    bye,
    imageUrl,
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
    const mutation = `
    mutation {
        createTeam(city: "${city}", nickname: "${nickname}", 
            abbreviation: "${abbreviation}", bye: ${bye}, rank: ${rank}, 
            passRank: ${passRank}, rushRank: ${rushRank}, imageUrl: "${imageUrl}", pointsFor: ${pointsFor},
            yards: ${yards}, plays: ${plays}, yardsPerPlay: ${yardsPerPlay},
            turnovers: ${turnovers}, passAttempts: ${passAttempts},
            passCompletions: ${passCompletions}, passYards: ${passYards},
            passTd: ${passTd}, interception: ${interception},
            netYardsPerPass: ${netYardsPerPass}, rushAttempt: ${rushAttempt},
            rushYards: ${rushYards}, rushTd: ${rushTd}, yardsPerRush: ${yardsPerRush},
            scorePercentage: ${scorePercentage}, turnoverPercentage: ${turnoverPercentage},
            offensiveLineRank: ${offensiveLineRank}, runningBackSoS: ${runningBackSoS})
    }
`;
    return mutation;
};

export const createPlayer = (firstName, lastName, team, position,
    rank, tier) => {
    const mutation = `
        mutation {
            createPlayer(firstName: "${firstName}", lastName: "${lastName}", 
                team: "${team}", position: "${position}", rank: ${parseInt(rank, 10)},
                tier: "${tier}")
        }
    `;
    return mutation;
};

export const addProjection = (
    firstName, lastName, team, completions, attempts,
    passTd, passYards, interception, carries, rushYards, rushTd, fumbles,
    receptions, receivingYards,
    receivingTd, fantasyPoints
) => {
    const mutation = `
            mutation {
                addProjection(firstName: "${firstName}", lastName: "${lastName}", team: "${team}", completions: ${parseFloat(completions, 10)}, attempts: ${parseFloat(attempts, 10)}, 
                    passYards: ${parseFloat(passYards, 10)}, passTd: ${parseFloat(passTd, 10)}, 
                    interception: ${parseFloat(interception, 10)}, carries: ${parseFloat(carries, 10)}, rushYards: ${parseFloat(rushYards, 10)}, rushTd: ${parseFloat(rushTd, 10)}, 
                    fumbles: ${parseFloat(fumbles, 10)}, receptions: ${parseFloat(receptions, 10)}, receivingYards: ${parseFloat(receivingYards, 10)}, 
                    receivingTd: ${parseFloat(receivingTd, 10)}, fantasyPoints: ${parseFloat(fantasyPoints, 10)})
            }
        `;
    return mutation;
};
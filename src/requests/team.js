import { request } from 'graphql-request';
import { getHost } from '../constants';
import { teamData } from '../team-data';
import { createTeam } from '../queries';

export const teams = () => {
    teamData.forEach(async (team) => {
        const response = await request(getHost(), createTeam(
            team.city,
            team.nickname,
            team.abbreviation,
            team.bye,
            team.imageUrl,
            team.rank,
            team.passRank,
            team.rushRank,
            team.pointsFor,
            team.yards,
            team.plays,
            team.yardsPerPlay,
            team.turnovers,
            team.passAttempts,
            team.passCompletions,
            team.passYards,
            team.passTd,
            team.interception,
            team.netYardsPerPass,
            team.rushAttempt,
            team.rushYards,
            team.rushTd,
            team.yardsPerRush,
            team.scorePercentage,
            team.turnoverPercentage,
            team.offensiveLineRank,
            team.runningBackSoS
        )).catch(e => { console.error(e)});

        return response;
    });
}
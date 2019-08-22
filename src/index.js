import { rankings, qbProjections, rbProjections, wrProjections, teProjections } from './requests';
import { teamData } from './team-data';

rankings();
qbProjections();
rbProjections();
wrProjections();
teProjections();
console.log(teamData.length);
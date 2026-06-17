/**
 * Audit harness for the Helios Bicycle business logic.
 * Runs the real services against the seed data and asserts expected results.
 * Exit code is non-zero if any assertion fails.
 */
import {
  heliosBicycles,
  heliosMechanics,
  heliosPitStopTickets,
} from '../src/seed/helios-demo-seed.js';
import { computeBikeHealth, rankBikeHealth } from '../src/services/bike-health.js';
import { assignPitStopTickets } from '../src/services/pit-stop-assignment.js';
import { buildBusinessKpiSnapshot } from '../src/services/business-kpi.js';

let failures = 0;

function check(name: string, condition: boolean, detail?: string): void {
  if (condition) {
    console.log(`  PASS  ${name}`);
  } else {
    failures += 1;
    console.error(`  FAIL  ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

console.log('Auditing bike-health service');
const star = computeBikeHealth({
  bicycleId: 'x',
  bikeCode: 'X',
  station: 'S',
  status: 'ready',
  moodScore: 4.7,
});
check('ready + loved bike is a star', star.celebrationTag === 'star', `got ${star.celebrationTag}/${star.healthScore}`);

const watch = computeBikeHealth({
  bicycleId: 'y',
  bikeCode: 'Y',
  station: 'S',
  status: 'pit-stop-needed',
  moodScore: 2.8,
});
check('pit-stop + low mood is watch', watch.celebrationTag === 'watch', `got ${watch.celebrationTag}/${watch.healthScore}`);

const ranked = rankBikeHealth(heliosBicycles);
check('ranking is ascending by health (worst first)', ranked[0].healthScore <= ranked[ranked.length - 1].healthScore);

console.log('Auditing pit-stop-assignment service');
const assignments = assignPitStopTickets(heliosPitStopTickets, heliosMechanics);
check('every ticket is processed', assignments.length === heliosPitStopTickets.length);
const amsTicket = assignments.find((a) => a.ticketId === 'ticket-1001');
check('Amsterdam ticket assigned to same-station mechanic', amsTicket?.assignedMechanicId === 'mech-ams-01', JSON.stringify(amsTicket));
const allAssigned = assignments.every((a) => a.assignedMechanicId !== null);
check('all tickets received a mechanic (capacity available)', allAssigned);

console.log('Auditing business-kpi service');
const kpi = buildBusinessKpiSnapshot({
  ridesCompleted: 40,
  pitStopsRaised: 10,
  pitStopsResolved: 8,
});
check('pit-stop flag rate = 0.25', kpi.flagRate === 0.25, `got ${kpi.flagRate}`);
check('resolution rate = 0.8', kpi.resolveRate === 0.8, `got ${kpi.resolveRate}`);
check('bikes back to ready = 8', kpi.bikesBackToReady === 8, `got ${kpi.bikesBackToReady}`);
check('zero rides yields zero rate (no divide-by-zero)', buildBusinessKpiSnapshot({ ridesCompleted: 0, pitStopsRaised: 0, pitStopsResolved: 0 }).flagRate === 0);

if (failures > 0) {
  console.error(`\nAudit FAILED with ${failures} failing check(s).`);
  process.exit(1);
}
console.log('\nAudit passed: all checks green.');

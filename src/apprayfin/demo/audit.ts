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
  workshopsDelivered: 8,
  workshopsConvertedToPoC: 4,
  poCsConvertedToOpportunity: 3,
});
check('PoC rate = 0.5', kpi.poCRate === 0.5, `got ${kpi.poCRate}`);
check('opportunity rate = 0.75', kpi.opportunityRate === 0.75, `got ${kpi.opportunityRate}`);
check('projected opportunities = 3', kpi.projectedOpportunitiesNextQuarter === 3, `got ${kpi.projectedOpportunitiesNextQuarter}`);
check('zero workshops yields zero rate (no divide-by-zero)', buildBusinessKpiSnapshot({ workshopsDelivered: 0, workshopsConvertedToPoC: 0, poCsConvertedToOpportunity: 0 }).poCRate === 0);

if (failures > 0) {
  console.error(`\nAudit FAILED with ${failures} failing check(s).`);
  process.exit(1);
}
console.log('\nAudit passed: all checks green.');

/**
 * Audit harness for the GreenGrid scoring + portfolio logic.
 * Runs the real services against the sample OneLake data and asserts expected results.
 */
import { onelakeSites } from '../src/seed/onelake-sample.js';
import { scoreSite, scoreSites, energyEfficiency } from '../src/services/green-score.js';
import { buildPortfolio } from '../src/services/scorecard.js';

let failures = 0;
function check(name: string, condition: boolean, detail?: string): void {
  if (condition) {
    console.log(`  PASS  ${name}`);
  } else {
    failures += 1;
    console.error(`  FAIL  ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

console.log('Auditing green-score engine');
const hel = scoreSite({ siteId: 's', name: 'Helsinki', city: 'Helsinki', energyKwh: 320, renewablePct: 88 });
check('Helsinki scores 80 (tier A)', hel.greenScore === 80 && hel.tier === 'A', `${hel.greenScore}/${hel.tier}`);

const waw = scoreSite({ siteId: 's', name: 'Warsaw', city: 'Warsaw', energyKwh: 880, renewablePct: 24 });
check('Warsaw scores 19 (tier C)', waw.greenScore === 19 && waw.tier === 'C', `${waw.greenScore}/${waw.tier}`);
check('Warsaw tip = increase renewable', waw.tip === 'Increase renewable sourcing', waw.tip);

check('efficiency is 100 at 0 kWh', energyEfficiency(0) === 100);
check('efficiency is 0 at/above reference', energyEfficiency(1000) === 0 && energyEfficiency(2000) === 0);

console.log('Auditing portfolio aggregation');
const scored = scoreSites(onelakeSites);
check('scored sites are sorted best-first', scored[0].greenScore >= scored[scored.length - 1].greenScore);

const portfolio = buildPortfolio(scored);
check('portfolio avg score = 60', portfolio.avgScore === 60, `${portfolio.avgScore}`);
check('portfolio avg renewable = 65', portfolio.avgRenewablePct === 65, `${portfolio.avgRenewablePct}`);
check('tier counts A1/B3/C1', portfolio.tierCounts.A === 1 && portfolio.tierCounts.B === 3 && portfolio.tierCounts.C === 1, JSON.stringify(portfolio.tierCounts));
check('best is Helsinki', portfolio.best.city === 'Helsinki', portfolio.best.city);
check('worst is Warsaw', portfolio.worst.city === 'Warsaw', portfolio.worst.city);

if (failures > 0) {
  console.error(`\nAudit FAILED with ${failures} failing check(s).`);
  process.exit(1);
}
console.log('\nAudit passed: all checks green.');

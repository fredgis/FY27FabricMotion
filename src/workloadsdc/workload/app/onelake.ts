/**
 * Reads the customer's sites from OneLake using a Fabric On-Behalf-Of (OBO) token.
 *
 * For the micro-hack the sites are provided as a CSV file in the Lakehouse `Files` area
 * (`Files/sites.csv`, see ../../data/sites.csv for the format). A CSV is the simplest thing
 * to read from a workload frontend; a Delta `Tables/sites` would also work but needs a SQL
 * endpoint or a backend to read.
 *
 * See: https://learn.microsoft.com/en-us/fabric/extensibility-toolkit/key-concepts
 */
import type { WorkloadClientAPI } from '@ms-fabric/workload-client';
import type { SiteRecord } from './contracts';

const ONELAKE_DFS = 'https://onelake.dfs.fabric.microsoft.com';
const ONELAKE_STORAGE_SCOPE = 'https://storage.azure.com/user_impersonation';

export async function readSitesFromOneLake(
  workloadClient: WorkloadClientAPI,
  workspaceId: string,
  lakehouseId: string
): Promise<SiteRecord[]> {
  // Acquire an OBO token scoped for OneLake (storage), then read the CSV file.
  const { token } = await workloadClient.auth.acquireFrontendAccessToken({
    scopes: [ONELAKE_STORAGE_SCOPE],
  });

  const url = `${ONELAKE_DFS}/${workspaceId}/${lakehouseId}/Files/sites.csv`;
  const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!response.ok) {
    throw new Error(`OneLake read failed: ${response.status}`);
  }

  return parseSitesCsv(await response.text());
}

/** Minimal CSV parser for the `sites.csv` shape (no quoted commas). */
export function parseSitesCsv(csv: string): SiteRecord[] {
  const [header, ...lines] = csv.trim().split(/\r?\n/);
  const cols = header.split(',').map((c) => c.trim());
  return lines.filter(Boolean).map((line) => {
    const cells = line.split(',');
    const row = Object.fromEntries(cols.map((c, i) => [c, (cells[i] ?? '').trim()]));
    return {
      siteId: row.siteId,
      name: row.name,
      city: row.city,
      energyKwh: Number(row.energyKwh),
      renewablePct: Number(row.renewablePct),
    };
  });
}

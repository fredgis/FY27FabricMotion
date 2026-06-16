/**
 * Reads the customer's `sites` table from OneLake using a Fabric On-Behalf-Of token.
 *
 * In the Extensibility Toolkit the frontend can acquire an Entra OBO token and call
 * OneLake / Fabric REST APIs directly. This helper is intentionally small: it returns
 * the rows the workload needs to send to the GreenGrid SaaS.
 *
 * See: https://learn.microsoft.com/en-us/fabric/extensibility-toolkit/key-concepts
 */
import type { WorkloadClientAPI } from '@ms-fabric/workload-client';
import type { SiteRecord } from './contracts';

const ONELAKE_DFS = 'https://onelake.dfs.fabric.microsoft.com';

export async function readSitesFromOneLake(
  workloadClient: WorkloadClientAPI,
  workspaceId: string,
  lakehouseId: string
): Promise<SiteRecord[]> {
  // Acquire an OBO token scoped for OneLake (storage).
  const { token } = await workloadClient.auth.acquireAccessToken({
    additionalScopesToConsent: ['https://storage.azure.com/user_impersonation'],
  });

  // Read the Delta `sites` table exposed by the lakehouse Files/Tables area.
  const url = `${ONELAKE_DFS}/${workspaceId}/${lakehouseId}/Tables/sites`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(`OneLake read failed: ${response.status}`);
  }

  // The Delta reader returns rows; map them to the SaaS contract.
  const rows = (await response.json()) as Array<Record<string, unknown>>;
  return rows.map((row) => ({
    siteId: String(row.siteId),
    name: String(row.name),
    city: String(row.city),
    energyKwh: Number(row.energyKwh),
    renewablePct: Number(row.renewablePct),
  }));
}

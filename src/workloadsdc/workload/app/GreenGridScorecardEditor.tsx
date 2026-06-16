/**
 * GreenGrid Scorecard — the Fabric workload item editor (representative).
 *
 * Flow:
 *   1. read the customer's `sites` table from OneLake (readSitesFromOneLake)
 *   2. score them with the GreenGrid SaaS (scorePortfolio)
 *   3. render a single, graphical sustainability scorecard
 *
 * Built with the Fabric Extensibility Toolkit (@ms-fabric/workload-client) and
 * Fluent UI. This file is the reference shape; the same view model is rendered by the
 * demo in ../../demo for the screenshots.
 */
import React, { useEffect, useState } from 'react';
import { FluentProvider, webLightTheme, Spinner } from '@fluentui/react-components';
import type { WorkloadClientAPI } from '@ms-fabric/workload-client';
import { readSitesFromOneLake } from './onelake';
import { scorePortfolio } from './greengridClient';
import type { ScoreResponse } from './contracts';

type Props = {
  workloadClient: WorkloadClientAPI;
  workspaceId: string;
  lakehouseId: string;
};

export const GreenGridScorecardEditor: React.FC<Props> = ({
  workloadClient,
  workspaceId,
  lakehouseId,
}) => {
  const [data, setData] = useState<ScoreResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const sites = await readSitesFromOneLake(workloadClient, workspaceId, lakehouseId);
        setData(await scorePortfolio(sites));
      } catch (e) {
        setError((e as Error).message);
      }
    })();
  }, [workloadClient, workspaceId, lakehouseId]);

  return (
    <FluentProvider theme={webLightTheme}>
      {error && <div role="alert">Failed to load scorecard: {error}</div>}
      {!error && !data && <Spinner label="Reading OneLake and scoring sites…" />}
      {data && (
        <section>
          <h1>GreenGrid Scorecard</h1>
          <p>
            Portfolio score <strong>{data.summary.avgScore}</strong> · {data.summary.totalSites} sites ·
            data from OneLake, scored by GreenGrid.
          </p>
          <ul>
            {data.sites.map((s) => (
              <li key={s.siteId}>
                {s.name} — {s.greenScore} (tier {s.tier}) · {s.tip}
              </li>
            ))}
          </ul>
        </section>
      )}
    </FluentProvider>
  );
};

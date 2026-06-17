# Fabric Motion — Brief

Concise working brief for FY27 EMEA Fabric Application Motion.

## Goal

Build one coherent Microsoft Fabric application motion with two execution tracks:

1. **Advisory / SI track**: spec-driven business apps with Rayfin.
2. **SDC track**: code-driven workloads with Fabric Extensibility Toolkit.

Both tracks converge into one operating model and one reporting rhythm.

```mermaid
%%{init: {'theme':'base','themeVariables':{
  'primaryColor':'#EAF3FB',
  'primaryTextColor':'#1B2A3A',
  'primaryBorderColor':'#0078D4',
  'lineColor':'#0B2447',
  'secondaryColor':'#E6F7F4',
  'tertiaryColor':'#F3F7FB'
}}}%%
flowchart LR
    A["Advisory / SI<br/>Rayfin · spec-driven"] --> C["ONE Fabric Motion<br/>EMEA"]
    B["SDC<br/>Extensibility Kit · code-driven"] --> C
    C --> D["Micro Hack vehicle<br/>Morning demos · Afternoon build"]
    D --> E["Outcomes<br/>Apps + Workloads + Adoption"]
    classDef advisory fill:#EAF3FB,stroke:#0078D4,color:#1B2A3A,stroke-width:2px;
    classDef sdc fill:#E6F7F4,stroke:#00B4A6,color:#1B2A3A,stroke-width:2px;
    classDef core fill:#0B2447,stroke:#0B2447,color:#FFFFFF,stroke-width:2px;
    classDef out fill:#F3F7FB,stroke:#5B6B7B,color:#1B2A3A,stroke-width:2px;
    class A advisory;
    class B sdc;
    class C,D core;
    class E out;
```

## KPI model

| Track | Primary KPI | Secondary KPI |
|---|---|---|
| Advisory / SI | # opportunities (MSX / CRM) | Stage 1–2 quality + ACR proxy |
| SDC | # workloads per SDC | workload adoption + Fabric capacity use |

## Activation baseline

- **Vehicle**: one-day Micro Hack format.
- **Ecosystem**: PwC, KPMG, EY, HVMC, Bain, BCG, McKinsey.
- **Ask**: sponsorship, funding, PM workloads alignment.

## Working artifacts in `/docs`

- `app-motion-overview.md`: full strategy template.
- `microhack-1-business-apps-solution.md`: complete Rayfin business app solution with simulated captures.
- `microhack-1-business-apps-setup.md`: trainer setup guide (apps track).
- `microhack-1-business-apps-workbook.md`: participant workbook (apps track).
- `microhack-2-sdc-workloads-solution.md`: full SDC workload solution with screenshots.
- `microhack-2-sdc-workloads-setup.md`: trainer setup guide (SDC track).
- `microhack-2-sdc-workloads-workbook.md`: participant workbook (SDC track).

## Working code in `/src`

- `src/apprayfin/`: implementation package for the Business Apps scenario.
- `src/workloadsdc/`: SaaS + Fabric workload package for the SDC scenario.

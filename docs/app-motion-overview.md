# FY27 EMEA — Fabric App Motion Overview

Single reference for business direction, delivery model and KPI logic.

## 1) Motion in one page

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
    A["Track A<br/>Advisory / SI<br/>Rayfin apps"] --> M["ONE MOTION<br/>Fabric App Platform"]
    B["Track B<br/>SDC<br/>Fabric workloads"] --> M
    M --> V["Vehicle<br/>Micro Hack (1 day)"]
    V --> O["Outcomes<br/>Apps + Workloads + Adoption"]
    classDef a fill:#EAF3FB,stroke:#0078D4,color:#1B2A3A,stroke-width:2px;
    classDef b fill:#E6F7F4,stroke:#00B4A6,color:#1B2A3A,stroke-width:2px;
    classDef c fill:#0B2447,stroke:#0B2447,color:#FFFFFF,stroke-width:2px;
    classDef d fill:#F3F7FB,stroke:#5B6B7B,color:#1B2A3A,stroke-width:2px;
    class A a;
    class B b;
    class M,V c;
    class O d;
```

## 2) KPI frame

| Track | KPI | KPI interpretation |
|---|---|---|
| Advisory / SI | # opportunities (MSX/CRM) | Stage quality + revenue proxy (ACR view) |
| SDC | # workloads per SDC | Productized adoption + Fabric usage growth |

## 3) Operating principle

1. Microsoft/EPS prepares a repeatable vehicle.
2. First run is co-delivered.
3. Partners repeat independently with customers.

```mermaid
%%{init: {'theme':'base'}}%%
sequenceDiagram
    participant EPS as EPS Team
    participant P as Partner Team
    participant C as End Customer
    EPS->>P: Micro Hack package + enablement
    EPS->>P: Co-deliver run #1
    P->>C: Deliver run #2..N
    C-->>P: Use case + feedback
    P-->>EPS: KPI evidence (opportunities / workloads)
```

## 4) Asset map in `/docs`

- `motion-brief.md`: concise narrative baseline.
- `microhack-1-business-apps-solution.md`: full Business Apps solution with screenshots.
- `microhack-1-business-apps-setup.md`: trainer setup for end-customer apps.
- `microhack-1-business-apps-workbook.md`: participant workbook for apps.
- `microhack-2-sdc-workloads-solution.md`: full SDC workload solution with screenshots.
- `microhack-2-sdc-workloads-setup.md`: trainer setup for SDC workload build.
- `microhack-2-sdc-workloads-workbook.md`: participant workbook for SDC build.

## 5) Code asset map in `/src`

- `src/apprayfin/`: Business Apps Rayfin implementation package for the Helios scenario.
- `src/workloadsdc/`: SDC workload + GreenGrid SaaS package for the GreenGrid scenario.

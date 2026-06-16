# AppRayfin Solution - Helios Mobility Business App

Reference implementation for the **Business Apps (Rayfin)** micro-hack scenario.
This is the trainer-grade solution aligned with:

- `docs/microhack-1-business-apps-setup.md`
- `docs/microhack-1-business-apps-workbook.md`
- `src/apprayfin/`

---

## 1) End-to-end solution map

```mermaid
%%{init: {'theme':'base','themeVariables':{
  'primaryColor':'#EAF3FB',
  'primaryTextColor':'#1B2A3A',
  'primaryBorderColor':'#0078D4',
  'lineColor':'#0B2447',
  'secondaryColor':'#E6F7F4'
}}}%%
flowchart LR
    D["Helios sample data<br/>Scooters + Battery + Tickets"] --> M["Rayfin data model<br/>src/apprayfin/rayfin/data"]
    M --> S["Business services<br/>priority + assignment + KPI"]
    S --> U["Rayfin-generated app UX<br/>Fleet list · Detail · Queue · KPI"]
    U --> K["Advisory KPI output<br/>MSX opportunity pipeline"]
    classDef data fill:#F3F7FB,stroke:#5B6B7B,color:#1B2A3A,stroke-width:2px;
    classDef model fill:#EAF3FB,stroke:#0078D4,color:#1B2A3A,stroke-width:2px;
    classDef service fill:#0B2447,stroke:#0B2447,color:#FFFFFF,stroke-width:2px;
    classDef outcome fill:#E6F7F4,stroke:#00B4A6,color:#1B2A3A,stroke-width:2px;
    class D data;
    class M model;
    class S,U service;
    class K outcome;
```

---

## 2) What is coded in `src/apprayfin`

| Area | Files | Purpose |
|---|---|---|
| Rayfin model | `rayfin/data/*.ts` | Canonical entities and roles for fleet operations |
| Rayfin service config | `rayfin/rayfin.yml` | Auth/data/storage/static hosting configuration |
| Business logic | `src/services/*.ts` | Priority scoring, technician assignment, KPI projection |
| Scenario seed | `src/seed/helios-demo-seed.ts` | Consistent sample payload for demos and coaching |
| Generation spec | `src/specs/helios-fleet-spec.md` | Prompt-ready application specification for Rayfin |

---

## 3) Simulated screenshots (graphical mock captures)

### 3.1 Fleet List screen (manager view)

```mermaid
%%{init: {'theme':'base','themeVariables':{
  'primaryColor':'#EAF3FB',
  'primaryTextColor':'#1B2A3A',
  'primaryBorderColor':'#0078D4',
  'lineColor':'#0B2447'
}}}%%
flowchart TB
    subgraph Screen["Fleet List - Helios Fleet Ops"]
      F1["Filters<br/>City = Amsterdam<br/>Attention only = ON"]
      T1["Table<br/>HEL-AMS-001 | maintenance-pending | 12% | ATTENTION<br/>HEL-AMS-014 | available | 48% | OK"]
      A1["Action<br/>Open ticket from selected scooter"]
    end
    F1 --> T1 --> A1
    classDef filter fill:#F3F7FB,stroke:#5B6B7B,color:#1B2A3A,stroke-width:2px;
    classDef table fill:#EAF3FB,stroke:#0078D4,color:#1B2A3A,stroke-width:2px;
    classDef action fill:#0B2447,stroke:#0B2447,color:#FFFFFF,stroke-width:2px;
    class F1 filter;
    class T1 table;
    class A1 action;
```

### 3.2 Maintenance Queue screen (dispatch view)

```mermaid
%%{init: {'theme':'base','themeVariables':{
  'primaryColor':'#E6F7F4',
  'primaryTextColor':'#1B2A3A',
  'primaryBorderColor':'#00B4A6',
  'lineColor':'#0B2447'
}}}%%
flowchart LR
    subgraph New["New"]
      N1["T-1001<br/>Critical<br/>Battery below policy threshold"]
    end
    subgraph Assigned["Assigned"]
      A2["T-1002<br/>High<br/>Assigned to Ibrahim Nasser"]
    end
    subgraph Progress["In Progress"]
      P1["T-1003<br/>Medium<br/>Diagnostics running"]
    end
    N1 --> A2 --> P1
    classDef ticket fill:#E6F7F4,stroke:#00B4A6,color:#1B2A3A,stroke-width:2px;
    class N1,A2,P1 ticket;
```

### 3.3 KPI screen (advisory impact view)

```mermaid
%%{init: {'theme':'base','themeVariables':{
  'primaryColor':'#EAF3FB',
  'primaryTextColor':'#1B2A3A',
  'primaryBorderColor':'#0078D4',
  'lineColor':'#0B2447',
  'secondaryColor':'#E6F7F4'
}}}%%
flowchart TB
    K1["Card<br/>Workshops delivered = 8"]
    K2["Card<br/>Pilot conversion = 50%"]
    K3["Card<br/>Opportunity conversion = 75%"]
    K4["Card<br/>Projected opportunities next quarter = 3"]
    K1 --> K2 --> K3 --> K4
    classDef card fill:#EAF3FB,stroke:#0078D4,color:#1B2A3A,stroke-width:2px;
    classDef out fill:#0B2447,stroke:#0B2447,color:#FFFFFF,stroke-width:2px;
    class K1,K2,K3 card;
    class K4 out;
```

---

## 4) Trainer answer key linkage

These files are the concrete implementation references used during facilitation:

1. `src/apprayfin/src/services/fleet-priority.ts` -> how "needs attention" is scored.
2. `src/apprayfin/src/services/maintenance-assignment.ts` -> how tickets are assigned.
3. `src/apprayfin/src/services/kpi-model.ts` -> how advisory KPI projections are computed.
4. `src/apprayfin/src/specs/helios-fleet-spec.md` -> what participants should target in Rayfin.

Use this document during the afternoon sprint to keep teams aligned on scope and expected output.

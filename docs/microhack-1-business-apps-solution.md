# Micro Hack 1 - Business Apps Solution (Helios Bicycle)

Reference implementation for the **Business Apps (Rayfin)** micro-hack scenario 1.
This is the trainer-grade solution aligned with:

- `docs/microhack-1-business-apps-setup.md`
- `docs/microhack-1-business-apps-workbook.md`
- `src/apprayfin/`

---

## 1) App metier definition

**App name:** `Helios Bicycle Studio`  
**Business context:** Helios Bicycle operates city bike stations and wants one app to run
daily operations with a light and fun experience.

### What the app does

1. Shows bicycle readiness by station.
2. Opens and assigns quick pit-stop tickets.
3. Tracks rider mood to detect quality issues early.
4. Surfaces simple business KPIs (workshops -> PoC -> opportunities).

---

## 2) End-to-end solution map

```mermaid
%%{init: {'theme':'base','themeVariables':{
  'primaryColor':'#EAF3FB',
  'primaryTextColor':'#1B2A3A',
  'primaryBorderColor':'#0078D4',
  'lineColor':'#0B2447',
  'secondaryColor':'#E6F7F4'
}}}%%
flowchart LR
    D["Helios Bicycle data<br/>Bikes + Ride sessions + Pit-stop tickets"] --> M["Rayfin data model<br/>src/apprayfin/rayfin/data"]
    M --> S["Business services<br/>health + assignment + KPI"]
    S --> U["Rayfin-generated app UX<br/>Bicycle board · Pit-stop queue · Ride mood"]
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

## 3) What is coded in `src/apprayfin`

| Area | Files | Purpose |
|---|---|---|
| Rayfin model | `rayfin/data/*.ts` | Canonical entities and roles for bicycle operations |
| Rayfin service config | `rayfin/rayfin.yml` | Auth/data/storage/static hosting configuration |
| Business logic | `src/services/*.ts` | Bike health scoring, mechanic assignment, KPI projection |
| Scenario seed | `src/seed/helios-demo-seed.ts` | Consistent sample payload for demos and coaching |
| Generation spec | `src/specs/helios-bicycle-app-spec.md` | Prompt-ready application specification for Rayfin |

---

## 4) Simulated screenshots (graphical mock captures)

### 4.1 Bicycle Board screen (manager view)

```mermaid
%%{init: {'theme':'base','themeVariables':{
  'primaryColor':'#EAF3FB',
  'primaryTextColor':'#1B2A3A',
  'primaryBorderColor':'#0078D4',
  'lineColor':'#0B2447'
}}}%%
flowchart TB
    subgraph Screen["Bicycle Board - Helios Bicycle Studio"]
      F1["Filters<br/>Station = Amsterdam Central<br/>Status = pit-stop-needed"]
      T1["Table<br/>HB-AMS-001 | pit-stop-needed | mood 2.8<br/>HB-AMS-014 | ready | mood 4.7"]
      A1["Action<br/>Open pit-stop ticket from selected bike"]
    end
    F1 --> T1 --> A1
    classDef filter fill:#F3F7FB,stroke:#5B6B7B,color:#1B2A3A,stroke-width:2px;
    classDef table fill:#EAF3FB,stroke:#0078D4,color:#1B2A3A,stroke-width:2px;
    classDef action fill:#0B2447,stroke:#0B2447,color:#FFFFFF,stroke-width:2px;
    class F1 filter;
    class T1 table;
    class A1 action;
```

### 4.2 Pit-Stop Queue screen (dispatch view)

```mermaid
%%{init: {'theme':'base','themeVariables':{
  'primaryColor':'#E6F7F4',
  'primaryTextColor':'#1B2A3A',
  'primaryBorderColor':'#00B4A6',
  'lineColor':'#0B2447'
}}}%%
flowchart LR
    subgraph New["New"]
      N1["T-1001<br/>High<br/>Front brake check"]
    end
    subgraph Assigned["Assigned"]
      A2["T-1002<br/>High<br/>Assigned to Ibrahim Nasser"]
    end
    subgraph Progress["In Progress"]
      P1["T-1003<br/>Normal<br/>Saddle adjustment running"]
    end
    N1 --> A2 --> P1
    classDef ticket fill:#E6F7F4,stroke:#00B4A6,color:#1B2A3A,stroke-width:2px;
    class N1,A2,P1 ticket;
```

### 4.3 Ride Mood + KPI screen (business view)

```mermaid
%%{init: {'theme':'base','themeVariables':{
  'primaryColor':'#EAF3FB',
  'primaryTextColor':'#1B2A3A',
  'primaryBorderColor':'#0078D4',
  'lineColor':'#0B2447',
  'secondaryColor':'#E6F7F4'
}}}%%
flowchart TB
    M1["Card<br/>Average rider mood = 4.1 / 5"]
    M2["Card<br/>Bikes needing pit-stop = 2"]
    K1["Card<br/>Workshops delivered = 8"]
    K2["Card<br/>PoC conversion = 50%"]
    K3["Card<br/>Opportunity conversion = 75%"]
    M1 --> M2 --> K1 --> K2 --> K3
    classDef card fill:#EAF3FB,stroke:#0078D4,color:#1B2A3A,stroke-width:2px;
    classDef out fill:#0B2447,stroke:#0B2447,color:#FFFFFF,stroke-width:2px;
    class M1,M2,K1,K2 card;
    class K3 out;
```

---

## 5) Trainer answer key linkage

These files are the concrete implementation references used during facilitation:

1. `src/apprayfin/src/services/bike-health.ts` -> how bike health and mood signals are scored.
2. `src/apprayfin/src/services/pit-stop-assignment.ts` -> how pit-stop tickets are assigned.
3. `src/apprayfin/src/services/business-kpi.ts` -> how advisory KPI projections are computed.
4. `src/apprayfin/src/specs/helios-bicycle-app-spec.md` -> what participants should target in Rayfin.

Use this document during the afternoon sprint to keep teams aligned on scope and expected output.

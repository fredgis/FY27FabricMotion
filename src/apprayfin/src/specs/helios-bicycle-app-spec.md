# Helios Bicycle Studio - Rayfin generation spec

Use this spec to generate a simple and fun business app for the Helios Bicycle scenario.

## App intent

Create an app for city bicycle operations teams to:

1. Monitor bicycle readiness by station.
2. Open and assign quick pit-stop tickets.
3. Track rider mood as a quality signal.
4. Follow simple business KPIs for workshop conversion.

## Data entities

- `Bicycle`
  - `bikeCode`
  - `station`
  - `status`
  - `featured`
- `RideSession`
  - `bicycle`
  - `riderAlias`
  - `moodScore`
  - `startedAt`
  - `endedAt`
- `PitStopTicket`
  - `ticketCode`
  - `bicycle`
  - `station`
  - `priority`
  - `status`
  - `issue`
  - `openedAt`
  - `assignedMechanic`
- `MechanicProfile`
  - `displayName`
  - `station`
  - `active`

## Screens

1. **Bicycle Board**
   - Grid by station.
   - Columns: bike code, status, rider mood.
   - Filters: station, status.
2. **Live Map**
   - City map with one marker per bike, colored by status.
   - Per-station summary (ready / in ride / pit-stop).
3. **Pit-Stop Queue**
   - Short queue with new/assigned/done.
   - Action: assign mechanic in one click.
4. **Ride Mood**
   - Last sessions with mood trend.
   - Flag low mood bicycles.
5. **Business KPI**
   - Cards: workshops, PoCs, opportunities.

## Roles

- **Operations Manager**: read/write all bikes and tickets.
- **Mechanic**: update only assigned pit-stop tickets.

## Acceptance criteria

- A manager can find all pit-stop-needed bicycles for one station.
- A manager can create and assign a pit-stop ticket in less than 3 clicks.
- A mechanic can close an assigned ticket.
- KPI cards update after data refresh.

## How to build it in Rayfin

```bash
npm create @microsoft/rayfin@latest -- --template dataapp
npm run dev   # deploys to Fabric and provisions the database from rayfin/data/*.ts
```

The data model above is declared in `rayfin/data/*.ts`; Rayfin provisions and migrates
the database. Build the UI conversationally with GitHub Copilot using this master prompt:

```text
Build "Helios Bicycle Studio", a fun bike-operations app on Rayfin.
Data: Bicycle(bikeCode, station, status[ready|in-ride|pit-stop-needed], featured);
RideSession(bicycle, riderAlias, moodScore, startedAt, endedAt);
PitStopTicket(ticketCode, bicycle, station, priority[high|normal],
              status[new|assigned|done], issue, openedAt, assignedMechanic);
MechanicProfile(displayName, station, active).
Screens: Bicycle Board (table by station, status pill, mood stars, health tag,
filters station/status); Pit-Stop Queue (kanban new/assigned/done, create ticket
from a bike, one-click assign preferring same-station least-loaded mechanic);
Ride Mood & KPI (cards: average mood, bikes needing pit-stop, workshop->PoC->opportunity).
Roles: Operations Manager full access; Mechanic sees only assigned tickets.
Style: clean, friendly, Microsoft Fluent, blue #0078d4 + teal #00b4a6, bike icon per row.
```

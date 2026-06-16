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
2. **Pit-Stop Queue**
   - Short queue with new/assigned/done.
   - Action: assign mechanic in one click.
3. **Ride Mood**
   - Last sessions with mood trend.
   - Flag low mood bicycles.
4. **Business KPI**
   - Cards: workshops, PoCs, opportunities.

## Roles

- **Operations Manager**: read/write all bikes and tickets.
- **Mechanic**: update only assigned pit-stop tickets.

## Acceptance criteria

- A manager can find all pit-stop-needed bicycles for one station.
- A manager can create and assign a pit-stop ticket in less than 3 clicks.
- A mechanic can close an assigned ticket.
- KPI cards update after data refresh.

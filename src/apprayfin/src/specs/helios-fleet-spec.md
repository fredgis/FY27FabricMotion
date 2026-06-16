# Helios Fleet Ops - Rayfin generation spec

Use this specification in Rayfin to generate the baseline Business App for Helios Mobility.

## App intent

Create a fleet operations app that helps city operations managers and field technicians:

1. Detect scooters requiring intervention.
2. Prioritize interventions by operational risk.
3. Assign maintenance tickets to the right technician.
4. Track completion and KPI progress.

## Data entities

- `Scooter`
  - `scooterCode`
  - `city`
  - `status`
  - `needsAttention`
- `BatteryReading`
  - `scooter`
  - `chargePercent`
  - `measuredAt`
- `MaintenanceTicket`
  - `ticketCode`
  - `scooter`
  - `city`
  - `priority`
  - `status`
  - `reason`
  - `openedAt`
  - `assignedTechnician`
- `TechnicianProfile`
  - `displayName`
  - `city`
  - `role`
  - `active`

## Screens

1. **Fleet List**
   - Table grouped by city.
   - Columns: scooter code, status, latest battery, needs attention flag.
   - Filters: city, status, attention only.
2. **Scooter Detail**
   - Timeline: battery trend + recent tickets.
   - Action: create maintenance ticket.
3. **Maintenance Queue**
   - Kanban by ticket status.
   - Action: assign technician.
4. **Ops KPI**
   - Cards: active tickets, critical tickets, average assignment delay.

## Roles

- **Manager**: full read/write on tickets and assignments.
- **Technician**: read scooters, update only assigned tickets.

## Acceptance criteria

- A manager can filter scooters in one city and see only attention cases.
- A manager can create and assign a new ticket in less than 3 clicks.
- A technician sees only assigned tickets in their city.
- KPI cards refresh after ticket updates.

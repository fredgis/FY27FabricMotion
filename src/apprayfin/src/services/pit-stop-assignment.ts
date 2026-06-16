import {
  MechanicSnapshot,
  PitStopTicketSnapshot,
  PitStopPriority,
} from '../domain/types.js';

export type PitStopAssignmentResult = {
  ticketId: string;
  assignedMechanicId: string | null;
  note: string;
};

const PRIORITY_WEIGHT: Record<PitStopPriority, number> = {
  high: 100,
  normal: 60,
};

function scoreMechanicFit(
  ticket: PitStopTicketSnapshot,
  mechanic: MechanicSnapshot
): number {
  if (!mechanic.active) {
    return -1;
  }

  const stationMatch = ticket.station === mechanic.station ? 25 : 0;
  const loadPenalty = mechanic.activeTicketCount * 10;
  return PRIORITY_WEIGHT[ticket.priority] + stationMatch - loadPenalty;
}

export function assignPitStopTickets(
  tickets: PitStopTicketSnapshot[],
  mechanics: MechanicSnapshot[]
): PitStopAssignmentResult[] {
  const mutableMechanics = mechanics.map((mechanic) => ({ ...mechanic }));
  const sortedTickets = [...tickets].sort(
    (left, right) => PRIORITY_WEIGHT[right.priority] - PRIORITY_WEIGHT[left.priority]
  );

  return sortedTickets.map((ticket) => {
    const candidates = mutableMechanics
      .map((mechanic) => ({
        mechanic,
        score: scoreMechanicFit(ticket, mechanic),
      }))
      .filter((candidate) => candidate.score >= 0)
      .sort((left, right) => right.score - left.score);

    if (candidates.length === 0) {
      return {
        ticketId: ticket.ticketId,
        assignedMechanicId: null,
        note: 'No active mechanic available',
      };
    }

    const selected = candidates[0].mechanic;
    selected.activeTicketCount += 1;

    return {
      ticketId: ticket.ticketId,
      assignedMechanicId: selected.mechanicId,
      note:
        ticket.station === selected.station
          ? 'Assigned to same-station mechanic'
          : 'Assigned to next available mechanic',
    };
  });
}

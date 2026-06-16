import {
  MaintenanceTicketSnapshot,
  TechnicianSnapshot,
  TicketPriority,
} from '../domain/types.js';

export type AssignmentResult = {
  ticketId: string;
  assignedTechnicianId: string | null;
  assignmentNote: string;
};

const PRIORITY_WEIGHT: Record<TicketPriority, number> = {
  critical: 100,
  high: 60,
  medium: 30,
};

function scoreTechnicianFit(
  ticket: MaintenanceTicketSnapshot,
  technician: TechnicianSnapshot
): number {
  if (!technician.active) {
    return -1;
  }

  const cityMatch = ticket.city === technician.city ? 30 : 0;
  const loadPenalty = technician.activeTicketCount * 8;
  return PRIORITY_WEIGHT[ticket.priority] + cityMatch - loadPenalty;
}

export function assignMaintenanceTickets(
  tickets: MaintenanceTicketSnapshot[],
  technicians: TechnicianSnapshot[]
): AssignmentResult[] {
  const sortedTickets = [...tickets].sort(
    (left, right) => PRIORITY_WEIGHT[right.priority] - PRIORITY_WEIGHT[left.priority]
  );

  const mutableTechnicians = technicians.map((technician) => ({ ...technician }));

  return sortedTickets.map((ticket) => {
    const candidates = mutableTechnicians
      .map((technician) => ({
        technician,
        score: scoreTechnicianFit(ticket, technician),
      }))
      .filter((candidate) => candidate.score >= 0)
      .sort((left, right) => right.score - left.score);

    if (candidates.length === 0) {
      return {
        ticketId: ticket.ticketId,
        assignedTechnicianId: null,
        assignmentNote: 'No active technician available',
      };
    }

    const selected = candidates[0].technician;
    selected.activeTicketCount += 1;

    return {
      ticketId: ticket.ticketId,
      assignedTechnicianId: selected.technicianId,
      assignmentNote:
        ticket.city === selected.city
          ? 'Assigned to same-city technician'
          : 'Assigned to nearest available technician',
    };
  });
}

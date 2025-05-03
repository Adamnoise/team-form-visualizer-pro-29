
export interface Team {
  id: string;
  name: string;
  logoUrl?: string;
}

export const TEAMS: Team[] = [
  { id: 'team1', name: 'Team 1' },
  { id: 'team2', name: 'Team 2' },
  { id: 'team3', name: 'Team 3' },
  { id: 'team4', name: 'Team 4' },
  { id: 'team5', name: 'Team 5' },
  { id: 'team6', name: 'Team 6' },
  { id: 'team7', name: 'Team 7' },
  { id: 'team8', name: 'Team 8' },
];

export function getHungarianTeamName(teamId: string): string {
  const team = TEAMS.find(t => t.id === teamId);
  return team?.name || teamId;
}

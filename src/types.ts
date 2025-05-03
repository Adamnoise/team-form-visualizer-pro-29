
// If there's an existing types.ts file, this will add the missing types.
// If the file exists, you may need to just add new types.

export interface Team {
  id: string;
  name: string;
  category: string;
  founded: string;
  stadium: string;
  coach?: string;
}

export interface Match {
  id?: string;
  date: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  htHomeScore?: number;
  htAwayScore?: number;
  venue?: string;
  leagueId?: string;
  round?: string;
  home_team?: string; // Added for backward compatibility
  away_team?: string; // Added for backward compatibility
  home_score?: number; // Added for backward compatibility
  away_score?: number; // Added for backward compatibility
  ht_home_score?: number; // Added for backward compatibility
  ht_away_score?: number; // Added for backward compatibility
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  position: string;
  goals: number;
  assists?: number;
  appearances?: number;
}

export interface League {
  id: string;
  name: string;
  season: string;
  startDate: string;
  endDate: string;
  winPoints: number;
  drawPoints: number;
  lossPoints: number;
}

export interface LeagueData {
  id: string;
  season: string;
  name?: string;
  winner?: string;
  secondPlace?: string;
  thirdPlace?: string;
  status: string;
}

// New types needed for the components
export interface TeamForm {
  team: string;
  teamId?: string; // Made optional to accommodate mock data
  played: number;
  won?: number; // Made optional to accommodate mock data
  drawn?: number; // Made optional to accommodate mock data
  lost?: number; // Made optional to accommodate mock data
  goalsFor: number;
  goalsAgainst: number;
  goalDifference?: number; // Made optional to accommodate mock data
  points: number;
  form?: string[];
  position?: number;
  lastPosition?: number;
}

export interface StandingsEntry {
  teamId: string;
  teamName: string;
  team?: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  position: number;
  previousPosition?: number;
  form?: string[];
  zone?: string;
}


import { Team, Match, Player, League } from '../types';

// Mock data for demonstration purposes
let teams: Team[] = [
  { id: 'team1', name: 'Team 1', category: 'premier', founded: '1886', stadium: 'Stadium 1', coach: 'Coach 1' },
  { id: 'team2', name: 'Team 2', category: 'premier', founded: '1878', stadium: 'Stadium 2', coach: 'Coach 2' },
  { id: 'team3', name: 'Team 3', category: 'premier', founded: '1880', stadium: 'Stadium 3', coach: 'Coach 3' },
  { id: 'team4', name: 'Team 4', category: 'premier', founded: '1874', stadium: 'Stadium 4', coach: 'Coach 4' },
  { id: 'team5', name: 'Team 5', category: 'premier', founded: '1892', stadium: 'Stadium 5', coach: 'Coach 5' },
];

let matches: Match[] = [
  { 
    id: 'match1', 
    date: '2023-10-15', 
    homeTeamId: 'team1', 
    awayTeamId: 'team2', 
    homeScore: 2, 
    awayScore: 1, 
    venue: 'Stadium 1', 
    leagueId: 'premier' 
  },
  {
    id: 'match2',
    date: '2023-10-22',
    homeTeamId: 'team3',
    awayTeamId: 'team5',
    homeScore: 3,
    awayScore: 3,
    venue: 'Stadium 3',
    leagueId: 'premier'
  },
  {
    id: 'match3',
    date: '2023-11-01',
    homeTeamId: 'team4',
    awayTeamId: 'team1',
    homeScore: 0,
    awayScore: 2,
    venue: 'Stadium 4',
    leagueId: 'premier'
  },
  {
    id: 'match4',
    date: '2023-11-10',
    homeTeamId: 'team2',
    awayTeamId: 'team3',
    homeScore: 1,
    awayScore: 3,
    venue: 'Stadium 2',
    leagueId: 'premier'
  },
];

let players: Player[] = [
  { id: 'player1', name: 'Player 1', teamId: 'team2', position: 'Forward', goals: 15, assists: 5, appearances: 20 },
  { id: 'player2', name: 'Player 2', teamId: 'team3', position: 'Midfielder', goals: 8, assists: 12, appearances: 18 },
  { id: 'player3', name: 'Player 3', teamId: 'team1', position: 'Winger', goals: 10, assists: 7, appearances: 21 },
  { id: 'player4', name: 'Player 4', teamId: 'team4', position: 'Forward', goals: 12, assists: 3, appearances: 19 },
  { id: 'player5', name: 'Player 5', teamId: 'team5', position: 'Forward', goals: 14, assists: 8, appearances: 20 },
];

export const fetchTeams = async (): Promise<Team[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return teams;
};

export const fetchMatches = async (): Promise<Match[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return matches;
};

export const fetchPlayers = async (): Promise<Player[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return players;
};

export const addMatch = async (match: Match): Promise<Match> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  matches.push(match);
  return match;
};

export const updateLeague = async (league: League): Promise<League> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return league;
};

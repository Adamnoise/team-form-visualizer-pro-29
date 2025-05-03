
import { TeamForm, Match } from "@/types";
import { getHungarianTeamName } from "./teamsData";

export const mockTeamForms: TeamForm[] = [
  {
    position: 1,
    team: "Manchester Kék",
    teamId: "mancity",
    played: 38,
    won: 28,
    drawn: 5,
    lost: 5,
    goalsFor: 94,
    goalsAgainst: 33,
    goalDifference: 61,
    points: 89,
    form: ["W", "W", "W", "D", "W"]
  },
  {
    position: 2,
    team: "London Ágyúk",
    teamId: "arsenal",
    played: 38,
    won: 27,
    drawn: 3,
    lost: 8,
    goalsFor: 88,
    goalsAgainst: 29,
    goalDifference: 59,
    points: 84,
    form: ["W", "W", "W", "W", "L"]
  },
  {
    position: 3,
    team: "Liverpool",
    teamId: "liverpool",
    played: 38,
    won: 25,
    drawn: 7,
    lost: 6,
    goalsFor: 82,
    goalsAgainst: 40,
    goalDifference: 42,
    points: 82,
    form: ["W", "D", "W", "L", "W"]
  },
  {
    position: 4,
    team: "Aston Oroszlán",
    teamId: "astonvilla",
    played: 38,
    won: 20,
    drawn: 8,
    lost: 10,
    goalsFor: 76,
    goalsAgainst: 58,
    goalDifference: 18,
    points: 68,
    form: ["L", "W", "W", "L", "W"]
  },
  {
    position: 5,
    team: "Tottenham",
    teamId: "tottenham",
    played: 38,
    won: 18,
    drawn: 10,
    lost: 10,
    goalsFor: 74,
    goalsAgainst: 62,
    goalDifference: 12,
    points: 64,
    form: ["L", "D", "L", "W", "W"]
  },
  {
    position: 6,
    team: "Chelsea",
    teamId: "chelsea",
    played: 38,
    won: 18,
    drawn: 9,
    lost: 11,
    goalsFor: 77,
    goalsAgainst: 63,
    goalDifference: 14,
    points: 63,
    form: ["W", "W", "D", "W", "D"]
  },
  {
    position: 7,
    team: "Newcastle",
    teamId: "newcastle",
    played: 38,
    won: 18,
    drawn: 8,
    lost: 12,
    goalsFor: 85,
    goalsAgainst: 52,
    goalDifference: 33,
    points: 62,
    form: ["W", "W", "L", "W", "L"]
  },
  {
    position: 8,
    team: "Vörös Ördögök",
    teamId: "manutd",
    played: 38,
    won: 18,
    drawn: 6,
    lost: 14,
    goalsFor: 57,
    goalsAgainst: 58,
    goalDifference: -1,
    points: 60,
    form: ["L", "W", "D", "L", "W"]
  },
  {
    position: 9,
    team: "West Ham",
    teamId: "westham",
    played: 38,
    won: 15,
    drawn: 7,
    lost: 16,
    goalsFor: 67,
    goalsAgainst: 71,
    goalDifference: -4,
    points: 52,
    form: ["L", "L", "D", "W", "L"]
  },
  {
    position: 10,
    team: "Brighton",
    teamId: "brighton",
    played: 38,
    won: 14,
    drawn: 10,
    lost: 14,
    goalsFor: 65,
    goalsAgainst: 65,
    goalDifference: 0,
    points: 52,
    form: ["D", "L", "W", "L", "D"]
  }
];

export const mockMatches: Match[] = [
  {
    date: "2023-08-12",
    homeTeamId: "Manchester Kék",
    awayTeamId: "Chelsea",
    htHomeScore: 1,
    htAwayScore: 0,
    homeScore: 3,
    awayScore: 1,
    round: "1"
  },
  {
    date: "2023-08-19",
    homeTeamId: "London Ágyúk",
    awayTeamId: "Liverpool",
    htHomeScore: 0,
    htAwayScore: 0,
    homeScore: 2,
    awayScore: 2,
    round: "2"
  },
  {
    date: "2023-08-26",
    homeTeamId: "Tottenham",
    awayTeamId: "Vörös Ördögök",
    htHomeScore: 1,
    htAwayScore: 0,
    homeScore: 2,
    awayScore: 0,
    round: "3"
  },
  {
    date: "2023-09-02",
    homeTeamId: "Newcastle",
    awayTeamId: "Brighton",
    htHomeScore: 2,
    htAwayScore: 1,
    homeScore: 4,
    awayScore: 1,
    round: "4"
  },
  {
    date: "2023-09-16",
    homeTeamId: "Liverpool",
    awayTeamId: "West Ham",
    htHomeScore: 1,
    htAwayScore: 1,
    homeScore: 3,
    awayScore: 1,
    round: "5"
  },
  {
    date: "2023-09-23",
    homeTeamId: "Chelsea",
    awayTeamId: "Aston Oroszlán",
    htHomeScore: 0,
    htAwayScore: 1,
    homeScore: 0,
    awayScore: 1,
    round: "6"
  },
  {
    date: "2023-09-30",
    homeTeamId: "Vörös Ördögök",
    awayTeamId: "Manchester Kék",
    htHomeScore: 0,
    htAwayScore: 2,
    homeScore: 0,
    awayScore: 3,
    round: "7"
  },
  {
    date: "2023-10-07",
    homeTeamId: "Brighton",
    awayTeamId: "London Ágyúk",
    htHomeScore: 1,
    htAwayScore: 2,
    homeScore: 1,
    awayScore: 2,
    round: "8"
  }
];


import { useMemo } from "react";
import { Match, TeamForm } from "@/types";
import { Team } from "@/data/teamsData";

interface HeadToHeadStats {
  matchesCount: number;
  team1Wins: number;
  team2Wins: number;
  draws: number;
  team1Goals: number;
  team2Goals: number;
}

export function useHeadToHeadStats(
  team1?: Team,
  team2?: Team,
  matches: Match[] = [],
  standings: TeamForm[] = []
) {
  const h2hMatches = useMemo(() => {
    if (!team1 || !team2) return [];
    
    return matches.filter(match => 
      (match.homeTeamId?.toLowerCase() === team1.id.toLowerCase() && 
       match.awayTeamId?.toLowerCase() === team2.id.toLowerCase()) ||
      (match.homeTeamId?.toLowerCase() === team2.id.toLowerCase() && 
       match.awayTeamId?.toLowerCase() === team1.id.toLowerCase())
    ).sort((a, b) => {
      try {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        
        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
          return 0;
        }
        
        return dateB.getTime() - dateA.getTime();
      } catch (error) {
        return 0;
      }
    });
  }, [team1, team2, matches]);
  
  const team1Stats = useMemo(() => {
    if (!team1) return null;
    return standings.find(stats => stats.team.toLowerCase() === team1.id.toLowerCase());
  }, [team1, standings]);
  
  const team2Stats = useMemo(() => {
    if (!team2) return null;
    return standings.find(stats => stats.team.toLowerCase() === team2.id.toLowerCase());
  }, [team2, standings]);
  
  const h2hStats = useMemo(() => {
    if (!team1 || !team2 || h2hMatches.length === 0) return null;
    
    let team1Wins = 0;
    let team2Wins = 0;
    let draws = 0;
    let team1Goals = 0;
    let team2Goals = 0;
    
    h2hMatches.forEach(match => {
      if (match.homeTeamId?.toLowerCase() === team1.id.toLowerCase()) {
        team1Goals += match.homeScore || 0;
        team2Goals += match.awayScore || 0;
        
        if ((match.homeScore || 0) > (match.awayScore || 0)) team1Wins++;
        else if ((match.homeScore || 0) < (match.awayScore || 0)) team2Wins++;
        else draws++;
      } else {
        team1Goals += match.awayScore || 0;
        team2Goals += match.homeScore || 0;
        
        if ((match.awayScore || 0) > (match.homeScore || 0)) team1Wins++;
        else if ((match.awayScore || 0) < (match.homeScore || 0)) team2Wins++;
        else draws++;
      }
    });
    
    return {
      matchesCount: h2hMatches.length,
      team1Wins,
      team2Wins,
      draws,
      team1Goals,
      team2Goals
    };
  }, [team1, team2, h2hMatches]);
  
  return {
    h2hMatches,
    team1Stats,
    team2Stats,
    h2hStats
  };
}


import { memo, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Team } from "@/data/teamsData";
import { Match, TeamForm } from "@/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";

interface HeadToHeadComparisonProps {
  team1?: Team;
  team2?: Team;
  matches: Match[];
  standings: TeamForm[];
  isLoading?: boolean;
}

const StatComparison = memo(({ label, value1, value2 }: { label: string; value1: string | number; value2: string | number }) => {
  const isValue1Better = Number(value1) > Number(value2);
  const isValue2Better = Number(value2) > Number(value1);
  const isEqual = value1 === value2;

  return (
    <div className="grid grid-cols-3 items-center py-3">
      <div className={`text-center font-semibold ${isValue1Better ? "text-blue-600" : "text-gray-700"}`}>
        {value1}
      </div>
      <div className="text-center text-sm text-gray-500">{label}</div>
      <div className={`text-center font-semibold ${isValue2Better ? "text-blue-600" : "text-gray-700"}`}>
        {value2}
      </div>
    </div>
  );
});

StatComparison.displayName = "StatComparison";

const MatchResultCard = memo(({ match, team1Id, team2Id }: { match: Match; team1Id: string; team2Id: string }) => {
  const isTeam1Home = match.homeTeamId?.toLowerCase() === team1Id.toLowerCase();
  const team1Score = isTeam1Home ? match.homeScore : match.awayScore;
  const team2Score = isTeam1Home ? match.awayScore : match.homeScore;
  
  let resultClass = "bg-gray-100";
  if (team1Score !== null && team2Score !== null) {
    if (team1Score > team2Score) {
      resultClass = "bg-blue-50 border-blue-200";
    } else if (team1Score < team2Score) {
      resultClass = "bg-red-50 border-red-200";
    } else {
      resultClass = "bg-amber-50 border-amber-200";
    }
  }
  
  return (
    <div className={`p-4 rounded-lg border ${resultClass} mb-3`}>
      <div className="text-xs text-gray-500 mb-2">
        {match.date ? format(new Date(match.date), 'MMMM d, yyyy') : 'Date TBD'}
        {match.location && ` • ${match.location}`}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-right flex-1">
          <div className="font-semibold">{isTeam1Home ? 'Home' : 'Away'}</div>
        </div>
        
        <div className="mx-3 text-xl font-bold">
          {team1Score !== null && team2Score !== null
            ? `${team1Score} - ${team2Score}`
            : "vs"}
        </div>
        
        <div className="text-left flex-1">
          <div className="font-semibold">{!isTeam1Home ? 'Home' : 'Away'}</div>
        </div>
      </div>
      
      {match.competition && (
        <div className="text-xs text-gray-500 mt-2 text-center">{match.competition}</div>
      )}
    </div>
  );
});

MatchResultCard.displayName = "MatchResultCard";

const TeamDisplay = memo(({ team, stats }: { team?: Team; stats?: TeamForm }) => {
  if (!team) return null;
  
  return (
    <div className="flex flex-col items-center">
      <Avatar className="w-16 h-16 mb-3">
        {team.logoUrl ? (
          <AvatarImage src={team.logoUrl} alt={team.name} />
        ) : (
          <AvatarFallback className="text-2xl bg-blue-50 text-blue-700">
            {team.name.charAt(0)}
          </AvatarFallback>
        )}
      </Avatar>
      <div className="text-xl font-bold text-center mb-1">{team.name}</div>
      {stats && (
        <div className="text-sm text-gray-500">{stats.position || '-'}. place</div>
      )}
    </div>
  );
});

TeamDisplay.displayName = "TeamDisplay";

const HeadToHeadComparison = memo(({ team1, team2, matches, standings, isLoading = false }: HeadToHeadComparisonProps) => {
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
  
  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <Card className="h-64 bg-gray-200 rounded-xl"></Card>
        <Card className="h-48 bg-gray-200 rounded-xl"></Card>
      </div>
    );
  }

  // If no teams selected
  if (!team1 || !team2) {
    return (
      <Card className="p-8 shadow-sm border border-gray-100 bg-white rounded-xl">
        <div className="py-8 text-center">
          <div className="text-gray-800 mb-2 text-lg font-medium">
            {!team1 && !team2
              ? "Select two teams to compare head-to-head statistics"
              : "Select another team to compare head-to-head statistics"}
          </div>
          <div className="text-sm text-gray-500">
            You'll see their performance, statistics, and historical match results.
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-sm border border-gray-100 bg-white rounded-xl">
        <div className="grid grid-cols-3 items-center mb-8">
          <div className="text-center">
            <TeamDisplay team={team1} stats={team1Stats} />
          </div>
          
          <div className="text-center">
            {h2hStats ? (
              <div className="bg-gray-50 px-6 py-4 rounded-lg border border-gray-100">
                <div className="text-2xl font-bold text-gray-900">
                  {h2hStats.team1Wins} - {h2hStats.draws} - {h2hStats.team2Wins}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {h2hStats.matchesCount} matches
                </div>
              </div>
            ) : (
              <div className="px-6 py-4">
                <div className="text-gray-500">No matches found</div>
              </div>
            )}
          </div>
          
          <div className="text-center">
            <TeamDisplay team={team2} stats={team2Stats} />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-lg font-semibold text-center mb-6 text-gray-800">Team Comparison</h3>
          
          <div className="space-y-1 divide-y divide-gray-100">
            <StatComparison 
              label="Points" 
              value1={team1Stats?.points || '0'} 
              value2={team2Stats?.points || '0'} 
            />
            <StatComparison 
              label="Position" 
              value1={team1Stats?.position || '-'} 
              value2={team2Stats?.position || '-'} 
            />
            <StatComparison 
              label="Goals Scored" 
              value1={team1Stats?.goalsFor || '0'} 
              value2={team2Stats?.goalsFor || '0'} 
            />
            <StatComparison 
              label="Goals Conceded" 
              value1={team1Stats?.goalsAgainst || '0'} 
              value2={team2Stats?.goalsAgainst || '0'} 
            />
            <StatComparison 
              label="Goal Difference" 
              value1={(team1Stats ? team1Stats.goalsFor - team1Stats.goalsAgainst : 0) || '0'} 
              value2={(team2Stats ? team2Stats.goalsFor - team2Stats.goalsAgainst : 0) || '0'} 
            />
            <StatComparison 
              label="Win Rate" 
              value1={`${team1Stats?.played ? Math.round(((team1Stats?.won || 0) / team1Stats.played) * 100) : 0}%`} 
              value2={`${team2Stats?.played ? Math.round(((team2Stats?.won || 0) / team2Stats.played) * 100) : 0}%`} 
            />
          </div>
        </div>
      </Card>
      
      <Card className="p-6 shadow-sm border border-gray-100 bg-white rounded-xl">
        <h3 className="text-lg font-semibold mb-6 text-gray-800">Head to Head Matches</h3>
        
        {h2hMatches.length > 0 ? (
          h2hMatches.map((match, index) => (
            <MatchResultCard 
              key={index} 
              match={match} 
              team1Id={team1.id} 
              team2Id={team2.id} 
            />
          ))
        ) : (
          <div className="py-8 text-center text-gray-500">
            No head-to-head matches found between these teams.
          </div>
        )}
      </Card>
    </div>
  );
});

HeadToHeadComparison.displayName = "HeadToHeadComparison";

export default HeadToHeadComparison;

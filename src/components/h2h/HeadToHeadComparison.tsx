
import { memo } from "react";
import { Card } from "@/components/ui/card";
import { Team } from "@/data/teamsData";
import { Match, TeamForm } from "@/types";
import TeamDisplay from "./TeamDisplay";
import StatComparison from "./StatComparison";
import MatchResultCard from "./MatchResultCard";
import { useHeadToHeadStats } from "@/hooks/useHeadToHeadStats";

interface HeadToHeadComparisonProps {
  team1?: Team;
  team2?: Team;
  matches: Match[];
  standings: TeamForm[];
  isLoading?: boolean;
}

const HeadToHeadComparison = memo(({ team1, team2, matches, standings, isLoading = false }: HeadToHeadComparisonProps) => {
  const { h2hMatches, team1Stats, team2Stats, h2hStats } = useHeadToHeadStats(team1, team2, matches, standings);
  
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

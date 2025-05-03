
import { memo, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Match } from "@/types";
import MatchScore from "@/components/matches-table/MatchScore";
import { format } from "date-fns";
import { getHungarianTeamName } from "@/data/teamsData";

interface TeamMatchesProps {
  matches: Match[];
  teamId: string;
  isLoading: boolean;
}

const TeamMatches = memo(({ matches, teamId, isLoading }: TeamMatchesProps) => {
  const teamMatches = useMemo(() => {
    return matches
      .filter(match => 
        (match.homeTeamId && match.homeTeamId.toLowerCase() === teamId.toLowerCase()) || 
        (match.awayTeamId && match.awayTeamId.toLowerCase() === teamId.toLowerCase())
      )
      .sort((a, b) => {
        try {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          
          if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
            return 0;
          }
          
          return dateB.getTime() - dateA.getTime();
        } catch (error) {
          console.error("Invalid date format:", error);
          return 0;
        }
      });
  }, [matches, teamId]);

  if (teamMatches.length === 0) {
    return (
      <Card className="p-6 shadow-sm border border-gray-100 bg-white rounded-xl h-full">
        <h3 className="text-xl font-bold mb-6 text-gray-800">Match History</h3>
        <div className="text-center py-12 text-gray-500">
          No match data available for this team.
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-sm border border-gray-100 bg-white rounded-xl h-full">
      <h3 className="text-xl font-bold mb-8 text-gray-800">Match History</h3>

      <div className="space-y-4">
        {teamMatches.slice(0, 7).map((match, index) => {
          const isHomeTeam = match.homeTeamId?.toLowerCase() === teamId.toLowerCase();
          const opponentId = isHomeTeam ? match.awayTeamId : match.homeTeamId;
          const opponentName = opponentId ? getHungarianTeamName(opponentId) : 'Unknown';
          const result = 
            match.homeScore === null || match.awayScore === null ? 'Upcoming' :
            isHomeTeam ? 
              (match.homeScore > match.awayScore ? 'W' : match.homeScore < match.awayScore ? 'L' : 'D') :
              (match.awayScore > match.homeScore ? 'W' : match.awayScore < match.homeScore ? 'L' : 'D');
          
          let resultColorClass = 'bg-gray-200 text-gray-800';
          if (result === 'W') resultColorClass = 'bg-green-100 text-green-800';
          else if (result === 'L') resultColorClass = 'bg-red-100 text-red-800';
          else if (result === 'D') resultColorClass = 'bg-amber-100 text-amber-800';
          
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${resultColorClass}`}>
                  <span className="text-xs font-semibold">{result}</span>
                </div>
                <div className="ml-3">
                  <div className="font-medium">vs {opponentName}</div>
                  <div className="text-xs text-gray-500">
                    {match.date ? format(new Date(match.date), 'MMM d, yyyy') : 'TBD'}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  {match.homeScore !== null && match.awayScore !== null ? (
                    <MatchScore 
                      homeScore={match.homeScore} 
                      awayScore={match.awayScore} 
                    />
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
                </div>
                <div className="text-xs text-gray-500">{match.venue || 'Venue TBD'}</div>
              </div>
            </div>
          );
        })}
      </div>
      
      {teamMatches.length > 7 && (
        <div className="mt-6 pt-4 flex justify-center">
          <button className="text-blue-600 text-sm hover:underline">
            View all matches
          </button>
        </div>
      )}
    </Card>
  );
});

TeamMatches.displayName = "TeamMatches";

export default TeamMatches;

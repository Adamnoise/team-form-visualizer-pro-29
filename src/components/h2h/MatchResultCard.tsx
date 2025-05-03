
import { memo } from "react";
import { format } from "date-fns";
import { Match } from "@/types";

interface MatchResultCardProps {
  match: Match;
  team1Id: string;
  team2Id: string;
}

const MatchResultCard = memo(({ match, team1Id, team2Id }: MatchResultCardProps) => {
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
        {match.venue && ` • ${match.venue}`}
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
      
      {match.leagueId && (
        <div className="text-xs text-gray-500 mt-2 text-center">{match.leagueId}</div>
      )}
    </div>
  );
});

MatchResultCard.displayName = "MatchResultCard";

export default MatchResultCard;

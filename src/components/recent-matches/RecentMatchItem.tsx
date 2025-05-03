
import { memo } from "react";
import { Link } from "react-router-dom";
import { Match } from "@/types";
import { getHungarianTeamName } from "@/data/teamsData";
import { formatShortDate } from "@/utils/dateUtils";
import MatchScore from "../matches-table/MatchScore";

interface RecentMatchItemProps {
  match: Match;
}

const RecentMatchItem = memo(({ match }: RecentMatchItemProps) => {
  const formattedDate = formatShortDate(match.date);
  
  // Mindig magyar csapatneveket használunk, még akkor is, ha az adatforrás angol neveket használ
  const homeTeamName = getHungarianTeamName(match.homeTeamId);
  const awayTeamName = getHungarianTeamName(match.awayTeamId);
  
  return (
    <div className="bg-black/30 rounded-lg p-3 border border-white/5">
      <div className="text-xs text-gray-400 mb-2">
        {formattedDate}
        {match.round && ` · Forduló ${match.round}`}
      </div>
      
      <div className="flex justify-between items-center">
        <Link 
          to={`/teams/${match.homeTeamId.toLowerCase()}`}
          className="flex-1 text-right hover:text-blue-400 transition-colors"
        >
          <div className="font-medium text-white">{homeTeamName}</div>
          <div className="text-xs text-gray-400">Hazai</div>
        </Link>
        
        <div className="mx-4 text-center">
          <div className="font-bold text-2xl text-white">
            <MatchScore 
              homeScore={match.homeScore} 
              awayScore={match.awayScore} 
            />
          </div>
          <div className="text-xs text-gray-400 mt-1">
            HT: {match.htHomeScore || 0} - {match.htAwayScore || 0}
          </div>
        </div>
        
        <Link 
          to={`/teams/${match.awayTeamId.toLowerCase()}`}
          className="flex-1 hover:text-blue-400 transition-colors"
        >
          <div className="font-medium text-white">{awayTeamName}</div>
          <div className="text-xs text-gray-400">Vendég</div>
        </Link>
      </div>
    </div>
  );
});

RecentMatchItem.displayName = "RecentMatchItem";

export default RecentMatchItem;

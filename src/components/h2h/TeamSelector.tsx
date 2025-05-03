
import { memo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Team, TEAMS } from "@/data/teamsData";
import { SearchIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TeamSelectorProps {
  selectedTeam?: Team;
  onSelectTeam: (team: Team) => void;
  excludeTeamId?: string;
  isLoading?: boolean;
}

const TeamSelector = memo(({ selectedTeam, onSelectTeam, excludeTeamId, isLoading = false }: TeamSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const availableTeams = TEAMS
    .filter(team => team.id !== excludeTeamId)
    .filter(team => 
      searchQuery === "" || 
      team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  if (isLoading) {
    return (
      <Card className="p-4 shadow-sm border border-gray-100 bg-white rounded-xl">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded-lg mb-4"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="p-4 shadow-sm border border-gray-100 bg-white rounded-xl">
      <div className="relative mb-4">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search teams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-50 text-gray-800 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5
                    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                    transition-all duration-200 placeholder:text-gray-400"
          aria-label="Search teams"
        />
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
        {availableTeams.map(team => (
          <div
            key={team.id}
            onClick={() => onSelectTeam(team)}
            className={`
              cursor-pointer p-3 rounded-lg border transition-all duration-200
              flex flex-col items-center justify-center gap-2
              hover:shadow-md 
              ${selectedTeam?.id === team.id 
                ? "border-blue-500 bg-blue-50 shadow-sm" 
                : "border-gray-100 bg-white hover:border-gray-200"}
            `}
          >
            <Avatar className="w-12 h-12">
              {team.logoUrl ? (
                <AvatarImage src={team.logoUrl} alt={`${team.name} logo`} />
              ) : (
                <AvatarFallback className="bg-blue-50 text-blue-700">
                  {team.name.charAt(0)}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="text-sm font-medium text-center line-clamp-2 h-10 flex items-center">
              {team.name}
            </div>
          </div>
        ))}
        
        {availableTeams.length === 0 && (
          <div className="col-span-full py-8 text-center text-gray-500">
            No teams found matching your search.
          </div>
        )}
      </div>
    </Card>
  );
});

TeamSelector.displayName = "TeamSelector";

export default TeamSelector;

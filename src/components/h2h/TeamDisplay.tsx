
import { memo } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Team } from "@/data/teamsData";
import { TeamForm } from "@/types";

interface TeamDisplayProps {
  team?: Team;
  stats?: TeamForm;
}

const TeamDisplay = memo(({ team, stats }: TeamDisplayProps) => {
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

export default TeamDisplay;

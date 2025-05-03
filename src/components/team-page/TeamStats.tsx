
import { memo, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TeamForm } from "@/types";

interface TeamStatsProps {
  stats?: TeamForm;
  isLoading: boolean;
}

const StatItem = memo(({ label, value, percentage = 0 }: { label: string; value: string | number; percentage?: number }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <div className="text-sm text-gray-500">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
      <Progress 
        value={percentage} 
        className="h-1.5 bg-gray-100" 
        indicatorClassName={percentage > 60 ? "bg-blue-500" : percentage > 40 ? "bg-amber-500" : "bg-red-500"} 
      />
    </div>
  );
});

StatItem.displayName = "StatItem";

const TeamStats = memo(({ stats }: TeamStatsProps) => {
  const performanceData = useMemo(() => {
    if (!stats) {
      return {
        winRate: 0,
        goalScoringRate: 0,
        defensiveRating: 0, 
        formPercentage: 0
      };
    }
    
    const formArray = Array.isArray(stats.form) 
      ? stats.form 
      : (typeof stats.form === "string" && stats.form ? stats.form.split("") : []);
    
    const winCount = formArray.filter(result => result === "W").length;
    const drawCount = formArray.filter(result => result === "D").length;
    
    // Calculate percentages for visual indicators
    const winRate = stats.played > 0 ? Math.round((winCount / stats.played) * 100) : 0;
    
    // Goal scoring rate (arbitrary calculation for visualization)
    const avgGoalsPerGame = stats.played > 0 ? stats.goalsFor / stats.played : 0;
    const goalScoringRate = Math.min(Math.round(avgGoalsPerGame * 33), 100); // Scale it for better visualization
    
    // Defensive rating (lower goals against is better)
    const avgGoalsAgainstPerGame = stats.played > 0 ? stats.goalsAgainst / stats.played : 0;
    const defensiveRating = Math.max(100 - Math.round(avgGoalsAgainstPerGame * 33), 0); // Invert for visualization
    
    // Form percentage (recent form percentage)
    const recentForm = formArray.slice(-5);
    const recentWins = recentForm.filter(result => result === "W").length;
    const recentDraws = recentForm.filter(result => result === "D").length;
    const formPercentage = recentForm.length > 0 ? 
      Math.round(((recentWins + (recentDraws * 0.5)) / recentForm.length) * 100) : 0;
    
    return {
      winRate,
      goalScoringRate,
      defensiveRating,
      formPercentage
    };
  }, [stats]);
  
  if (!stats) {
    return (
      <Card className="p-6 shadow-sm border border-gray-100 bg-white rounded-xl h-full">
        <h3 className="text-xl font-bold mb-6 text-gray-800">Season Statistics</h3>
        <div className="text-center py-12 text-gray-500">
          No statistics available for this team.
        </div>
      </Card>
    );
  }

  const formArray = Array.isArray(stats.form) 
    ? stats.form 
    : (typeof stats.form === "string" && stats.form ? stats.form.split("") : []);
  
  const winCount = formArray.filter(result => result === "W").length;
  const drawCount = formArray.filter(result => result === "D").length;
  const lossCount = formArray.filter(result => result === "L").length;
  
  const winRate = stats.played > 0 ? Math.round((winCount / stats.played) * 100) : 0;
  const goalDiff = stats.goalsFor - stats.goalsAgainst;

  return (
    <Card className="p-6 shadow-sm border border-gray-100 bg-white rounded-xl h-full">
      <h3 className="text-xl font-bold mb-8 text-gray-800">Performance Metrics</h3>

      <StatItem 
        label="Win Rate" 
        value={`${winRate}%`}
        percentage={performanceData.winRate} 
      />
      
      <StatItem 
        label="Goal Scoring" 
        value={`${stats.goalsFor} goals`} 
        percentage={performanceData.goalScoringRate}
      />
      
      <StatItem 
        label="Defense" 
        value={`${stats.goalsAgainst} conceded`} 
        percentage={performanceData.defensiveRating}
      />
      
      <StatItem 
        label="Recent Form" 
        value={formArray.slice(-5).join(' ')}
        percentage={performanceData.formPercentage} 
      />

      <div className="mt-10 grid grid-cols-3 gap-2 text-center">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{winCount}</div>
          <div className="text-xs text-gray-500 mt-1">Wins</div>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-amber-600">{drawCount}</div>
          <div className="text-xs text-gray-500 mt-1">Draws</div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{lossCount}</div>
          <div className="text-xs text-gray-500 mt-1">Losses</div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Goal Difference</span>
          <span className={`font-semibold ${goalDiff > 0 ? 'text-green-600' : goalDiff < 0 ? 'text-red-600' : 'text-gray-600'}`}>
            {goalDiff > 0 ? `+${goalDiff}` : goalDiff}
          </span>
        </div>
      </div>
    </Card>
  );
});

TeamStats.displayName = "TeamStats";

export default TeamStats;

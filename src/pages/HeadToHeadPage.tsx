
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import TeamSelector from "@/components/h2h/TeamSelector";
import HeadToHeadComparison from "@/components/h2h/HeadToHeadComparison";
import { TEAMS } from "@/data/teamsData"; 
import { mockMatches } from "@/data/mockData";
import { calculateTeamForms } from "@/utils/calculations";

export default function HeadToHeadPage() {
  const [searchParams] = useSearchParams();
  const initialTeamId = searchParams.get('team');
  
  const [team1, setTeam1] = useState<typeof TEAMS[0] | undefined>(
    initialTeamId ? TEAMS.find(t => t.id.toLowerCase() === initialTeamId.toLowerCase()) : undefined
  );
  const [team2, setTeam2] = useState<typeof TEAMS[0] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  
  const matches = mockMatches;
  // Use calculateTeamForms directly instead of converting from standings
  const teamForms = calculateTeamForms(matches);

  // Add loading state when teams are selected
  useEffect(() => {
    if (team1 || team2) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 600);
      return () => clearTimeout(timer);
    }
  }, [team1, team2]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      <Header currentSeason="2023-2024" />
      
      <main className="container mx-auto p-4 md:p-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Head to Head Comparison</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select two teams to compare their statistics and view all their head-to-head match results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Team 1</h2>
              <TeamSelector 
                selectedTeam={team1} 
                onSelectTeam={setTeam1}
                excludeTeamId={team2?.id}
                isLoading={isLoading}
              />
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Team 2</h2>
              <TeamSelector 
                selectedTeam={team2} 
                onSelectTeam={setTeam2}
                excludeTeamId={team1?.id}
                isLoading={isLoading}
              />
            </div>
          </div>
          
          <HeadToHeadComparison 
            team1={team1} 
            team2={team2} 
            matches={matches}
            standings={teamForms}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
}

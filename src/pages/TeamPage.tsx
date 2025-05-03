
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import TeamStats from "@/components/team-page/TeamStats";
import TeamMatches from "@/components/team-page/TeamMatches";
import { TEAMS } from "@/data/teamsData";
import { mockMatches } from "@/data/mockData";
import { calculateTeamForms } from "@/utils/calculations";

export default function TeamPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  
  // Use safe teamId and null check
  const safeTeamId = teamId?.toLowerCase() || '';
  const team = TEAMS.find(t => t.id.toLowerCase() === safeTeamId);
  const matches = mockMatches;
  const teamForms = calculateTeamForms(matches);
  
  const teamStats = teamForms.find(
    stats => stats.team.toLowerCase() === safeTeamId
  );

  // Simulate loading effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [teamId]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
        <Header currentSeason="2023-2024" />
        <main className="container mx-auto p-4 md:p-8 flex items-center justify-center min-h-[80vh]">
          <div className="animate-pulse space-y-8 w-full max-w-3xl">
            <div className="h-20 bg-gray-200 rounded-xl"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80 bg-gray-200 rounded-xl"></div>
              <div className="h-80 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Handle team not found
  if (!team) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
        <Header currentSeason="2023-2024" />
        <main className="container mx-auto p-4 md:p-8 flex flex-col items-center justify-center min-h-[80vh]">
          <h1 className="text-3xl font-bold mb-4">Team not found</h1>
          <Button asChild variant="outline">
            <Link to="/leagues">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Leagues
            </Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      <Header currentSeason="2023-2024" />
      
      <main className="container mx-auto p-4 md:p-8">
        {/* Hero Section */}
        <div className="mb-12">
          <Link 
            to="/leagues" 
            className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1 mb-4"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to Leagues
          </Link>
          
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-6 mb-8 md:mb-0">
              <Avatar className="h-24 w-24 border-2 border-gray-200 shadow-lg">
                {team.logoUrl ? (
                  <AvatarImage src={team.logoUrl} alt={team.name} />
                ) : (
                  <AvatarFallback className="bg-blue-50 text-blue-700 text-2xl">
                    {team.name.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
              
              <div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{team.league}</div>
                <h1 className="text-5xl font-bold text-gray-900 mb-2">{team.name}</h1>
                <div className="flex items-center gap-4">
                  <Button 
                    size="sm" 
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    asChild
                  >
                    <Link to={`/h2h?team=${team.id}`}>Compare H2H</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-8 mt-6 md:mt-0">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800">
                  {teamStats?.position || "-"}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Position</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800">
                  {teamStats?.points || "0"}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Points</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800">
                  {teamStats?.goalsFor || "0"}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Goals</div>
              </div>
            </div>
          </div>
          
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-8"></div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stats */}
          <div className="order-2 lg:order-1">
            <TeamStats stats={teamStats} isLoading={false} />
          </div>
          
          {/* Matches */}
          <div className="order-1 lg:order-2">
            <TeamMatches matches={matches} teamId={safeTeamId} isLoading={false} />
          </div>
        </div>
      </main>
    </div>
  );
}


import { useState } from "react";
import { Header } from "@/components/Header";
import { FormTable } from "@/components/FormTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Trophy, 
  CircleCheckBig, 
  Award, 
  ChartNoAxesColumnIncreasing, 
  Zap 
} from "lucide-react";
import TopPerformersCard from "@/components/TopPerformersCard";
import { mockTeamForms, mockMatches } from "@/data/mockData";
import { Match } from "@/types";
import RecentMatches from "@/components/RecentMatches";

const Index = () => {
  const [teamForms] = useState(mockTeamForms);
  const [matches] = useState<Match[]>(mockMatches);
  
  // Calculate totals with null checks
  const totalGoals = matches.reduce((sum, match) => {
    const homeScore = match.homeScore || 0;
    const awayScore = match.awayScore || 0;
    return sum + homeScore + awayScore;
  }, 0);
  
  const averageGoalsPerMatch = matches.length > 0 
    ? (totalGoals / matches.length).toFixed(2) 
    : '0.00';
  
  return (
    <div className="min-h-screen bg-[#101820] text-white">
      <Header currentSeason="2023-2024" />
      
      <main className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="bg-black/20 border-white/5 lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-white">Liga Áttekintés</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="relative rounded-xl bg-gradient-to-br p-4 border backdrop-blur-sm animate-scale-in from-blue-600/20 to-blue-700/10 border-blue-500/20 animate-delay-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-white/70">Csapatok</span>
                    <CircleCheckBig className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{teamForms.length}</div>
                </div>
                
                <div className="relative rounded-xl bg-gradient-to-br p-4 border backdrop-blur-sm animate-scale-in from-green-600/20 to-green-700/10 border-green-500/20 animate-delay-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-white/70">Lejátszott meccsek</span>
                    <Award className="h-4 w-4 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{matches.length}</div>
                </div>
                
                <div className="relative rounded-xl bg-gradient-to-br p-4 border backdrop-blur-sm animate-scale-in from-purple-600/20 to-purple-700/10 border-purple-500/20 animate-delay-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-white/70">Szerzett gólok</span>
                    <ChartNoAxesColumnIncreasing className="h-4 w-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{totalGoals}</div>
                </div>
                
                <div className="relative rounded-xl bg-gradient-to-br p-4 border backdrop-blur-sm animate-scale-in from-amber-600/20 to-amber-700/10 border-amber-500/20 animate-delay-400">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-white/70">Átlag gól/meccs</span>
                    <Zap className="h-4 w-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{averageGoalsPerMatch}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <TopPerformersCard teams={teamForms} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <FormTable teamForms={teamForms} />
          </div>
          
          <div>
            <RecentMatches matches={matches} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

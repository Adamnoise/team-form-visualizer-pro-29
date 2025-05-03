
import React from 'react';
import { Match, Team } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { getHungarianTeamName } from '@/data/teamsData';

interface RecentMatchesSectionProps {
  matches: Match[];
  teams: Team[];
}

const RecentMatchesSection: React.FC<RecentMatchesSectionProps> = ({ matches, teams }) => {
  const sortedMatches = [...matches].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 4);

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Recent Matches</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {sortedMatches.map((match, index) => {
          const homeTeam = teams.find((t) => t.id === match.homeTeamId);
          const awayTeam = teams.find((t) => t.id === match.awayTeamId);
          return (
            <Card key={match.id || index} className="bg-black/30 border-white/5">
              <CardContent className="p-4">
                <div className="text-sm text-gray-400 mb-2">
                  {new Date(match.date).toLocaleDateString()}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white">
                    {homeTeam ? getHungarianTeamName(homeTeam.id) : 'Unknown'}
                  </div>
                  <div className="text-lg font-semibold mx-2">
                    {match.homeScore} - {match.awayScore}
                  </div>
                  <div className="text-sm text-white">
                    {awayTeam ? getHungarianTeamName(awayTeam.id) : 'Unknown'}
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Stadium: {match.venue || homeTeam?.stadium || 'N/A'}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RecentMatchesSection;

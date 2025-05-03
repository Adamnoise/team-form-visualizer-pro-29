
import React from 'react';
import { Match, Team } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { getHungarianTeamName } from '@/data/teamsData';

interface RecentMatchesTabProps {
  teams: Team[];
  matches: Match[];
  selectedLeague: string;
}

const RecentMatchesTab: React.FC<RecentMatchesTabProps> = ({ teams, matches, selectedLeague }) => {
  const filteredMatches = matches.filter((match) => match.leagueId === selectedLeague);

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Recent Matches</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMatches
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 10)
          .map((match, index) => {
            const homeTeam = teams.find((t) => t.id === match.homeTeamId);
            const awayTeam = teams.find((t) => t.id === match.awayTeamId);
            return (
              <Card key={match.id || index} className="bg-black/30 border-white/5">
                <CardContent className="p-4">
                  <div className="text-sm text-gray-400 mb-2">
                    {new Date(match.date).toLocaleDateString()} • {match.venue || 'Unknown Venue'}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 text-right text-sm text-white">
                      {homeTeam ? getHungarianTeamName(homeTeam.id) : 'Unknown Team'}
                    </div>
                    <div className="mx-4 text-lg font-semibold">
                      {match.homeScore} - {match.awayScore}
                    </div>
                    <div className="flex-1 text-sm text-white">
                      {awayTeam ? getHungarianTeamName(awayTeam.id) : 'Unknown Team'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default RecentMatchesTab;

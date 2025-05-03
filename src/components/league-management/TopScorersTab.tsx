
import React from 'react';
import { Team, Player } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getHungarianTeamName } from '@/data/teamsData';

interface TopScorersTabProps {
  players: Player[];
  teams: Team[];
  selectedLeague: string;
}

const TopScorersTab: React.FC<TopScorersTabProps> = ({ players, teams, selectedLeague }) => {
  const topScorers = players
    .filter(player => {
      const playerTeam = teams.find(team => team.id === player.teamId);
      return playerTeam && playerTeam.category === selectedLeague;
    })
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 10);

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Top Scorers</h2>
      <div className="overflow-x-auto rounded-lg bg-black/20 border border-white/5">
        <Table>
          <TableHeader className="bg-black/40">
            <TableRow className="border-b border-white/5">
              <TableHead>Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="text-right">Goals</TableHead>
              <TableHead className="text-right">Assists</TableHead>
              <TableHead className="text-right">Matches</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topScorers.map((player, index) => {
              const playerTeam = teams.find((team) => team.id === player.teamId);
              return (
                <TableRow key={player.id} className="border-b border-white/5">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{player.name}</TableCell>
                  <TableCell>{playerTeam ? getHungarianTeamName(playerTeam.id) : 'Unknown Team'}</TableCell>
                  <TableCell className="text-right">{player.goals}</TableCell>
                  <TableCell className="text-right">{player.assists || 0}</TableCell>
                  <TableCell className="text-right">{player.appearances || 0}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <h3 className="text-lg font-medium mt-8 mb-4">Goal Distribution</h3>
      <Card className="bg-black/30 border-white/5">
        <CardHeader>
          <CardTitle>Top 5 Goalscorers</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <div className="flex h-full items-end justify-between gap-2">
            {topScorers.slice(0, 5).map((player) => (
              <div key={player.id} className="flex flex-col items-center">
                <div className="flex gap-1">
                  <div 
                    className="w-12 bg-purple-500/70 hover:bg-purple-500 transition-colors rounded-t-sm"
                    style={{ height: `${(player.goals / 40) * 80}%` }}
                  >
                  </div>
                  <div 
                    className="w-6 bg-green-500/70 hover:bg-green-500 transition-colors rounded-t-sm"
                    style={{ height: `${((player.assists || 0) / 40) * 80}%` }}
                  >
                  </div>
                </div>
                <div className="mt-2 text-xs text-center text-gray-400 max-w-20 truncate">
                  {player.name}
                </div>
                <div className="text-sm font-medium text-white">
                  {player.goals}G / {player.assists || 0}A
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TopScorersTab;

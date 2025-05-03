
import React from 'react';
import { Team, Match } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getHungarianTeamName } from '@/data/teamsData';

interface TeamPerformanceTabProps {
  teams: Team[];
  matches: Match[];
  selectedLeague: string;
}

const TeamPerformanceTab: React.FC<TeamPerformanceTabProps> = ({ teams, matches, selectedLeague }) => {
  const filteredTeams = teams.filter((team) => team.category === selectedLeague);
  const filteredMatches = matches.filter((match) => match.leagueId === selectedLeague);
  
  const teamStandings = filteredTeams.map((team) => {
    const teamMatches = filteredMatches.filter(
      (match) => match.homeTeamId === team.id || match.awayTeamId === team.id
    );
    
    const wins = teamMatches.filter(
      (match) =>
        (match.homeTeamId === team.id && match.homeScore > match.awayScore) ||
        (match.awayTeamId === team.id && match.awayScore > match.homeScore)
    ).length;
    
    const draws = teamMatches.filter(
      (match) => match.homeScore === match.awayScore
    ).length;
    
    const losses = teamMatches.length - wins - draws;
    
    const goalsFor = teamMatches.reduce((total, match) => {
      if (match.homeTeamId === team.id) {
        return total + match.homeScore;
      } else {
        return total + match.awayScore;
      }
    }, 0);
    
    const goalsAgainst = teamMatches.reduce((total, match) => {
      if (match.homeTeamId === team.id) {
        return total + match.awayScore;
      } else {
        return total + match.homeScore;
      }
    }, 0);

    return {
      id: team.id,
      name: getHungarianTeamName(team.id),
      played: teamMatches.length,
      wins,
      draws,
      losses,
      goalsFor,
      goalsAgainst,
      goalDifference: goalsFor - goalsAgainst,
      points: wins * 3 + draws,
    };
  }).sort((a, b) => b.points - a.points);

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Team Performance</h2>
      
      <div className="mb-8">
        <Card className="bg-black/30 border-white/5">
          <CardHeader>
            <CardTitle>Team Performance Chart</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <div className="flex h-full items-end justify-between gap-2">
              {teamStandings.slice(0, 8).map((team, index) => (
                <div key={team.id} className="flex flex-col items-center">
                  <div 
                    className="w-12 bg-blue-500/70 hover:bg-blue-500 transition-colors rounded-t-sm"
                    style={{ height: `${(team.points / 100) * 80}%` }}
                  >
                  </div>
                  <div className="mt-2 text-xs text-center text-gray-400 max-w-16 truncate">
                    {team.name}
                  </div>
                  <div className="text-sm font-medium text-white">
                    {team.points}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <h3 className="text-lg font-medium mb-4">Top Teams Comparison</h3>
      <div className="overflow-x-auto rounded-lg bg-black/20 border border-white/5">
        <Table>
          <TableHeader className="bg-black/40">
            <TableRow className="border-b border-white/5">
              <TableHead>Team</TableHead>
              <TableHead className="text-right">Possession (%)</TableHead>
              <TableHead className="text-right">Pass Accuracy (%)</TableHead>
              <TableHead className="text-right">Shots on Target</TableHead>
              <TableHead className="text-right">Clean Sheets</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamStandings.slice(0, 5).map((team) => (
              <TableRow key={team.id} className="border-b border-white/5">
                <TableCell className="font-medium">{team.name}</TableCell>
                <TableCell className="text-right">{Math.round(45 + Math.random() * 20)}</TableCell>
                <TableCell className="text-right">{Math.round(70 + Math.random() * 20)}</TableCell>
                <TableCell className="text-right">{Math.round(team.goalsFor * 2.5)}</TableCell>
                <TableCell className="text-right">
                  {filteredMatches.filter(match => 
                    (match.homeTeamId === team.id && match.awayScore === 0) || 
                    (match.awayTeamId === team.id && match.homeScore === 0)
                  ).length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TeamPerformanceTab;

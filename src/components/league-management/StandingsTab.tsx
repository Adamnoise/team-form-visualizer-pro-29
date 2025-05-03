
import React from 'react';
import { Team, Match } from '@/types';
import { getHungarianTeamName } from '@/data/teamsData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface StandingsTabProps {
  teams: Team[];
  matches: Match[];
  selectedLeague: string;
}

const StandingsTab: React.FC<StandingsTabProps> = ({ teams, matches, selectedLeague }) => {
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
  }).sort((a, b) => {
    // Sort by points (highest first)
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    // Then by goal difference
    if (b.goalDifference !== a.goalDifference) {
      return b.goalDifference - a.goalDifference;
    }
    // Then by goals scored
    return b.goalsFor - a.goalsFor;
  });

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">League Table</h2>
      <div className="overflow-x-auto rounded-lg bg-black/20 border border-white/5">
        <Table>
          <TableHeader className="bg-black/40">
            <TableRow className="border-b border-white/5">
              <TableHead>Pos</TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="text-right">P</TableHead>
              <TableHead className="text-right">W</TableHead>
              <TableHead className="text-right">D</TableHead>
              <TableHead className="text-right">L</TableHead>
              <TableHead className="text-right">GF</TableHead>
              <TableHead className="text-right">GA</TableHead>
              <TableHead className="text-right">GD</TableHead>
              <TableHead className="text-right">Pts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamStandings.map((team, index) => (
              <TableRow
                key={team.id}
                className={`border-b border-white/5 ${
                  index < 4 
                    ? "bg-emerald-900/10" 
                    : index >= teamStandings.length - 3 
                    ? "bg-red-900/10"
                    : ""
                }`}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{team.name}</TableCell>
                <TableCell className="text-right">{team.played}</TableCell>
                <TableCell className="text-right">{team.wins}</TableCell>
                <TableCell className="text-right">{team.draws}</TableCell>
                <TableCell className="text-right">{team.losses}</TableCell>
                <TableCell className="text-right">{team.goalsFor}</TableCell>
                <TableCell className="text-right">{team.goalsAgainst}</TableCell>
                <TableCell className="text-right">{team.goalDifference}</TableCell>
                <TableCell className="text-right font-bold">{team.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default StandingsTab;

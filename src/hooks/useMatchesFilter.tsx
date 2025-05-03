
import { useMemo } from "react"
import type { Match } from "@/types"

interface UseMatchesFilterProps {
  matches: Match[]
  filters: {
    team: string
    round: string
    result: string
  }
}

export function useMatchesFilter({ matches, filters }: UseMatchesFilterProps) {
  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      // Check if we have a team filter and if either home or away team includes the filter
      const teamMatch = filters.team
        ? (match.homeTeamId && match.homeTeamId.toLowerCase().includes(filters.team.toLowerCase())) ||
          (match.awayTeamId && match.awayTeamId.toLowerCase().includes(filters.team.toLowerCase()))
        : true

      const roundMatch = filters.round && match.round ? match.round === filters.round : true

      let resultMatch = true
      if (filters.result === "home") {
        resultMatch = match.homeScore > match.awayScore
      } else if (filters.result === "away") {
        resultMatch = match.homeScore < match.awayScore
      } else if (filters.result === "draw") {
        resultMatch = match.homeScore === match.awayScore
      }

      return teamMatch && roundMatch && resultMatch
    })
  }, [matches, filters])

  return filteredMatches
}

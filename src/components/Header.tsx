
"use client"

import { memo } from "react"
import { BarChart3, ChevronDown, Settings, Bell, Users, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import Logo from "./Logo"

interface HeaderProps {
  currentSeason?: string
  className?: string
}

const SeasonIndicator = memo(({ season }: { season: string }) => (
  <div className="flex items-center gap-3">
    <Button
      variant="outline"
      className="bg-white/5 border-white/10 text-white hover:bg-white/10 flex items-center gap-2"
    >
      <BarChart3 size={16} className="text-blue-500" aria-hidden="true" />
      <span className="font-medium">Season {season}</span>
      <ChevronDown size={14} className="text-gray-400" aria-hidden="true" />
    </Button>
  </div>
))

SeasonIndicator.displayName = "SeasonIndicator"

const NavigationLink = memo(({ to, children, icon: Icon }: { to: string; children: React.ReactNode; icon: React.ComponentType<any> }) => (
  <Link to={to}>
    <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 flex items-center gap-2">
      <Icon className="h-4 w-4 text-blue-500" />
      {children}
    </Button>
  </Link>
))

NavigationLink.displayName = "NavigationLink"

export const Header = memo(({ currentSeason = "2023-2024", className = "" }: HeaderProps) => {
  return (
    <header
      className={`
        bg-[#0a0f14]/90 backdrop-blur-md border-b border-white/5 
        text-white shadow-lg sticky top-0 z-50 
        transition-all duration-300 ease-in-out
        ${className}
      `}
    >
      <nav className="container mx-auto px-4 md:px-6 py-4" role="navigation" aria-label="Main navigation">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo />
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <NavigationLink to="/leagues" icon={Trophy}>
              League Management
            </NavigationLink>
            <NavigationLink to="/statistics" icon={BarChart2}>
              Statistics
            </NavigationLink>
            <NavigationLink to="/h2h" icon={Users}>
              Head to Head
            </NavigationLink>
            <SeasonIndicator season={currentSeason} />
            <Button variant="outline" size="icon" className="w-9 h-9 bg-white/5 border-white/10 hover:bg-white/10">
              <Bell className="h-4 w-4 text-gray-300" />
            </Button>
            <Button variant="outline" size="icon" className="w-9 h-9 bg-white/5 border-white/10 hover:bg-white/10">
              <Settings className="h-4 w-4 text-gray-300" />
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
})

Header.displayName = "Header"

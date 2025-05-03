
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LeagueManagement from "./pages/LeagueManagement";
import TeamPage from "./pages/TeamPage";
import StatisticsPage from "./pages/StatisticsPage";
import HeadToHeadPage from "./pages/HeadToHeadPage";
import NotFound from "./pages/NotFound";
import MatchesPage from "./pages/MatchesPage";
import AnalysisPage from "./pages/AnalysisPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/leagues" element={<LeagueManagement />} />
          <Route path="/teams/:teamId" element={<TeamPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/h2h" element={<HeadToHeadPage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

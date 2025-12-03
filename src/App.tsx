import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";

// Onboarding pages
import Welcome from "./pages/onboarding/Welcome";
import OnboardingObjectifs from "./pages/onboarding/Objectifs";
import Temps from "./pages/onboarding/Temps";
import Notifications from "./pages/onboarding/Notifications";

// Mobile pages
import Accueil from "./pages/mobile/Accueil";
import Communaute from "./pages/mobile/Communaute";
import Objectifs from "./pages/mobile/Objectifs";

// Existing pages
import MentalWellness from "./pages/MentalWellness";
import PhysicalWellness from "./pages/PhysicalWellness";
import Alimentation from "./pages/Alimentation";
import ActivitePhysique from "./pages/ActivitePhysique";
import Recipes from "./pages/Recipes";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Auth */}
              <Route path="/auth" element={<Auth />} />
              
              {/* Onboarding */}
              <Route path="/onboarding/welcome" element={<Welcome />} />
              <Route path="/onboarding/objectifs" element={<OnboardingObjectifs />} />
              <Route path="/onboarding/temps" element={<Temps />} />
              <Route path="/onboarding/notifications" element={<Notifications />} />
              
              {/* Mobile App - Bottom Tab Navigation */}
              <Route 
                path="/accueil" 
                element={
                  <ProtectedRoute>
                    <Accueil />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/mental" 
                element={
                  <ProtectedRoute>
                    <MentalWellness />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/physique" 
                element={
                  <ProtectedRoute>
                    <PhysicalWellness />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/alimentation" 
                element={
                  <ProtectedRoute>
                    <Alimentation />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/activite-physique" 
                element={
                  <ProtectedRoute>
                    <ActivitePhysique />
                  </ProtectedRoute>
                } 
              />
              <Route
                path="/communaute" 
                element={
                  <ProtectedRoute>
                    <Communaute />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/objectifs" 
                element={
                  <ProtectedRoute>
                    <Objectifs />
                  </ProtectedRoute>
                } 
              />
              
              {/* Ancienne route suivi redirigée vers objectifs */}
              <Route path="/suivi" element={<Navigate to="/objectifs" replace />} />
              
              {/* Other pages */}
              <Route 
                path="/recipes" 
                element={
                  <ProtectedRoute>
                    <Recipes />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profil" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              
              {/* Redirects */}
              <Route path="/" element={<Navigate to="/accueil" replace />} />
              <Route path="/physical" element={<Navigate to="/physique" replace />} />
              
              {/* Catch all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

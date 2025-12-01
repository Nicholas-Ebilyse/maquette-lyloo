import MobileHeader from '@/components/mobile/MobileHeader';
import BottomTabBar from '@/components/mobile/BottomTabBar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Activity, Target, Sparkles, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getOracleQuoteOfTheDay } from '@/data/oracleQuotes';
import { useAuth } from '@/hooks/useAuth';

const Accueil = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const oracleQuote = getOracleQuoteOfTheDay();

  return (
    <div className="min-h-screen bg-background pb-20">
      <MobileHeader 
        title={
          <>
            L'équilibre commence<br />
            <span className="font-kaushan text-2xl">en douceur</span>
          </>
        }
      />

      <main className="px-4 py-6 space-y-6">
        {/* Pensée positive du jour */}
        <div className="fade-in-up">
          <h2 className="text-xl font-bold text-[hsl(var(--anthracite))] mb-4">
            Pensée positive du jour
          </h2>
        </div>

        {/* Citation du jour */}
        <Card className="p-8 rounded-[32px] bg-[hsl(var(--vert-eau))]/30 border-none shadow-sm fade-in-up">
          <p className="text-lg italic text-[hsl(var(--anthracite))] leading-relaxed mb-4">
            "{oracleQuote.texte}"
          </p>
          <p className="text-sm font-bold text-[hsl(var(--anthracite))] text-right">
            — <span className="font-kaushan text-base">{oracleQuote.auteur}</span>
          </p>
        </Card>

        {/* Actions rapides suggérées */}
        <div className="space-y-4 fade-in-up-delay-1">
          <h2 className="text-xl font-bold text-[hsl(var(--anthracite))]">
            Actions rapides
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            {/* Vignette Mental */}
            <Card 
              className="card-mental p-6 cursor-pointer touch-target"
              onClick={() => navigate('/mental')}
            >
              <div className="flex items-center gap-4 mb-4">
                <Brain className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-bold">Méditation atmosphère</h3>
                  <p className="text-sm opacity-90">10 min</p>
                </div>
              </div>
              <p className="text-sm opacity-90">
                Retrouve ton calme intérieur avec cette méditation guidée
              </p>
            </Card>

            {/* Vignette Physique */}
            <Card 
              className="card-physical p-6 cursor-pointer touch-target"
              onClick={() => navigate('/physique')}
            >
              <div className="flex items-center gap-4 mb-4">
                <Activity className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-bold">Étirements doux</h3>
                  <p className="text-sm opacity-90">10 min</p>
                </div>
              </div>
              <p className="text-sm opacity-90">
                Réveille ton corps en douceur avec des étirements simples
              </p>
            </Card>
          </div>
        </div>

        {/* Suggestions de parcours */}
        <div className="space-y-3 fade-in-up-delay-2">
          <h2 className="text-xl font-bold text-[hsl(var(--anthracite))]">
            Explore ton bien-être
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => navigate('/mental')}
              className="h-24 btn-pill bg-[hsl(var(--vert-eau))] hover:bg-[hsl(var(--vert-eau))]/90 text-[hsl(var(--anthracite))] font-bold flex-col gap-2"
            >
              <Brain className="h-6 w-6" />
              <span className="text-sm">Mental</span>
            </Button>

            <Button
              onClick={() => navigate('/physique')}
              className="h-24 btn-pill bg-[hsl(var(--vert-pale))] hover:bg-[hsl(var(--vert-pale))]/90 text-[hsl(var(--anthracite))] font-bold flex-col gap-2"
            >
              <Activity className="h-6 w-6" />
              <span className="text-sm">Physique</span>
            </Button>

            <Button
              onClick={() => navigate('/communaute')}
              className="h-24 btn-pill bg-[hsl(var(--dore))] hover:bg-[hsl(var(--dore))]/90 text-[hsl(var(--anthracite))] font-bold flex-col gap-2"
            >
              <Users className="h-6 w-6" />
              <span className="text-sm">Communauté</span>
            </Button>

            <Button
              onClick={() => navigate('/objectifs')}
              className="h-24 btn-pill bg-[hsl(var(--terracotta))] hover:bg-[hsl(var(--terracotta))]/90 text-white font-bold flex-col gap-2"
            >
              <Target className="h-6 w-6" />
              <span className="text-sm">Objectifs</span>
            </Button>
          </div>
        </div>
      </main>

      <BottomTabBar />
    </div>
  );
};

export default Accueil;

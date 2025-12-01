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
            L'équilibre commence <span className="font-outfit font-semibold">en douceur</span>
          </>
        }
        subtitle="Bonjour, prenons soin de nous aujourd'hui"
      />

      <main className="px-4 py-6 space-y-6">
        {/* Message de bienvenue personnalisé */}
        <div className="fade-in-up">
          <h2 className="text-2xl font-bold text-[hsl(var(--anthracite))] mb-2">
            Bonjour {profile?.first_name || 'toi'} ✨
          </h2>
          <p className="text-[hsl(var(--anthracite))]/70">
            Prends un instant pour toi aujourd'hui
          </p>
        </div>

        {/* Oracle du jour (phrase fixe selon le jour de la semaine) */}
        <Card className="p-6 rounded-[var(--radius)] bg-gradient-to-br from-[hsl(var(--terracotta))]/10 to-[hsl(var(--vert-eau))]/10 border-2 border-[hsl(var(--terracotta))]/20 fade-in-up">
          <div className="flex items-start gap-3 mb-3">
            <Sparkles className="h-6 w-6 text-[hsl(var(--terracotta))] flex-shrink-0 mt-1" />
            <div>
              <p className="text-base font-bold text-[hsl(var(--marron-chaud))] mb-2">
                Oracle du jour
              </p>
              <p className="text-lg italic text-[hsl(var(--anthracite))] leading-relaxed">
                "{oracleQuote.texte}"
              </p>
            </div>
          </div>
          <p className="text-sm font-bold text-[hsl(var(--anthracite))] text-right">
            — {oracleQuote.auteur}
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

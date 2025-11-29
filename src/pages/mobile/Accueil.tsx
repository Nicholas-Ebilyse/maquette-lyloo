import MobileHeader from '@/components/mobile/MobileHeader';
import BottomTabBar from '@/components/mobile/BottomTabBar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Activity, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Accueil = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <MobileHeader 
        title="L'équilibre commence en douceur" 
        subtitle="Bonjour, prenons soin de nous aujourd'hui"
      />

      <main className="px-4 py-6 space-y-6">
        {/* Citation du jour */}
        <Card className="p-6 rounded-[var(--radius)] bg-[hsl(var(--beige))] border-2 border-[hsl(var(--marron-chaud))]/20 fade-in-up">
          <p className="text-lg italic text-[hsl(var(--marron-chaud))] mb-3">
            "La paix vient de l'intérieur. Ne la cherchez pas à l'extérieur."
          </p>
          <p className="text-sm font-bold text-[hsl(var(--anthracite))]">
            — Bouddha
          </p>
        </Card>

        {/* Sélection du jour */}
        <div className="space-y-4 fade-in-up-delay-1">
          <h2 className="text-xl font-bold text-[hsl(var(--anthracite))]">
            La sélection du jour
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

        {/* Raccourcis */}
        <div className="space-y-3 fade-in-up-delay-2">
          <h2 className="text-xl font-bold text-[hsl(var(--anthracite))]">
            Raccourcis
          </h2>
          
          <Button
            onClick={() => navigate('/mental')}
            className="w-full btn-pill bg-[hsl(var(--vert-eau))] hover:bg-[hsl(var(--vert-eau))]/90 text-[hsl(var(--anthracite))] font-bold justify-start gap-3"
            size="lg"
          >
            <Brain className="h-5 w-5" />
            Choisir une activité mentale
          </Button>

          <Button
            onClick={() => navigate('/physique')}
            className="w-full btn-pill bg-[hsl(var(--vert-pale))] hover:bg-[hsl(var(--vert-pale))]/90 text-[hsl(var(--anthracite))] font-bold justify-start gap-3"
            size="lg"
          >
            <Activity className="h-5 w-5" />
            Choisir une activité physique
          </Button>

          <Button
            onClick={() => navigate('/suivi')}
            className="w-full btn-pill bg-[hsl(var(--terracotta))] hover:bg-[hsl(var(--terracotta))]/90 text-white font-bold justify-start gap-3"
            size="lg"
          >
            <TrendingUp className="h-5 w-5" />
            Voir mes progrès
          </Button>
        </div>
      </main>

      <BottomTabBar />
    </div>
  );
};

export default Accueil;

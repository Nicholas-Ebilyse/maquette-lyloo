import MobileHeader from '@/components/mobile/MobileHeader';
import BottomTabBar from '@/components/mobile/BottomTabBar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, Plus, CheckCircle2, Circle, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';

interface Objectif {
  id: string;
  titre: string;
  description: string;
  progression: number;
  petitsPas: { id: string; texte: string; fait: boolean }[];
}

const Objectifs = () => {
  const [objectifs, setObjectifs] = useState<Objectif[]>([
    {
      id: '1',
      titre: 'Mieux gérer mon stress',
      description: 'Pratiquer des techniques de relaxation quotidiennement',
      progression: 40,
      petitsPas: [
        { id: '1-1', texte: '3 respirations profondes le matin', fait: true },
        { id: '1-2', texte: '5 min de méditation', fait: true },
        { id: '1-3', texte: 'Pause respiration à midi', fait: false },
        { id: '1-4', texte: 'Relaxation avant de dormir', fait: false },
      ]
    },
    {
      id: '2',
      titre: 'Bouger plus au quotidien',
      description: 'Intégrer du mouvement doux chaque jour',
      progression: 60,
      petitsPas: [
        { id: '2-1', texte: '10 min d\'étirements matinaux', fait: true },
        { id: '2-2', texte: 'Marche de 15 minutes', fait: true },
        { id: '2-3', texte: 'Séance de yoga courte', fait: true },
        { id: '2-4', texte: 'Stretching avant de dormir', fait: false },
      ]
    },
  ]);

  const togglePetitPas = (objectifId: string, pasId: string) => {
    setObjectifs(prev => prev.map(obj => {
      if (obj.id === objectifId) {
        const newPetitsPas = obj.petitsPas.map(pas =>
          pas.id === pasId ? { ...pas, fait: !pas.fait } : pas
        );
        const nbFaits = newPetitsPas.filter(p => p.fait).length;
        const progression = Math.round((nbFaits / newPetitsPas.length) * 100);
        return { ...obj, petitsPas: newPetitsPas, progression };
      }
      return obj;
    }));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <MobileHeader 
        title="Mes Objectifs" 
        subtitle="Petits pas, grandes victoires"
      />

      <main className="px-4 py-6 space-y-6">
        {/* Statistiques de la semaine */}
        <Card className="p-5 rounded-[var(--radius)] bg-gradient-to-br from-[hsl(var(--vert-eau))]/10 to-[hsl(var(--vert-pale))]/10 border-2 border-[hsl(var(--vert-eau))]/20 fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-6 w-6 text-[hsl(var(--vert-eau))]" />
            <div>
              <p className="text-sm text-[hsl(var(--anthracite))]/70">Cette semaine</p>
              <p className="text-2xl font-bold text-[hsl(var(--anthracite))]">12 petits pas</p>
            </div>
          </div>
          <Progress value={65} className="h-3" />
          <p className="text-sm text-[hsl(var(--anthracite))]/70 mt-2">
            65% de tes objectifs accomplis
          </p>
        </Card>

        {/* Message d'encouragement */}
        <Card className="p-5 rounded-[var(--radius)] bg-[hsl(var(--terracotta))]/10 border-2 border-[hsl(var(--terracotta))]/20 fade-in-up-delay-1">
          <p className="text-base text-[hsl(var(--anthracite))] italic">
            "Chaque petit pas compte. Tu progresses à ton rythme, et c'est parfait ainsi."
          </p>
        </Card>

        {/* Liste des objectifs */}
        <div className="space-y-4 fade-in-up-delay-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[hsl(var(--anthracite))]">
              Mes objectifs
            </h2>
            <Button
              size="sm"
              className="btn-pill bg-[hsl(var(--vert-eau))] hover:bg-[hsl(var(--vert-eau))]/90 text-[hsl(var(--anthracite))] font-bold"
            >
              <Plus className="h-4 w-4 mr-1" />
              Ajouter
            </Button>
          </div>

          {objectifs.map((objectif) => (
            <Card 
              key={objectif.id}
              className="p-5 rounded-[var(--radius)] bg-[hsl(var(--beige))] border-2 border-[hsl(var(--vert-eau))]/20"
            >
              <div className="flex items-start gap-3 mb-4">
                <Target className="h-6 w-6 text-[hsl(var(--vert-eau))] flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-bold text-[hsl(var(--anthracite))] mb-1">
                    {objectif.titre}
                  </h3>
                  <p className="text-sm text-[hsl(var(--anthracite))]/70 mb-3">
                    {objectif.description}
                  </p>
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[hsl(var(--anthracite))]/70">Progression</span>
                      <span className="font-bold text-[hsl(var(--vert-eau))]">
                        {objectif.progression}%
                      </span>
                    </div>
                    <Progress value={objectif.progression} className="h-2" />
                  </div>
                </div>
              </div>

              {/* Petits pas */}
              <div className="space-y-2 ml-9">
                <p className="text-sm font-bold text-[hsl(var(--anthracite))] mb-2">
                  Mes petits pas :
                </p>
                {objectif.petitsPas.map((pas) => (
                  <button
                    key={pas.id}
                    onClick={() => togglePetitPas(objectif.id, pas.id)}
                    className="flex items-center gap-3 w-full text-left touch-target transition-all duration-300 hover:bg-[hsl(var(--vert-eau))]/5 rounded-lg p-2"
                  >
                    {pas.fait ? (
                      <CheckCircle2 className="h-5 w-5 text-[hsl(var(--vert-eau))] flex-shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-[hsl(var(--anthracite))]/30 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${
                      pas.fait 
                        ? 'text-[hsl(var(--anthracite))]/50 line-through' 
                        : 'text-[hsl(var(--anthracite))]'
                    }`}>
                      {pas.texte}
                    </span>
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Conseil du jour */}
        <Card className="p-5 rounded-[var(--radius)] bg-[hsl(var(--dore))]/10 border-2 border-[hsl(var(--dore))]/30">
          <p className="text-sm font-bold text-[hsl(var(--anthracite))] mb-2">
            💡 Conseil LYLOO
          </p>
          <p className="text-sm text-[hsl(var(--anthracite))]">
            Concentre-toi sur un seul petit pas aujourd'hui. La régularité est plus importante que la quantité.
          </p>
        </Card>
      </main>

      <BottomTabBar />
    </div>
  );
};

export default Objectifs;

import MobileHeader from '@/components/mobile/MobileHeader';
import BottomTabBar from '@/components/mobile/BottomTabBar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Heart, Brain, Activity, Calendar } from 'lucide-react';

const Suivi = () => {
  const moods = [
    { emoji: '😢', label: 'Triste', value: 1 },
    { emoji: '😕', label: 'Moyen', value: 2 },
    { emoji: '😐', label: 'Neutre', value: 3 },
    { emoji: '🙂', label: 'Bien', value: 4 },
    { emoji: '😊', label: 'Super', value: 5 },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <MobileHeader title="Suivi" subtitle="Observe tes progrès" />

      <main className="px-4 py-6 space-y-6">
        {/* Mon rythme */}
        <div className="space-y-4 fade-in-up">
          <h2 className="text-xl font-bold text-[hsl(var(--anthracite))] flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-[hsl(var(--vert-eau))]" />
            Mon rythme
          </h2>

          <Card className="p-5 rounded-[var(--radius)] bg-[hsl(var(--beige))] border-2 border-[hsl(var(--vert-eau))]/20">
            <p className="text-sm text-[hsl(var(--anthracite))]/70 mb-4">
              Derniers 7 jours
            </p>
            <div className="flex items-end justify-between h-32 gap-2">
              {[3, 5, 2, 6, 4, 7, 5].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 bg-[hsl(var(--vert-eau))] rounded-t-lg transition-all duration-300 hover:bg-[hsl(var(--vert-eau))]/80"
                  style={{ height: `${(height / 7) * 100}%` }}
                ></div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-[hsl(var(--anthracite))]/60">
              <span>Lun</span>
              <span>Mar</span>
              <span>Mer</span>
              <span>Jeu</span>
              <span>Ven</span>
              <span>Sam</span>
              <span>Dim</span>
            </div>
          </Card>
        </div>

        {/* Mon équilibre */}
        <div className="space-y-4 fade-in-up-delay-1">
          <h2 className="text-xl font-bold text-[hsl(var(--anthracite))] flex items-center gap-2">
            <Calendar className="h-6 w-6 text-[hsl(var(--vert-pale))]" />
            Mon équilibre
          </h2>

          <Card className="p-5 rounded-[var(--radius)] bg-[hsl(var(--beige))] border-2 border-[hsl(var(--vert-pale))]/20">
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="hsl(var(--vert-eau))"
                    strokeWidth="20"
                    strokeDasharray="219.91 219.91"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="hsl(var(--vert-pale))"
                    strokeWidth="20"
                    strokeDasharray="131.95 87.96"
                    strokeDashoffset="-219.91"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-3xl font-bold text-[hsl(var(--anthracite))]">60/40</p>
                  <p className="text-xs text-[hsl(var(--anthracite))]/70">%</p>
                </div>
              </div>
            </div>
            <div className="flex justify-around">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-[hsl(var(--vert-eau))]" />
                <span className="text-sm font-bold text-[hsl(var(--anthracite))]">Mental 60%</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-[hsl(var(--vert-pale))]" />
                <span className="text-sm font-bold text-[hsl(var(--anthracite))]">Physique 40%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Mon ressenti */}
        <div className="space-y-4 fade-in-up-delay-2">
          <h2 className="text-xl font-bold text-[hsl(var(--anthracite))] flex items-center gap-2">
            <Heart className="h-6 w-6 text-[hsl(var(--terracotta))]" />
            Comment te sens-tu aujourd'hui ?
          </h2>

          <Card className="p-5 rounded-[var(--radius)] bg-[hsl(var(--beige))] border-2 border-[hsl(var(--terracotta))]/20">
            <div className="flex justify-between gap-2 mb-4">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  className="touch-target flex flex-col items-center gap-1 transition-all duration-300 hover:scale-110"
                >
                  <span className="text-3xl">{mood.emoji}</span>
                  <span className="text-xs text-[hsl(var(--anthracite))]/70">{mood.label}</span>
                </button>
              ))}
            </div>
            <textarea
              className="w-full p-3 rounded-xl bg-[hsl(var(--beige))] border-2 border-[hsl(var(--vert-eau))]/20 text-[hsl(var(--anthracite))] placeholder:text-[hsl(var(--anthracite))]/50 focus:outline-none focus:border-[hsl(var(--vert-eau))]"
              placeholder="Note ton ressenti du jour..."
              rows={3}
            />
            <Button className="w-full mt-3 btn-pill bg-[hsl(var(--terracotta))] hover:bg-[hsl(var(--terracotta))]/90 text-white font-bold">
              Enregistrer
            </Button>
          </Card>
        </div>

        {/* Dernières séances */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[hsl(var(--anthracite))]">
            Dernières séances
          </h2>

          <Card className="p-4 rounded-[var(--radius)] bg-[hsl(var(--beige))] border-2 border-[hsl(var(--vert-eau))]/20">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-[hsl(var(--vert-eau))]" />
              <div className="flex-1">
                <p className="font-bold text-[hsl(var(--anthracite))]">Méditation atmosphère</p>
                <p className="text-sm text-[hsl(var(--anthracite))]/70">Il y a 2 heures · 10 min</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[hsl(var(--vert-eau))]/20 text-xs font-bold text-[hsl(var(--vert-eau))]">
                Terminée
              </span>
            </div>
          </Card>

          <Card className="p-4 rounded-[var(--radius)] bg-[hsl(var(--beige))] border-2 border-[hsl(var(--vert-pale))]/20">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-[hsl(var(--vert-pale))]" />
              <div className="flex-1">
                <p className="font-bold text-[hsl(var(--anthracite))]">Étirements doux</p>
                <p className="text-sm text-[hsl(var(--anthracite))]/70">Hier · 10 min</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[hsl(var(--vert-pale))]/20 text-xs font-bold text-[hsl(var(--vert-pale))]">
                Terminée
              </span>
            </div>
          </Card>
        </div>
      </main>

      <BottomTabBar />
    </div>
  );
};

export default Suivi;

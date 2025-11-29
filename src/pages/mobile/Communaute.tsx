import MobileHeader from '@/components/mobile/MobileHeader';
import BottomTabBar from '@/components/mobile/BottomTabBar';
import { Card } from '@/components/ui/card';
import { Users, Heart, Target } from 'lucide-react';

const Communaute = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <MobileHeader title="Communauté" subtitle="Ensemble, prenons soin de nous" />

      <main className="px-4 py-6 space-y-6">
        {/* Messages de la communauté */}
        <div className="space-y-4 fade-in-up">
          <h2 className="text-xl font-bold text-[hsl(var(--anthracite))] flex items-center gap-2">
            <Users className="h-6 w-6 text-[hsl(var(--vert-eau))]" />
            Messages de la communauté
          </h2>

          <Card className="p-5 rounded-[var(--radius)] bg-[hsl(var(--beige))] border-2 border-[hsl(var(--vert-eau))]/20">
            <div className="flex items-start gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-[hsl(var(--vert-eau))] flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-[hsl(var(--anthracite))]">Marie</p>
                <p className="text-sm text-[hsl(var(--anthracite))]/70">Il y a 2 heures</p>
              </div>
            </div>
            <p className="text-[hsl(var(--anthracite))]">
              J'ai commencé la méditation il y a 2 semaines et je me sens déjà tellement mieux ! 
              Merci LYLOO pour cet accompagnement en douceur ✨
            </p>
            <div className="mt-3 flex items-center gap-2">
              <button className="flex items-center gap-1 text-[hsl(var(--terracotta))]">
                <Heart className="h-4 w-4" />
                <span className="text-sm font-bold">12</span>
              </button>
            </div>
          </Card>

          <Card className="p-5 rounded-[var(--radius)] bg-[hsl(var(--beige))] border-2 border-[hsl(var(--vert-pale))]/20">
            <div className="flex items-start gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-[hsl(var(--vert-pale))] flex items-center justify-center">
                <Users className="h-5 w-5 text-[hsl(var(--anthracite))]" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-[hsl(var(--anthracite))]">Thomas</p>
                <p className="text-sm text-[hsl(var(--anthracite))]/70">Il y a 5 heures</p>
              </div>
            </div>
            <p className="text-[hsl(var(--anthracite))]">
              Les exercices de yoga sont parfaits pour commencer la journée ! 
              Je me sens plus énergique et détendu 🧘‍♂️
            </p>
            <div className="mt-3 flex items-center gap-2">
              <button className="flex items-center gap-1 text-[hsl(var(--terracotta))]">
                <Heart className="h-4 w-4" />
                <span className="text-sm font-bold">8</span>
              </button>
            </div>
          </Card>
        </div>

        {/* Conseils LYLOO */}
        <div className="space-y-4 fade-in-up-delay-1">
          <h2 className="text-xl font-bold text-[hsl(var(--anthracite))] flex items-center gap-2">
            <Heart className="h-6 w-6 text-[hsl(var(--terracotta))]" />
            Conseils de l'équipe LYLOO
          </h2>

          <Card className="p-5 rounded-[var(--radius)] bg-[hsl(var(--terracotta))]/10 border-2 border-[hsl(var(--terracotta))]/30">
            <p className="font-bold text-[hsl(var(--anthracite))] mb-2">
              💡 Astuce du jour
            </p>
            <p className="text-[hsl(var(--anthracite))]">
              Prends 3 respirations profondes avant chaque repas. Cela aide à 
              mieux digérer et à être plus conscient de ce que tu manges.
            </p>
          </Card>
        </div>

        {/* Challenges doux */}
        <div className="space-y-4 fade-in-up-delay-2">
          <h2 className="text-xl font-bold text-[hsl(var(--anthracite))] flex items-center gap-2">
            <Target className="h-6 w-6 text-[hsl(var(--dore))]" />
            Challenges doux
          </h2>

          <Card className="p-5 rounded-[var(--radius)] bg-[hsl(var(--vert-eau))]/10 border-2 border-[hsl(var(--vert-eau))]/30">
            <p className="font-bold text-[hsl(var(--anthracite))] mb-2">
              🎯 Challenge de la semaine
            </p>
            <p className="text-[hsl(var(--anthracite))] mb-3">
              3 respirations profondes chaque jour
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-[hsl(var(--vert-eau))]/20 rounded-full overflow-hidden">
                <div className="h-full bg-[hsl(var(--vert-eau))] rounded-full" style={{ width: '60%' }}></div>
              </div>
              <span className="text-sm font-bold text-[hsl(var(--vert-eau))]">3/5 jours</span>
            </div>
          </Card>

          <Card className="p-5 rounded-[var(--radius)] bg-[hsl(var(--vert-pale))]/10 border-2 border-[hsl(var(--vert-pale))]/30">
            <p className="font-bold text-[hsl(var(--anthracite))] mb-2">
              🎯 Challenge du mois
            </p>
            <p className="text-[hsl(var(--anthracite))] mb-3">
              5 minutes de marche consciente par jour
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-[hsl(var(--vert-pale))]/20 rounded-full overflow-hidden">
                <div className="h-full bg-[hsl(var(--vert-pale))] rounded-full" style={{ width: '40%' }}></div>
              </div>
              <span className="text-sm font-bold text-[hsl(var(--vert-pale))]">12/30 jours</span>
            </div>
          </Card>
        </div>
      </main>

      <BottomTabBar />
    </div>
  );
};

export default Communaute;

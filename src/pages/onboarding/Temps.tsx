import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Preferences } from '@capacitor/preferences';

const tempsOptions = [5, 10, 15, 20, 30];

const Temps = () => {
  const navigate = useNavigate();
  const [selectedTemps, setSelectedTemps] = useState<number | null>(null);

  const handleContinue = async () => {
    if (selectedTemps) {
      await Preferences.set({
        key: 'userTempsParJour',
        value: selectedTemps.toString(),
      });
      navigate('/onboarding/notifications');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-12">
      <div className="flex-1 space-y-8 max-w-md mx-auto w-full fade-in-up">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-[hsl(var(--anthracite))]">
            Combien de temps souhaites-tu consacrer à LYLOO chaque jour ?
          </h1>
        </div>

        <div className="space-y-3">
          {tempsOptions.map((temps) => {
            const isSelected = selectedTemps === temps;
            return (
              <button
                key={temps}
                onClick={() => setSelectedTemps(temps)}
                className={`category-pill w-full text-center px-6 py-6 transition-all duration-300 ${
                  isSelected
                    ? 'bg-[hsl(var(--vert-pale))] text-[hsl(var(--anthracite))] active'
                    : 'bg-[hsl(var(--beige))] border-2 border-[hsl(var(--vert-pale))]/30 text-[hsl(var(--anthracite))]'
                }`}
              >
                <span className="text-3xl font-bold">{temps}</span>
                <span className="text-lg ml-2">minutes</span>
              </button>
            );
          })}
        </div>
      </div>

      <Button
        onClick={handleContinue}
        disabled={!selectedTemps}
        className="btn-pill bg-[hsl(var(--vert-pale))] hover:bg-[hsl(var(--vert-pale))]/90 text-[hsl(var(--anthracite))] font-bold text-lg w-full max-w-md mx-auto"
        size="lg"
      >
        Continuer
      </Button>
    </div>
  );
};

export default Temps;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Preferences } from '@capacitor/preferences';

const objectifsList = [
  'Mieux gérer mon stress',
  'Améliorer mon sommeil',
  'Bouger plus au quotidien',
  'Mieux manger',
  'Retrouver de l\'énergie',
  'Prendre du temps pour moi',
];

const Objectifs = () => {
  const navigate = useNavigate();
  const [selectedObjectifs, setSelectedObjectifs] = useState<string[]>([]);

  const toggleObjectif = (objectif: string) => {
    setSelectedObjectifs(prev =>
      prev.includes(objectif)
        ? prev.filter(o => o !== objectif)
        : [...prev, objectif]
    );
  };

  const handleContinue = async () => {
    await Preferences.set({
      key: 'userObjectifs',
      value: JSON.stringify(selectedObjectifs),
    });
    navigate('/onboarding/temps');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-12">
      <div className="flex-1 space-y-8 max-w-md mx-auto w-full fade-in-up">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-[hsl(var(--anthracite))]">
            Quels sont tes objectifs principaux ?
          </h1>
          <p className="text-base text-[hsl(var(--anthracite))]/70">
            Sélectionne tous ceux qui te correspondent
          </p>
        </div>

        <div className="space-y-3">
          {objectifsList.map((objectif) => {
            const isSelected = selectedObjectifs.includes(objectif);
            return (
              <button
                key={objectif}
                onClick={() => toggleObjectif(objectif)}
                className={`category-pill w-full text-left px-6 py-4 transition-all duration-300 ${
                  isSelected
                    ? 'bg-[hsl(var(--vert-eau))] text-[hsl(var(--anthracite))] active'
                    : 'bg-[hsl(var(--beige))] border-2 border-[hsl(var(--vert-eau))]/30 text-[hsl(var(--anthracite))]'
                }`}
              >
                <span className="font-bold">{objectif}</span>
              </button>
            );
          })}
        </div>
      </div>

      <Button
        onClick={handleContinue}
        disabled={selectedObjectifs.length === 0}
        className="btn-pill bg-[hsl(var(--vert-eau))] hover:bg-[hsl(var(--vert-eau))]/90 text-[hsl(var(--anthracite))] font-bold text-lg w-full max-w-md mx-auto"
        size="lg"
      >
        Continuer
      </Button>
    </div>
  );
};

export default Objectifs;

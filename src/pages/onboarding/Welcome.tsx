import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center space-y-8 max-w-md fade-in-up">
        <img 
          src="/src/assets/lyloo-logo-leaf.png" 
          alt="LYLOO" 
          className="h-24 w-24 mx-auto logo float"
        />
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-[hsl(var(--anthracite))]">
            LYLOO
          </h1>
          <h2 className="text-2xl font-bold text-[hsl(var(--anthracite))]">
            L'équilibre commence en douceur
          </h2>
        </div>

        <p className="text-lg text-[hsl(var(--anthracite))]/80 leading-relaxed">
          Bienvenue dans votre espace de bien-être holistique. 
          LYLOO vous accompagne pour trouver l'équilibre entre 
          votre bien-être mental et physique, à votre rythme, 
          avec bienveillance.
        </p>

        <Button
          onClick={() => navigate('/onboarding/objectifs')}
          className="btn-pill bg-[hsl(var(--vert-eau))] hover:bg-[hsl(var(--vert-eau))]/90 text-[hsl(var(--anthracite))] font-bold text-lg w-full max-w-xs mx-auto"
          size="lg"
        >
          Commencer
        </Button>
      </div>
    </div>
  );
};

export default Welcome;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Preferences } from '@capacitor/preferences';
import { Sunrise, Sun, Moon } from 'lucide-react';

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    matin: true,
    midi: true,
    soir: true,
  });

  const handleFinish = async () => {
    await Preferences.set({
      key: 'userNotifications',
      value: JSON.stringify(notifications),
    });
    await Preferences.set({
      key: 'onboardingComplete',
      value: 'true',
    });
    navigate('/accueil');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-12">
      <div className="flex-1 space-y-8 max-w-md mx-auto w-full fade-in-up">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-[hsl(var(--anthracite))]">
            Rappels doux
          </h1>
          <p className="text-base text-[hsl(var(--anthracite))]/70">
            Active les notifications pour ne pas oublier de prendre soin de toi
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[hsl(var(--beige))] border-2 border-[hsl(var(--vert-eau))]/20">
            <div className="flex items-center gap-3">
              <Sunrise className="h-6 w-6 text-[hsl(var(--dore))]" />
              <div>
                <Label htmlFor="matin" className="text-base font-bold">
                  Matin
                </Label>
                <p className="text-sm text-[hsl(var(--anthracite))]/70">
                  Routine d'ancrage
                </p>
              </div>
            </div>
            <Switch
              id="matin"
              checked={notifications.matin}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, matin: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-[hsl(var(--beige))] border-2 border-[hsl(var(--vert-eau))]/20">
            <div className="flex items-center gap-3">
              <Sun className="h-6 w-6 text-[hsl(var(--orange))]" />
              <div>
                <Label htmlFor="midi" className="text-base font-bold">
                  Midi
                </Label>
                <p className="text-sm text-[hsl(var(--anthracite))]/70">
                  Pause respiration
                </p>
              </div>
            </div>
            <Switch
              id="midi"
              checked={notifications.midi}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, midi: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-[hsl(var(--beige))] border-2 border-[hsl(var(--vert-eau))]/20">
            <div className="flex items-center gap-3">
              <Moon className="h-6 w-6 text-[hsl(var(--terracotta))]" />
              <div>
                <Label htmlFor="soir" className="text-base font-bold">
                  Soir
                </Label>
                <p className="text-sm text-[hsl(var(--anthracite))]/70">
                  Relaxation & sommeil
                </p>
              </div>
            </div>
            <Switch
              id="soir"
              checked={notifications.soir}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, soir: checked }))
              }
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[hsl(var(--vert-eau))]/10 border border-[hsl(var(--vert-eau))]/30">
          <p className="text-sm text-[hsl(var(--anthracite))]/80 leading-relaxed">
            En activant les notifications, tu acceptes de recevoir des rappels 
            pour tes séances de bien-être. Tu peux modifier ces paramètres 
            à tout moment dans ton profil.
          </p>
        </div>
      </div>

      <Button
        onClick={handleFinish}
        className="btn-pill bg-[hsl(var(--vert-eau))] hover:bg-[hsl(var(--vert-eau))]/90 text-[hsl(var(--anthracite))] font-bold text-lg w-full max-w-md mx-auto"
        size="lg"
      >
        Terminer
      </Button>
    </div>
  );
};

export default Notifications;

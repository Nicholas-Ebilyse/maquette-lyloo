import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Link } from 'react-router-dom';

interface MobileHeaderProps {
  title: string;
  subtitle?: string;
}

const MobileHeader = ({ title, subtitle }: MobileHeaderProps) => {
  return (
    <header className="header-wave px-4 py-6 pb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img 
            src="/src/assets/lyloo-logo-leaf.png" 
            alt="LYLOO" 
            className="h-10 w-10 logo"
          />
          <span className="text-[hsl(var(--anthracite))] font-bold text-xl">LYLOO</span>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="touch-target text-[hsl(var(--anthracite))]"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-6">
              <Link 
                to="/profil" 
                className="text-lg font-bold text-[hsl(var(--anthracite))] hover:text-[hsl(var(--vert-eau))] transition-colors touch-target"
              >
                Profil & Paramètres
              </Link>
              <Link 
                to="/a-propos" 
                className="text-lg text-[hsl(var(--anthracite))] hover:text-[hsl(var(--vert-eau))] transition-colors touch-target"
              >
                À propos
              </Link>
              <Link 
                to="/mentions-legales" 
                className="text-lg text-[hsl(var(--anthracite))] hover:text-[hsl(var(--vert-eau))] transition-colors touch-target"
              >
                Mentions légales
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--anthracite))] mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base text-[hsl(var(--anthracite))]/80">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
};

export default MobileHeader;

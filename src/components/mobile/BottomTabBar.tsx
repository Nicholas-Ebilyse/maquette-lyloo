import { Link, useLocation } from 'react-router-dom';
import { Brain, Activity, Users, Target } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import pictoAccueil from '@/assets/picto-accueil.png';

const BottomTabBar = () => {
  const location = useLocation();
  const { profile } = useAuth();
  
  // Vérifier si l'utilisateur est admin (vous pouvez adapter cette logique)
  const isAdmin = profile?.email === 'admin@lyloo.com'; // À adapter selon votre logique
  
  const tabs = [
    { path: '/accueil', icon: 'image', label: 'Accueil' },
    { path: '/mental', icon: Brain, label: 'Mental' },
    { path: '/physique', icon: Activity, label: 'Physique' },
    { path: '/communaute', icon: Users, label: 'Communauté' },
    { path: '/objectifs', icon: Target, label: 'Objectifs' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[hsl(var(--anthracite))] border-t border-[hsl(var(--vert-eau))]/20 safe-area-inset-bottom z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map(({ path, icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center flex-1 touch-target transition-all duration-300 ${
                isActive ? 'text-[hsl(var(--beige))]' : 'text-[hsl(var(--beige))]/60'
              }`}
            >
              {icon === 'image' ? (
                <img 
                  src={pictoAccueil} 
                  alt="Accueil" 
                  className={`w-6 h-6 mb-1 ${isActive ? 'scale-110 opacity-100' : 'opacity-60'} transition-all duration-300`}
                  style={{ filter: 'brightness(0) saturate(100%) invert(94%) sepia(13%) saturate(283%) hue-rotate(355deg) brightness(103%) contrast(91%)' }}
                />
              ) : (
                (() => {
                  const Icon = icon as any;
                  return <Icon className={`w-6 h-6 mb-1 ${isActive ? 'scale-110' : ''}`} />;
                })()
              )}
              <span className="text-xs font-bold">{label}</span>
            </Link>
          );
        })}
      </div>
      
      {/* Bouton Admin flottant (visible uniquement pour les admins) */}
      {isAdmin && (
        <Link
          to="/admin"
          className="absolute -top-12 right-4 bg-[hsl(var(--orange))] text-white rounded-full p-3 shadow-lg touch-target"
          title="Administration"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </Link>
      )}
    </nav>
  );
};

export default BottomTabBar;

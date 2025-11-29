import { Link, useLocation } from 'react-router-dom';
import { Home, Brain, Activity, Users, BarChart3 } from 'lucide-react';

const BottomTabBar = () => {
  const location = useLocation();
  
  const tabs = [
    { path: '/accueil', icon: Home, label: 'Accueil' },
    { path: '/mental', icon: Brain, label: 'Mental' },
    { path: '/physique', icon: Activity, label: 'Physique' },
    { path: '/communaute', icon: Users, label: 'Communauté' },
    { path: '/suivi', icon: BarChart3, label: 'Suivi' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[hsl(var(--anthracite))] border-t border-[hsl(var(--vert-eau))]/20 safe-area-inset-bottom z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center flex-1 touch-target transition-all duration-300 ${
                isActive ? 'text-[hsl(var(--beige))]' : 'text-[hsl(var(--beige))]/60'
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-xs font-bold">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabBar;

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "@/components/mobile/BottomTabBar";
import lylooLogo from '@/assets/lyloo-logo-anthracite.png';
import mentalIcon from '@/assets/picto-mental.png';

const YogaDuRire = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f2e6] pb-20">
      <div className="relative">
        <div className="bg-[#a5cdbc] pt-4 pb-24 px-6 relative">
          <div className="absolute top-4 left-6 z-20">
            <img src={lylooLogo} alt="LYLOO" className="h-20" />
          </div>

          <button 
            onClick={() => navigate('/mental')}
            className="absolute top-8 right-6 z-20 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6 text-[#373a37]" />
          </button>

          <div className="flex items-center justify-center mt-24 relative">
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 transform translate-y-24 z-10 flex items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                <img src={mentalIcon} alt="Yoga du rire" className="w-full h-full object-cover" />
              </div>
              
              <div className="flex flex-col items-start">
                <h1 className="text-[#373a37] text-2xl font-atkinson font-bold whitespace-nowrap">
                  Yoga du rire
                </h1>
              </div>
            </div>
          </div>
        </div>
        
        <svg className="absolute bottom-0 left-0 w-full translate-y-[calc(100%-1px)]" viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path d="M0,0 C360,60 1080,60 1440,0 L1440,80 L0,80 Z" fill="#a5cdbc" />
        </svg>
      </div>

      <main className="px-6 pt-20 pb-6">
        <h2 className="text-2xl font-bold text-[#373a37] text-center mb-6">
          Séances de yoga du rire
        </h2>

        <div className="bg-white/50 rounded-2xl p-8 text-center">
          <p className="text-[#373a37] font-atkinson">
            Contenus de yoga du rire arrivent bientôt...
          </p>
        </div>
      </main>
      
      <BottomTabBar />
    </div>
  );
};

export default YogaDuRire;

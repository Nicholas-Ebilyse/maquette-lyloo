import MobileHeader from "@/components/mobile/MobileHeader";
import BottomTabBar from "@/components/mobile/BottomTabBar";
import { Button } from "@/components/ui/button";
import { Utensils, Activity } from "lucide-react";
import lylooLogo from '@/assets/lyloo-logo-anthracite.png';
import pictoPhysique from '@/assets/picto-physique.png';
import yogaSelection from '@/assets/lyloo-yoga-selection.jpg';
import recipeSelection from '@/assets/lyloo-recipe-selection.jpg';

const PhysicalWellness = () => {
  return (
    <div className="min-h-screen bg-[#f5f2e6] pb-20">
      {/* Custom Header with Wave Banner */}
      <div className="relative">
        {/* Wave Banner - Vert pâle */}
        <div className="bg-[#cce1b0] pt-6 pb-16 px-6 rounded-b-[40px] relative">
          {/* Logo LYLOO */}
          <div className="flex justify-center mb-4 relative z-20">
            <img 
              src={lylooLogo} 
              alt="LYLOO" 
              className="h-8 object-contain"
            />
          </div>

          {/* Title Section */}
          <div className="relative z-10 flex items-start justify-center gap-4">
            {/* Physical Icon - overlapping banner and content */}
            <div className="absolute left-6 top-0 translate-y-12 z-20">
              <img 
                src={pictoPhysique}
                alt="Physique"
                className="w-28 h-28 object-contain"
              />
            </div>
            
            {/* Title */}
            <div className="text-center flex flex-col items-center">
              <h1 className="text-2xl font-bold text-[#373a37] whitespace-nowrap">
                Bien-être
              </h1>
              <h2 className="text-3xl text-[#373a37] font-['Kaushan_Script'] -ml-3">
                Physique
              </h2>
            </div>
          </div>
        </div>

        {/* La sélection du jour - Beige background */}
        <div className="bg-[#f5f2e6] px-6 pt-16 pb-6">
          <h2 className="text-2xl font-bold text-[#373a37] text-center mb-6">
            La sélection du jour
          </h2>

          {/* Two selection images */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Yoga - Yellow button */}
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={yogaSelection}
                alt="Yoga"
                className="w-full h-48 object-cover"
              />
              <Button 
                className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-[#f5e380] text-[#373a37] font-bold rounded-full px-6 hover:bg-[#f5e380]/90"
              >
                Yoga
              </Button>
            </div>

            {/* Recette - Orange button */}
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={recipeSelection}
                alt="Recette"
                className="w-full h-48 object-cover"
              />
              <Button 
                className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-[#e94a38] text-[#f5f2e6] font-bold rounded-full px-6 hover:bg-[#e94a38]/90"
              >
                Recette
              </Button>
            </div>
          </div>

          {/* Choisis ta catégorie button */}
          <div className="flex justify-center mb-6">
            <Button className="bg-[#cce1b0] text-[#373a37] font-bold px-8 py-6 text-lg rounded-full hover:bg-[#cce1b0]/90">
              Choisis ta catégorie
            </Button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Alimentation - Orange */}
            <div className="bg-[#e94a38] rounded-2xl p-6 h-40 flex flex-col items-center justify-center relative overflow-hidden">
              <Utensils className="absolute text-[#373a37]/10 w-24 h-24" />
              <span className="text-[#f5f2e6] font-bold text-xl text-center relative z-10">
                Alimentation
              </span>
            </div>

            {/* Activité Physique - Yellow */}
            <div className="bg-[#f5e380] rounded-2xl p-6 h-40 flex flex-col items-center justify-center relative overflow-hidden">
              <Activity className="absolute text-[#373a37]/10 w-24 h-24" />
              <span className="text-[#373a37] font-bold text-xl text-center relative z-10 leading-tight">
                Activité<br/>Physique
              </span>
            </div>
          </div>

          {/* Mes repas button */}
          <div className="flex justify-center">
            <Button className="bg-[#cce1b0] text-[#373a37] font-bold px-8 py-6 text-lg rounded-full hover:bg-[#cce1b0]/90">
              Mes repas
            </Button>
          </div>
        </div>
      </div>
      
      <BottomTabBar />
    </div>
  );
};

export default PhysicalWellness;

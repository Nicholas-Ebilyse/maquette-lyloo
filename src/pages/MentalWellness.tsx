import { useState } from "react";
import BottomTabBar from "@/components/mobile/BottomTabBar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Brain } from "lucide-react";
import mentalIcon from "@/assets/picto-mental.png";
import lylooLogo from "@/assets/lyloo-logo-anthracite.png";
import meditationSelection from "@/assets/meditation-selection.jpg";
import sleepSelection from "@/assets/sleep-selection.jpg";

const categories = [
  { name: "Méditation", color: "beige" },
  { name: "Respiration", color: "terracotta" },
  { name: "Hypnose", color: "marron" },
  { name: "Sommeil", color: "beige" },
  { name: "Sophrologie", color: "terracotta" },
  { name: "Yoga du rire", color: "marron" },
  { name: "Psycho-corporel", color: "beige" },
  { name: "Sophrologie", color: "terracotta" },
];

const MentalWellness = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getBackgroundColor = (color: string) => {
    switch (color) {
      case "beige":
        return "bg-[#a5cdbc]";
      case "terracotta":
        return "bg-[#ec9b7b]";
      case "marron":
        return "bg-[#615245]";
      default:
        return "bg-[#a5cdbc]";
    }
  };

  const getTextColor = (color: string) => {
    return color === "marron" ? "text-[#f5f2e6]" : "text-[hsl(var(--anthracite))]";
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--beige))] pb-20">
      {/* Custom Header with vert d'eau background */}
      <div className="bg-[#a5cdbc] pt-4 pb-24 px-6 rounded-b-[40px] relative">
        {/* Logo in top left */}
        <div className="absolute top-4 left-6 z-20">
          <img 
            src={lylooLogo} 
            alt="LYLOO" 
            className="h-20"
          />
        </div>

        {/* Mental Icon and Title */}
        <div className="flex items-center justify-center mt-16 relative">
          {/* Mental Icon - positioned to overlap header and content */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 transform translate-y-16 z-10 flex items-center gap-6">
            <div className="w-28 h-28 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src={mentalIcon} 
                alt="Mental" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Title next to icon */}
            <div className="flex flex-col items-start">
              <h1 className="text-[hsl(var(--anthracite))] text-2xl font-atkinson font-bold whitespace-nowrap">
                Bien-être
              </h1>
              <h2 className="text-[hsl(var(--anthracite))] text-3xl font-kaushan -ml-1">
                Mental
              </h2>
            </div>
          </div>
        </div>
      </div>

      <main className="px-6 pt-24 pb-6">
        {/* La sélection du jour */}
        <div className="bg-[#f5f2e6] rounded-3xl p-6 mb-8">
          <h2 className="text-[hsl(var(--anthracite))] text-2xl font-atkinson font-bold text-center mb-6">
            La sélection du jour
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Méditation */}
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src={meditationSelection} 
                alt="Méditation" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-center">
                <button className="bg-[#ec9b7b] text-[hsl(var(--anthracite))] font-atkinson font-bold px-6 py-2 rounded-full">
                  Méditation
                </button>
              </div>
            </div>

            {/* Sommeil */}
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src={sleepSelection} 
                alt="Sommeil" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-center">
                <button className="bg-[#615245] text-[#f5f2e6] font-atkinson font-bold px-6 py-2 rounded-full">
                  Sommeil
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {categories.map((category, index) => (
              <CarouselItem key={index} className="pl-4 basis-4/5">
                <div
                  className={`${getBackgroundColor(category.color)} rounded-3xl p-8 h-48 relative overflow-hidden cursor-pointer transition-transform hover:scale-105`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {/* Icon en filigrane */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
                    <img 
                      src={mentalIcon} 
                      alt="" 
                      className="w-32 h-32"
                    />
                  </div>
                  
                  {/* Category name */}
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <h3 className={`${getTextColor(category.color)} text-2xl font-atkinson font-bold text-center`}>
                      {category.name}
                    </h3>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation avec flèches en marron chaud */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <CarouselPrevious className="static transform-none bg-[#615245] text-white hover:bg-[#615245]/80 border-none" />
            <div className="flex gap-2">
              {categories.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-[#615245]/30"
                />
              ))}
            </div>
            <CarouselNext className="static transform-none bg-[#615245] text-white hover:bg-[#615245]/80 border-none" />
          </div>
        </Carousel>
      </main>

      <BottomTabBar />
    </div>
  );
};

export default MentalWellness;
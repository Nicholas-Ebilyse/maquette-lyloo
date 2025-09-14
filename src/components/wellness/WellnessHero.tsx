import { ReactNode } from "react";

interface WellnessHeroProps {
  title: string;
  description: string;
  children?: ReactNode;
  backgroundImage?: string;
  gradientColors?: string;
}

const WellnessHero = ({ 
  title, 
  description, 
  children, 
  backgroundImage = "/src/assets/lyloo-wellness-space.jpg",
  gradientColors = "from-vert-eau/20 via-terracotta-lyloo/10 to-marron-chaud/5"
}: WellnessHeroProps) => {
  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${gradientColors} py-16`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="/src/assets/lyloo-natural-decor.jpg" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative container mx-auto px-4">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-mental">
            {title}
          </h1>
          <p className="text-marron-chaud/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
          
          {children && (
            <div className="mt-8">
              {children}
            </div>
          )}
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 opacity-20 hidden lg:block">
          <img 
            src="/src/assets/lyloo-green-leaves.jpg" 
            alt="" 
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
        
        <div className="absolute bottom-10 left-10 opacity-20 hidden lg:block">
          <img 
            src="/src/assets/lyloo-dreamcatcher.jpg" 
            alt="" 
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default WellnessHero;
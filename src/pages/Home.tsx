import Navigation from "@/components/layout/Navigation";
import WellnessDashboard from "@/components/dashboard/WellnessDashboard";
import DailyQuote from "@/components/motivation/DailyQuote";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-lyloo via-background to-vert-pale/10">
      <Navigation />
      
      {/* Hero Section with Brand Image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-vert-eau/20 to-terracotta-lyloo/10"></div>
        <div className="relative container mx-auto px-4 py-12 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gradient-mental mb-4">
            Bienvenue chez Lyloo
          </h1>
          <p className="text-marron-chaud/80 text-xl max-w-2xl mx-auto mb-8">
            Votre compagnon de bien-être holistique pour cultiver votre sérénité intérieure
          </p>
          <div className="max-w-md mx-auto rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="/src/assets/lyloo-meditation-stones.jpg" 
              alt="Méditation et sérénité - pierres zen" 
              className="w-full h-48 object-cover"
            />
          </div>
        </div>
      </section>
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Daily Quote Section */}
        <section className="fade-in-up">
          <DailyQuote />
        </section>

        {/* Main Dashboard */}
        <section className="fade-in-up-delay-1">
          <WellnessDashboard />
        </section>
      </main>
    </div>
  );
};

export default Home;
import Navigation from "@/components/layout/Navigation";
import WellnessDashboard from "@/components/dashboard/WellnessDashboard";
import DailyQuote from "@/components/motivation/DailyQuote";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-vert-eau via-vert-pale to-vert-pale/20">
      <Navigation />
      
      {/* Hero Section with Brand Image */}
      <section className="header-wave mb-8">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-anthracite mb-4">
            Bienvenue chez Lyloo
          </h1>
          <p className="text-anthracite text-xl max-w-2xl mx-auto mb-2">
            Votre compagnon de bien-être holistique
          </p>
          <p className="text-anthracite text-xl max-w-2xl mx-auto mb-8">
            pour cultiver votre sérénité intérieure
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
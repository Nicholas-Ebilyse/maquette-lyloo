import Navigation from "@/components/layout/Navigation";
import WellnessDashboard from "@/components/dashboard/WellnessDashboard";
import DailyQuote from "@/components/motivation/DailyQuote";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
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
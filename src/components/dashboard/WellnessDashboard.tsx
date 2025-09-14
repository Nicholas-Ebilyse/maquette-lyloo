import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Brain, 
  Activity, 
  Heart, 
  Clock,
  Target,
  Calendar,
  Droplets,
  Wind,
  Sun
} from "lucide-react";

const WellnessDashboard = () => {
  const weeklyProgress = 65;
  const todayGoals = [
    { icon: Droplets, label: "Hydratation", progress: 75, target: "8 verres" },
    { icon: Wind, label: "Respiration", progress: 50, target: "2 séances" },
    { icon: Brain, label: "Méditation", progress: 100, target: "10 min" },
    { icon: Activity, label: "Mouvement", progress: 30, target: "30 min" }
  ];

  const recentActivities = [
    { type: "meditation", title: "Respiration consciente", duration: "10 min", time: "il y a 2h" },
    { type: "physical", title: "Yoga matinal", duration: "20 min", time: "ce matin" },
    { type: "motivation", title: "Citation du jour", duration: "1 min", time: "hier" }
  ];

  const suggestions = [
    {
      title: "Séance de respiration",
      description: "Prenez 5 minutes pour vous recentrer",
      category: "Bien-être mental",
      duration: "5 min",
      type: "audio"
    },
    {
      title: "Étirements doux",
      description: "Détendez vos muscles après votre journée",
      category: "Bien-être physique", 
      duration: "15 min",
      type: "video"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="p-6 bg-gradient-to-r from-vert-eau to-vert-pale rounded-3xl shadow-xl border border-dore-clair/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-2xl md:text-3xl font-bold text-anthracite">
              Bonjour ! ✨
            </h1>
            <p className="text-anthracite/80 mt-1">
              Prêt(e) pour une nouvelle journée de bien-être ?
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-anthracite/80">Semaine en cours</div>
            <div className="text-2xl font-bold text-anthracite">{weeklyProgress}%</div>
          </div>
        </div>
        
        <div className="mt-4">
          <Progress value={weeklyProgress} className="h-2" />
          <p className="text-sm text-anthracite/70 mt-2">
            Vous êtes sur la bonne voie ! Continuez ainsi.
          </p>
        </div>
      </div>

      {/* Today's Goals */}
      <div className="bg-gradient-to-r from-terracotta-lyloo/20 to-marron-chaud/10 rounded-3xl p-6 shadow-xl border border-terracotta-lyloo/30">
        <h2 className="flex items-center gap-2 text-xl font-playfair font-bold text-anthracite mb-6">
          <Target className="h-5 w-5 text-anthracite" />
          Objectifs du jour
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {todayGoals.map((goal, index) => (
            <div key={index} className="space-y-3 p-4 rounded-lg bg-beige-lyloo/80 shadow-md border border-dore-clair/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <goal.icon className="h-4 w-4 text-anthracite" />
                  <span className="font-medium text-sm text-anthracite">{goal.label}</span>
                </div>
                <span className="text-xs text-anthracite/70">{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className="h-1.5" />
              <p className="text-xs text-anthracite/70">{goal.target}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-dore-clair/30 to-orange-lyloo/20 rounded-3xl p-6 shadow-xl border border-orange-lyloo/30">
        <h2 className="text-xl font-playfair font-bold text-anthracite mb-6">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="bg-gradient-to-r from-vert-eau to-vert-pale text-anthracite h-20 flex-col gap-2 hover:shadow-xl transition-all duration-300">
            <Brain className="h-6 w-6" />
            <span>Méditation express</span>
          </Button>
          <Button className="bg-gradient-to-r from-terracotta-lyloo to-marron-chaud text-white h-20 flex-col gap-2 hover:shadow-xl transition-all duration-300">
            <Activity className="h-6 w-6" />
            <span>Mouvement du jour</span>
          </Button>
          <Button className="bg-gradient-to-r from-dore-clair to-orange-lyloo text-anthracite h-20 flex-col gap-2 hover:shadow-xl transition-all duration-300">
            <Sun className="h-6 w-6" />
            <span>Citation inspirante</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Activités récentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="space-y-1">
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-xs">
                    {activity.duration}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Suggestions pour vous
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{suggestion.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {suggestion.duration}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary">{suggestion.category}</span>
                    <Button size="sm" variant="ghost" className="h-auto p-1 text-xs">
                      Commencer →
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WellnessDashboard;
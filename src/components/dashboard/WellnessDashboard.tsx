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
      <div className="wellness-card p-6 bg-gradient-to-r from-vert-eau/20 via-terracotta-lyloo/10 to-marron-chaud/5 border border-vert-eau/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-2xl md:text-3xl font-bold text-foreground">
              Bonjour ! ✨
            </h1>
            <p className="text-muted-foreground mt-1">
              Prêt(e) pour une nouvelle journée de bien-être ?
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Semaine en cours</div>
            <div className="text-2xl font-bold text-primary">{weeklyProgress}%</div>
          </div>
        </div>
        
        <div className="mt-4">
          <Progress value={weeklyProgress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            Vous êtes sur la bonne voie ! Continuez ainsi.
          </p>
        </div>
      </div>

      {/* Today's Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Objectifs du jour
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {todayGoals.map((goal, index) => (
              <div key={index} className="space-y-3 p-4 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <goal.icon className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">{goal.label}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-1.5" />
                <p className="text-xs text-muted-foreground">{goal.target}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="btn-sage h-20 flex-col gap-2">
              <Brain className="h-6 w-6" />
              <span>Méditation express</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Activity className="h-6 w-6" />
              <span>Mouvement du jour</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Sun className="h-6 w-6" />
              <span>Citation inspirante</span>
            </Button>
          </div>
        </CardContent>
      </Card>

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
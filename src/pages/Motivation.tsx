import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sun, 
  Heart, 
  Share2, 
  Star,
  Bell,
  Clock,
  Target,
  TrendingUp,
  Sparkles
} from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import DailyQuote from "@/components/motivation/DailyQuote";

const Motivation = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [morningNotif, setMorningNotif] = useState(true);
  const [eveningNotif, setEveningNotif] = useState(false);

  const achievements = [
    {
      id: 1,
      title: "Première semaine",
      description: "7 jours consécutifs d'activité",
      icon: "🏆",
      unlocked: true,
      date: "12 Jan 2024"
    },
    {
      id: 2,
      title: "Méditant assidu",
      description: "50 séances de méditation terminées",
      icon: "🧘‍♀️",
      unlocked: true,
      date: "18 Jan 2024"
    },
    {
      id: 3,
      title: "Maître du bien-être",
      description: "100 heures d'activités bien-être",
      icon: "⭐",
      unlocked: false,
      progress: 67
    }
  ];

  const motivationalGoals = [
    {
      id: 1,
      title: "Méditer 10 minutes par jour",
      streak: 12,
      target: 30,
      icon: "🧘‍♀️"
    },
    {
      id: 2,
      title: "Boire 2L d'eau quotidiennement",
      streak: 8,
      target: 21,
      icon: "💧"
    },
    {
      id: 3,
      title: "Pratiquer la gratitude",
      streak: 15,
      target: 30,
      icon: "🙏"
    }
  ];

  const quotes = [
    {
      id: 1,
      text: "Le bonheur, c'est quand vos pensées, vos paroles et vos actes sont en harmonie.",
      author: "Gandhi",
      category: "Harmonie",
      liked: true
    },
    {
      id: 2,
      text: "La sérénité n'est pas l'absence de tempête, mais la paix au milieu de la tempête.",
      author: "Anonyme",
      category: "Sérénité",
      liked: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-playfair font-bold text-sage-dark mb-4">
            Motivation quotidienne
          </h1>
          <p className="text-lg text-muted-foreground">
            Cultivez votre inspiration et atteignez vos objectifs bien-être
          </p>
        </div>

        <Tabs defaultValue="daily" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="daily">Aujourd'hui</TabsTrigger>
            <TabsTrigger value="goals">Objectifs</TabsTrigger>
            <TabsTrigger value="achievements">Réussites</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-6">
            <DailyQuote />
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-primary text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sun className="h-5 w-5" />
                    Votre énergie du jour
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">85%</div>
                  <p className="text-white/80">
                    Excellent ! Vous êtes sur la bonne voie pour une journée productive.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Objectif du jour
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Méditation</span>
                      <Badge>10 min</Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <p className="text-sm text-muted-foreground">7 minutes restantes</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="grid gap-6">
              {motivationalGoals.map((goal) => (
                <Card key={goal.id} className="hover-scale">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{goal.icon}</span>
                        <div>
                          <h3 className="font-semibold">{goal.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Série de {goal.streak} jours
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {goal.streak}/{goal.target} jours
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all" 
                        style={{ width: `${(goal.streak / goal.target) * 100}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`hover-scale ${achievement.unlocked ? 'bg-primary/5 border-primary/20' : 'opacity-60'}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{achievement.icon}</span>
                      {achievement.unlocked && (
                        <Badge className="bg-primary/20 text-primary">
                          Débloqué
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    <CardDescription>{achievement.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {achievement.unlocked ? (
                      <p className="text-sm text-muted-foreground">
                        Obtenu le {achievement.date}
                      </p>
                    ) : (
                      <div>
                        <div className="w-full bg-muted rounded-full h-2 mb-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Progression: {achievement.progress}%
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notifications de motivation
                </CardTitle>
                <CardDescription>
                  Configurez vos rappels quotidiens pour rester motivé
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notifications activées</h3>
                    <p className="text-sm text-muted-foreground">
                      Recevoir des rappels quotidiens
                    </p>
                  </div>
                  <Switch
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Rappel matinal</h3>
                    <p className="text-sm text-muted-foreground">
                      Citation inspirante à 8h00
                    </p>
                  </div>
                  <Switch
                    checked={morningNotif}
                    onCheckedChange={setMorningNotif}
                    disabled={!notificationsEnabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Rappel du soir</h3>
                    <p className="text-sm text-muted-foreground">
                      Réflexion positive à 20h00
                    </p>
                  </div>
                  <Switch
                    checked={eveningNotif}
                    onCheckedChange={setEveningNotif}
                    disabled={!notificationsEnabled}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Citations favorites</CardTitle>
                <CardDescription>
                  Gérez votre collection de citations inspirantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quotes.map((quote) => (
                    <div key={quote.id} className="p-4 border rounded-lg">
                      <p className="italic mb-2">"{quote.text}"</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          - {quote.author}
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{quote.category}</Badge>
                          <Button variant="ghost" size="sm">
                            <Heart className={`h-4 w-4 ${quote.liked ? 'fill-current text-red-500' : ''}`} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Motivation;
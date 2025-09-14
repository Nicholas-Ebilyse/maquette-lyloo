import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Settings, 
  Crown,
  Bell,
  Shield,
  Download,
  Trash2,
  Edit,
  Calendar,
  Activity,
  Award,
  Star,
  Clock
} from "lucide-react";
import Navigation from "@/components/layout/Navigation";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPremium] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Marie",
    lastName: "Dubois",
    email: "marie.dubois@email.com",
    birthDate: "1990-05-15",
    goals: ["Réduction du stress", "Amélioration du sommeil", "Forme physique"]
  });

  const stats = [
    { label: "Séances terminées", value: 127, icon: Activity },
    { label: "Heures d'écoute", value: 45, icon: Clock },
    { label: "Jours consécutifs", value: 12, icon: Calendar },
    { label: "Favoris sauvegardés", value: 23, icon: Star }
  ];

  const recentActivity = [
    { 
      id: 1, 
      title: "Méditation guidée - Sommeil profond", 
      date: "Hier", 
      duration: "15 min",
      type: "Bien-être mental"
    },
    { 
      id: 2, 
      title: "Yoga matinal énergisant", 
      date: "Il y a 2 jours", 
      duration: "20 min",
      type: "Bien-être physique"
    },
    { 
      id: 3, 
      title: "Respiration anti-stress", 
      date: "Il y a 3 jours", 
      duration: "10 min",
      type: "Bien-être mental"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-lyloo via-background to-vert-eau/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header with LYLOO Branding */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-playfair font-bold text-gradient-mental mb-4">
            Mon profil Lyloo
          </h1>
          <p className="text-marron-chaud/80 text-lg">
            Gérez vos informations personnelles et suivez votre progression bien-être
          </p>
          
          {/* Decorative Hero Image */}
          <div className="max-w-sm mx-auto mt-6 rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="/src/assets/lyloo-wellness-space.jpg" 
              alt="Espace bien-être Lyloo" 
              className="w-full h-32 object-cover"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="text-center border border-vert-eau/30 bg-gradient-to-br from-beige-lyloo/50 to-vert-eau/10">
              <CardHeader>
                <div className="w-24 h-24 mx-auto bg-gradient-mental rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <User className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-xl">
                  {profileData.firstName} {profileData.lastName}
                </CardTitle>
                <CardDescription>{profileData.email}</CardDescription>
                <div className="flex justify-center mt-4">
                  {isPremium ? (
                    <Badge className="bg-gradient-mental text-white shadow-lg">
                      <Crown className="h-4 w-4 mr-1" />
                      Premium Lyloo
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-vert-eau/50 text-marron-chaud">
                      Compte Gratuit
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!isPremium && (
                  <Button className="w-full btn-mental">
                    <Crown className="h-4 w-4 mr-2" />
                    Passer Premium Lyloo
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Mes statistiques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <stat.icon className="h-6 w-6 mx-auto text-primary mb-2" />
                      <div className="text-2xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="info" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="info">Informations</TabsTrigger>
                <TabsTrigger value="activity">Activité</TabsTrigger>
                <TabsTrigger value="settings">Paramètres</TabsTrigger>
                <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Informations personnelles</CardTitle>
                      <CardDescription>
                        Gérez vos données personnelles et vos objectifs
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {isEditing ? 'Annuler' : 'Modifier'}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          disabled={!isEditing}
                          onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          disabled={!isEditing}
                          onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="birthDate">Date de naissance</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={profileData.birthDate}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData(prev => ({ ...prev, birthDate: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label>Objectifs bien-être</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profileData.goals.map((goal, index) => (
                          <Badge key={index} variant="secondary">
                            {goal}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Annuler
                        </Button>
                        <Button onClick={() => setIsEditing(false)}>
                          Sauvegarder
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Activité récente</CardTitle>
                    <CardDescription>
                      Vos dernières séances et activités bien-être
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-medium">{activity.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{activity.type}</span>
                              <span>•</span>
                              <span>{activity.duration}</span>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {activity.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notifications
                    </CardTitle>
                    <CardDescription>
                      Gérez vos préférences de notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Rappels quotidiens</h3>
                        <p className="text-sm text-muted-foreground">
                          Recevoir des rappels pour vos séances
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Nouveautés</h3>
                        <p className="text-sm text-muted-foreground">
                          Être informé des nouveaux contenus
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Préférences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Format préféré</Label>
                      <div className="flex gap-2 mt-2">
                        <Badge>Audio</Badge>
                        <Badge variant="outline">Vidéo</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Confidentialité et données
                    </CardTitle>
                    <CardDescription>
                      Gérez vos données personnelles et votre confidentialité
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger mes données
                    </Button>
                    
                    <Separator />
                    
                    <div className="bg-destructive/10 p-4 rounded-lg">
                      <h3 className="font-medium text-destructive mb-2">Zone de danger</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        La suppression de votre compte est définitive et irréversible.
                      </p>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer mon compte
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
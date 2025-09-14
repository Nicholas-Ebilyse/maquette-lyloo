import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { 
  Leaf, 
  Brain, 
  Home, 
  User, 
  ShoppingBag, 
  Menu, 
  X,
  Sun,
  Activity,
  LogOut,
  ChefHat
} from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", icon: Home, label: "Accueil" },
    { path: "/motivation", icon: Sun, label: "Motivation" },
    { path: "/mental", icon: Brain, label: "Bien-être mental" },
    { path: "/physical", icon: Activity, label: "Bien-être physique" },
    { path: "/recipes", icon: ChefHat, label: "Recettes" },
    { path: "/shop", icon: ShoppingBag, label: "Boutique" },
    { path: "/admin", icon: Menu, label: "Admin" },
    { path: "/profile", icon: User, label: "Profil" },
  ];

  return (
    <>
      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-vert-eau to-vert-pale backdrop-blur-sm border-b border-anthracite/20">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/src/assets/lyloo-logo-leaf.png" alt="Lyloo logo" className="h-6 w-6" />
            <span className="font-playfair font-semibold text-xl text-anthracite">
              Lyloo
            </span>
          </Link>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="bg-background border-t border-border p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  isActive(item.path)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.path === "/mental" ? (
                  <img src="/src/assets/mental-wellness-icon.png" alt="Mental" className="h-5 w-5" />
                ) : item.path === "/physical" ? (
                  <img src="/src/assets/physical-wellness-icon.png" alt="Physique" className="h-5 w-5" />
                ) : (
                  <item.icon className="h-5 w-5" />
                )}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-vert-eau to-vert-pale backdrop-blur-sm border-b border-anthracite/20">
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/src/assets/lyloo-logo-leaf.png" alt="Lyloo logo" className="h-8 w-8" />
            <span className="font-playfair font-bold text-2xl text-anthracite">
              Lyloo
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.slice(0, -3).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.path === "/mental" ? (
                  <img src="/src/assets/mental-wellness-icon.png" alt="Mental" className="h-4 w-4" />
                ) : item.path === "/physical" ? (
                  <img src="/src/assets/physical-wellness-icon.png" alt="Physique" className="h-4 w-4" />
                ) : (
                  <item.icon className="h-4 w-4" />
                )}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
            <Link
              to="/admin"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                isActive("/admin")
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Menu className="h-4 w-4" />
              <span className="font-medium">Admin</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/profile">
              <Button variant="outline" size="sm" className="rounded-full">
                <User className="h-4 w-4 mr-2" />
                {profile?.first_name || user?.email || 'Mon compte'}
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={signOut}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </Button>
            <Badge variant="secondary" className="bg-terracotta/20 text-terracotta-foreground">
              {profile?.is_premium ? 'Premium' : 'Gratuit'}
            </Badge>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16 lg:h-20" />
    </>
  );
};

export default Navigation;
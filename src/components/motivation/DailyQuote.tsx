import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Heart, RefreshCw } from "lucide-react";

interface Quote {
  text: string;
  author: string;
  category: string;
}

const DailyQuote = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const quotes: Quote[] = [
    {
      text: "Le bonheur n'est pas une destination, c'est un mode de voyage.",
      author: "Margaret Lee Runbeck",
      category: "Bonheur"
    },
    {
      text: "Prendre soin de soi n'est pas de l'égoïsme, c'est une priorité.",
      author: "Anonyme",
      category: "Bien-être"
    },
    {
      text: "La paix vient de l'intérieur. Ne la cherchez pas à l'extérieur.",
      author: "Bouddha",
      category: "Sérénité"
    },
    {
      text: "Vous êtes plus fort que vous ne le pensez et plus capable que vous ne l'imaginez.",
      author: "Anonyme",
      category: "Confiance"
    },
    {
      text: "Chaque jour est une nouvelle chance de grandir et de briller.",
      author: "Anonyme",
      category: "Croissance"
    }
  ];

  const getRandomQuote = () => {
    setLoading(true);
    setTimeout(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  const handleShare = () => {
    if (quote) {
      const shareText = `"${quote.text}" - ${quote.author}`;
      if (navigator.share) {
        navigator.share({
          title: 'Citation inspirante',
          text: shareText,
        });
      } else {
        navigator.clipboard.writeText(shareText);
        alert('Citation copiée dans le presse-papier !');
      }
    }
  };

  if (!quote) {
    return (
      <div className="wellness-card p-8 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient with LYLOO brand colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-vert-eau to-terracotta-lyloo/40 rounded-3xl"></div>
      
      <div className="relative p-8 md:p-12 text-center space-y-6 rounded-3xl shadow-xl border border-marron-chaud/30">
        {/* Category Badge with brand colors */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-beige-lyloo/90 text-anthracite border border-dore-clair/50 text-sm font-medium">
          {quote.category}
        </div>

        {/* Quote */}
        <blockquote className={`space-y-4 ${loading ? 'opacity-50' : 'fade-in-up'}`}>
          <p className="font-playfair text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-anthracite italic">
            "{quote.text}"
          </p>
          <footer className="text-anthracite/80 text-lg">
            — {quote.author}
          </footer>
        </blockquote>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button
            className={`rounded-full transition-colors bg-beige-lyloo/90 text-anthracite border border-dore-clair/50 hover:bg-beige-lyloo ${
              isLiked ? 'bg-red-100 border-red-300 text-red-700' : ''
            }`}
            size="sm"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart 
              className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} 
            />
            {isLiked ? 'Aimée' : 'Aimer'}
          </Button>

          <Button
            className="rounded-full bg-beige-lyloo/90 text-anthracite border border-dore-clair/50 hover:bg-beige-lyloo"
            size="sm"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Partager
          </Button>

          <Button
            className="rounded-full bg-beige-lyloo/90 text-anthracite border border-dore-clair/50 hover:bg-beige-lyloo"
            size="sm"
            onClick={getRandomQuote}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Nouvelle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DailyQuote;
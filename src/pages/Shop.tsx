import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Star,
  Heart,
  ShoppingCart,
  Eye,
  Plus,
  Minus,
  Trash2
} from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import PaymentForm from "@/components/shop/PaymentForm";
import OrderConfirmation from "@/components/shop/OrderConfirmation";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";



type CheckoutStep = 'cart' | 'payment' | 'confirmation';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('cart');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");



  const products = [
    {
      id: 1,
      name: "Huile essentielle de Lavande",
      description: "Pure et naturelle, parfaite pour la relaxation",
      price: 24.90,
      originalPrice: 29.90,
      rating: 4.8,
      reviews: 156,
      image: "photo-1465146344425-f00d5f5c8f07",
      category: "Huiles essentielles",
      tags: ["Bio", "Populaire", "Promo"],
      inStock: true
    },
    {
      id: 2,
      name: "Cadre Kamishibaï traditionnel",
      description: "Théâtre en bois pour vos histoires bien-être",
      price: 89.90,
      rating: 4.9,
      reviews: 67,
      image: "photo-1518770660439-4636190af475",
      category: "Accessoires",
      tags: ["Artisanal", "Nouveau"],
      inStock: true
    },
    {
      id: 3,
      name: "Coussin de méditation",
      description: "Confort optimal pour vos séances de méditation",
      price: 45.00,
      rating: 4.7,
      reviews: 89,
      image: "photo-1581091226825-a6a2a5aee158",
      category: "Accessoires",
      tags: ["Confort", "Bio"],
      inStock: false
    },
    {
      id: 4,
      name: "Set d'huiles détox",
      description: "Mélange de 3 huiles pour purifier et énergiser",
      price: 67.90,
      rating: 4.6,
      reviews: 124,
      image: "photo-1500673922987-e212871fec22",
      category: "Huiles essentielles",
      tags: ["Pack", "Détox"],
      inStock: true
    }
  ];

  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const clearFromCart = (productId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === parseInt(productId));
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  const getCartItems = () => {
    return Object.entries(cart).map(([productId, quantity]) => {
      const product = products.find(p => p.id === parseInt(productId));
      return product ? { ...product, quantity } : null;
    }).filter(Boolean);
  };

  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'bio': return 'bg-green-100 text-green-800';
      case 'promo': return 'bg-red-100 text-red-800';
      case 'nouveau': return 'bg-blue-100 text-blue-800';
      case 'populaire': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCheckout = () => {
    setCheckoutStep('payment');
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = (orderNum: string) => {
    setOrderNumber(orderNum);
    setCheckoutStep('confirmation');
    // Vider le panier
    setCart({});
  };

  const handleContinueShopping = () => {
    setIsCheckoutOpen(false);
    setCheckoutStep('cart');
  };

  const handleCancelPayment = () => {
    setCheckoutStep('cart');
    setIsCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-playfair font-bold text-sage-dark mb-4">
              Boutique bien-être
            </h1>
            <p className="text-lg text-muted-foreground">
              Découvrez nos produits naturels pour accompagner votre parcours bien-être
            </p>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button className="relative">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Panier
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Mon Panier</SheetTitle>
                <SheetDescription>
                  {getTotalItems() > 0 ? `${getTotalItems()} article(s) dans votre panier` : "Votre panier est vide"}
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-8 space-y-4">
                {getCartItems().length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Votre panier est vide</p>
                    <p className="text-sm text-muted-foreground">Découvrez nos produits ci-dessous</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {getCartItems().map((item) => (
                        <div key={item!.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <img
                            src={`https://images.unsplash.com/${item!.image}?w=80&h=80&fit=crop`}
                            alt={item!.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium line-clamp-1">{item!.name}</h4>
                            <p className="text-sm text-muted-foreground">{item!.price.toFixed(2)}€</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeFromCart(item!.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item!.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addToCart(item!.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => clearFromCart(item!.id)}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>{getTotalPrice().toFixed(2)}€</span>
                      </div>
                      <Button className="w-full" size="lg" onClick={handleCheckout}>
                        Procéder au paiement
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Dialog pour le processus de checkout */}
        <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {checkoutStep === 'payment' && "Finaliser votre commande"}
                {checkoutStep === 'confirmation' && "Commande confirmée"}
              </DialogTitle>
              <DialogDescription>
                {checkoutStep === 'payment' && "Saisissez vos informations de paiement"}
                {checkoutStep === 'confirmation' && "Votre commande a été traitée avec succès"}
              </DialogDescription>
            </DialogHeader>
            
            {checkoutStep === 'payment' && (
              <PaymentForm
                totalAmount={getTotalPrice()}
                cartItems={getCartItems()}
                onPaymentSuccess={handlePaymentSuccess}
                onCancel={handleCancelPayment}
              />
            )}
            
            {checkoutStep === 'confirmation' && (
              <OrderConfirmation
                orderNumber={orderNumber}
                totalAmount={getTotalPrice()}
                onContinueShopping={handleContinueShopping}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Search and filters */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Tous les produits</TabsTrigger>
            <TabsTrigger value="oils">Huiles essentielles</TabsTrigger>
            <TabsTrigger value="accessories">Accessoires</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="group overflow-hidden hover-scale">
                  <div className="aspect-square bg-gradient-primary rounded-t-lg relative overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/${product.image}?w=300&h=300&fit=crop`}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.tags.map((tag) => (
                        <Badge key={tag} className={getTagColor(tag)}>
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>

                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive">Rupture de stock</Badge>
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {product.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">
                          {product.price.toFixed(2)}€
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.originalPrice.toFixed(2)}€
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.reviews} avis
                      </span>
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      {product.inStock ? 'Ajouter au panier' : 'Indisponible'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>


          <TabsContent value="oils" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.filter(p => p.category === "Huiles essentielles").map((product) => (
                <Card key={product.id} className="group overflow-hidden hover-scale">
                  <div className="aspect-square bg-gradient-primary rounded-t-lg relative overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/${product.image}?w=300&h=300&fit=crop`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.tags.map((tag) => (
                        <Badge key={tag} className={getTagColor(tag)}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-primary">
                        {product.price.toFixed(2)}€
                      </span>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <Button className="w-full" onClick={() => addToCart(product.id)}>
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Ajouter au panier
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="accessories" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.filter(p => p.category === "Accessoires").map((product) => (
                <Card key={product.id} className="group overflow-hidden hover-scale">
                  <div className="aspect-square bg-gradient-primary rounded-t-lg relative overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/${product.image}?w=300&h=300&fit=crop`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.tags.map((tag) => (
                        <Badge key={tag} className={getTagColor(tag)}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive">Rupture de stock</Badge>
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-primary">
                        {product.price.toFixed(2)}€
                      </span>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      {product.inStock ? 'Ajouter au panier' : 'Indisponible'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
};

export default Shop;

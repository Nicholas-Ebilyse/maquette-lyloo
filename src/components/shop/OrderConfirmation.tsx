
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingBag, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OrderConfirmationProps {
  orderNumber: string;
  totalAmount: number;
  onContinueShopping: () => void;
}

const OrderConfirmation = ({ orderNumber, totalAmount, onContinueShopping }: OrderConfirmationProps) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full max-w-md mx-auto text-center">
      <CardHeader>
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl font-bold text-green-700">
          Commande confirmée !
        </CardTitle>
        <CardDescription>
          Votre commande a été prise en compte avec succès
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Numéro de commande :</span>
              <span className="text-sm font-mono">{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Montant total :</span>
              <span className="text-sm font-semibold">{totalAmount.toFixed(2)}€</span>
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>Vous recevrez un email de confirmation dans quelques minutes.</p>
          <p>Votre commande sera traitée dans les plus brefs délais.</p>
        </div>

        <div className="space-y-3">
          <Button onClick={onContinueShopping} className="w-full">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Continuer mes achats
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate("/")} 
            className="w-full"
          >
            <Home className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderConfirmation;


import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
  email: string;
}

interface PaymentFormProps {
  totalAmount: number;
  cartItems: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  onPaymentSuccess: (orderNumber: string) => void;
  onCancel: () => void;
}

const PaymentForm = ({ totalAmount, cartItems, onPaymentSuccess, onCancel }: PaymentFormProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormData>();

  const onSubmit = async (data: PaymentFormData) => {
    setIsProcessing(true);
    
    try {
      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderNumber = `WL-${Date.now()}`;
      
      // Simuler une réponse de succès (en mode test)
      console.log("Paiement simulé:", { ...data, amount: totalAmount });
      
      // Envoyer l'email de confirmation
      try {
        await supabase.functions.invoke('send-order-confirmation', {
          body: {
            email: data.email,
            orderNumber,
            totalAmount,
            items: cartItems.map(item => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price
            }))
          }
        });
        
        toast({
          title: "Paiement réussi !",
          description: "Votre commande a été confirmée. Un email de confirmation a été envoyé.",
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        toast({
          title: "Paiement réussi !",
          description: "Votre commande a été confirmée. (Email de confirmation non envoyé)",
        });
      }
      
      onPaymentSuccess(orderNumber);
    } catch (error) {
      toast({
        title: "Erreur de paiement",
        description: "Une erreur est survenue lors du traitement de votre paiement.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Paiement sécurisé
        </CardTitle>
        <CardDescription>
          Mode test - Utilisez le numéro 4242 4242 4242 4242
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              {...register("name", { required: "Le nom est requis" })}
              placeholder="Jean Dupont"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { 
                required: "L'email est requis",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Format d'email invalide"
                }
              })}
              placeholder="jean@exemple.com"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber">Numéro de carte</Label>
            <Input
              id="cardNumber"
              {...register("cardNumber", { 
                required: "Le numéro de carte est requis",
                pattern: {
                  value: /^[0-9\s]{13,19}$/,
                  message: "Numéro de carte invalide"
                }
              })}
              placeholder="4242 4242 4242 4242"
              maxLength={19}
            />
            {errors.cardNumber && (
              <p className="text-sm text-destructive">{errors.cardNumber.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Date d'expiration</Label>
              <Input
                id="expiryDate"
                {...register("expiryDate", { 
                  required: "La date d'expiration est requise",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                    message: "Format MM/AA"
                  }
                })}
                placeholder="MM/AA"
                maxLength={5}
              />
              {errors.expiryDate && (
                <p className="text-sm text-destructive">{errors.expiryDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                {...register("cvv", { 
                  required: "Le CVV est requis",
                  pattern: {
                    value: /^[0-9]{3,4}$/,
                    message: "CVV invalide"
                  }
                })}
                placeholder="123"
                maxLength={4}
              />
              {errors.cvv && (
                <p className="text-sm text-destructive">{errors.cvv.message}</p>
              )}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-semibold mb-4">
              <span>Total à payer</span>
              <span>{totalAmount.toFixed(2)}€</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              type="submit" 
              className="w-full" 
              size="lg" 
              disabled={isProcessing}
            >
              <Lock className="h-4 w-4 mr-2" />
              {isProcessing ? "Traitement..." : "Payer maintenant"}
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full" 
              onClick={onCancel}
              disabled={isProcessing}
            >
              Annuler
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Paiement sécurisé. Vos données sont protégées.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;

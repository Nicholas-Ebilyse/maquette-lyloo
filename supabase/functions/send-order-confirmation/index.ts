import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderConfirmationRequest {
  email: string;
  orderNumber: string;
  totalAmount: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, orderNumber, totalAmount, items }: OrderConfirmationRequest = await req.json();

    const itemsHtml = items.map(item => 
      `<tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${(item.price * item.quantity).toFixed(2)}€</td>
      </tr>`
    ).join('');

    const emailResponse = await resend.emails.send({
      from: "Wellness App <onboarding@resend.dev>",
      to: [email],
      subject: `Confirmation de commande #${orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2d3748; text-align: center;">Confirmation de commande</h1>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #2d3748; margin-top: 0;">Détails de votre commande</h2>
            <p><strong>Numéro de commande :</strong> ${orderNumber}</p>
            <p><strong>Montant total :</strong> ${totalAmount.toFixed(2)}€</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #2d3748;">Articles commandés :</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #edf2f7;">
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e0;">Article</th>
                  <th style="padding: 12px; text-align: center; border-bottom: 2px solid #cbd5e0;">Quantité</th>
                  <th style="padding: 12px; text-align: right; border-bottom: 2px solid #cbd5e0;">Prix</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
          </div>

          <div style="background-color: #e6fffa; padding: 15px; border-radius: 8px; border-left: 4px solid #38b2ac;">
            <p style="margin: 0; color: #2d3748;">
              Merci pour votre commande ! Votre commande a été prise en compte et sera traitée dans les plus brefs délais.
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px; color: #718096; font-size: 14px;">
            <p>Wellness App - Votre partenaire bien-être</p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-order-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
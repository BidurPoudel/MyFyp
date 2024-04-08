import prisma from "../../../prisma/index.js";
import axios from 'axios';
import Stripe from 'stripe';

class PaymentController {
  paymentInitiate = async (amount, formData, req, res) => {
    try {
      const stripe = new Stripe('sk_test_51P2s3xSAPstj23SmLhHIKSi9UI7N6DQ0xZoOYYY2Mc4IBfe3enk4CqJXbFwqQaPXACaMcGjkKnZACaGbxuCuHzVT00TDDMSEX1', {
        apiVersion: '2020-08-27', // specify your desired Stripe API version
      });

      const amountInCents = amount * 100;

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd', // Stripe expects amounts in USD
              unit_amount: amountInCents, // Amount converted to cents
              product_data: {
                name: 'Your Product Name', // Provide a name for your product
              },
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `http://127.0.0.1:5173/checkout-success`,
        cancel_url: `http://127.0.0.1:5173/properties`,
      });

      res.send({ url: session.url });
    } catch (error) {
      console.error('Error initiating payment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export const paymentController = new PaymentController();

import { FormatAmount } from 'helper/formater';
import Stripe from 'stripe';

export interface ProductStripe {
  priceId: string;
  amount: string;
}

export const stripe = new Stripe(
    process.env.STRIPE_API_KEY,
    {
        apiVersion: '2020-08-27',
        appInfo: {
            name:'Ignews',
            version: '1.0.0'
        }
    }
)

export async function getProductStripe(): Promise<ProductStripe>{
  const price =   await stripe.prices.retrieve('price_1J89AHDEreH9cN5raVkTPhN8')

  const product:ProductStripe = {
    priceId: price.id,
    amount: FormatAmount(price.unit_amount / 100)
  }

  return product
}

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { fauna } from "services/fauna";
import { stripe } from "services/stripe";
import { query as q } from "faunadb";

type User = {
  ref: {
    id: string
  },
  data: {
    stripe_customer_id: string
  }
}

const checkoutSession = async (request: NextApiRequest, response: NextApiResponse) => {
  let msg = "";
  try {

    if (request.method === 'POST') {

      const session = await getSession({ req: request });
      msg = `3-checkoutSession => ${session}`;

      //buscar usuário cadastrado no faunadb
      const user = await fauna.query<User>(
        q.Get(
          q.Match(
            q.Index('user_by_email'),
            q.Casefold(session.user.email)
          )
        )
      );

      let customerId = user.data.stripe_customer_id;

      if (!customerId) {

        // criar o usuário no stripe
        const stripeCustomer = await stripe.customers.create({
          email: session.user.email
        });

        // salvar a referência do fauna, vinculado ao usuário no faunadb
        await fauna.query(
          q.Update(
            q.Ref(q.Collection('users'), user.ref.id),
            {
              data: {
                stripe_customer_id: stripeCustomer.id,
              }
            }
          )
        )
        customerId = stripeCustomer.id;
      }

      const checkoutStripeSession = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        line_items: [
          { price: 'price_1J89AHDEreH9cN5raVkTPhN8', quantity: 1 }
        ],
        mode: 'subscription',
        allow_promotion_codes: true,
        success_url: process.env.STRIPE_SUCESS_URL,
        cancel_url: process.env.STRIPE_CANCEL_URL
      });

      return response.status(200).json({ sessionId: checkoutStripeSession.id });
    } else {
      response.setHeader('Allow', 'POST');
      return response.status(405).end('Somente é permitido POST');
    }
  }
  catch (err) {
    return response.status(500).end(`Erro Acontecendo => ${msg + err.message}`);
  }

}

export default checkoutSession;

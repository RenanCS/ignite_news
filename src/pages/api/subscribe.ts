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

const checkoutSession = async (req, res) => {
  let msg = "";
  try {


    msg = `1-checkoutSession => ${req}`;
    req.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate');

    if (req.method === 'POST') {
      msg = `2-checkoutSession => ${req}`;

      const session = await getSession({ req });
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
      msg = `4-checkoutSession => ${user}`;

      let customerId = user.data.stripe_customer_id;

      if (!customerId) {
        msg = `5-checkoutSession => ${customerId}`;

        // criar o usuário no stripe
        const stripeCustomer = await stripe.customers.create({
          email: session.user.email
        });

        msg = `6-checkoutSession => ${stripeCustomer}`;

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
        msg = `7-checkoutSession => ${stripeCustomer}`;

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
      msg = `8-checkoutSession => ${checkoutStripeSession}`;
      msg = `9-checkoutSession sucess => ${process.env.STRIPE_SUCESS_URL}`;
      msg = `10-checkoutSession error => ${process.env.STRIPE_CANCEL_URL}`;

      return res.status(200).json({ sessionId: checkoutStripeSession.id });
    } else {
      res.setHeader('Allow', 'POST');
      return res.status(405).end('Somente é permitido POST');
    }
  }
  catch (err) {
    return res.status(500).end(`Erro Acontecendo => ${msg + err.message}`);
  }
}

 checkoutSession;

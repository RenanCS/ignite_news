import { GetStaticProps, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import imgAvatar from 'assets/images/avatar.svg';
import styles from './home.module.scss';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from 'services/stripe';
import { FormatAmount } from 'helper/formater';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({product}: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏Hey, welcome</span>
          <h1>New about the <span>React</span> world. </h1>
          <p>
            Get acess to all the publications <br />
            <span>for {FormatAmount(product.amount)} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <Image src={imgAvatar} alt="Girl coding" />
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<HomeProps>> => {

  const price = await stripe.prices.retrieve('price_1J89AHDEreH9cN5raVkTPhN8')

  const product = {
    priceId: price.id,
    amount: (price.unit_amount / 100)
  }

  return {
    props: {
      product
    },
    revalidate:60*60*24, // 24 horas
  }
}
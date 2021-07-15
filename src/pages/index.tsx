import imgAvatar from 'assets/images/avatar.svg';
import { GetStaticProps, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { getProductStripe, ProductStripe } from 'services/stripe';
import { SubscribeButton } from '../components/SubscribeButton';
import styles from './home.module.scss';

interface HomeProps {
  product: ProductStripe
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
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <Image src={imgAvatar} alt="Girl coding" />
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<HomeProps>> => {
  const productStripe = await getProductStripe();

  return {
    props: {
     product: productStripe
    },
    revalidate:60*60*24, // 24 horas
  }
}

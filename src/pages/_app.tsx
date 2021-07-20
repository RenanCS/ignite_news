import App, { AppProps } from 'next/app';
import { Header } from '../components/Header';
import '../styles/global.scss'
import {getSession, Provider as NextAuthProvider} from 'next-auth/client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

MyApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context)
  const session = await getSession(context)

  return {
    ...appProps,
    session
  }
}


export default MyApp

import Footer from '@PescaPE/components/Footer';
import Header from '@PescaPE/components/Header';
import Main from '@PescaPE/components/Main';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Pescape</title>
      </Head>
      <div id="body">
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
}

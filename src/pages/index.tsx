import Footer from '@PescaPE/components/Footer';
import FormReport from '@PescaPE/components/FormReport';
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
        <FormReport />
        <Footer />
      </div>
    </>
  );
}

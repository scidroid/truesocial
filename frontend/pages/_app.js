import { MantineProvider } from "@mantine/core";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";
import "../styles/global.css";

const App = ({ Component, pageProps }) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
        defaultRadius: "sm",
        fontFamily: "Inter",
        primaryColor: "blue",
      }}
    >
      <Head>
        <title>TrueSocial</title>
      </Head>
      <section id="layout">
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </section>
    </MantineProvider>
  );
};

export default App;

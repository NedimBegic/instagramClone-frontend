import "@/styles/global.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ContextProvider from "../store/ContextProvider";
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Header />
      <Component {...pageProps} />;
      <Footer />
    </ContextProvider>
  );
}

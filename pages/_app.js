import Layout from "./Layout";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.scss";
import "../styles/header.scss";
import "../styles/movie-card.scss";
import "../styles/movieDetail-card.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;

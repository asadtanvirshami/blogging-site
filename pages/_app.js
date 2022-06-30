import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layouts/Layout";
import "../styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

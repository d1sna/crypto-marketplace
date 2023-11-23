import PropTypes from "prop-types";
import React from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/SystemInterface/Navbar";

import "../styles/globals.css";
import { EthProvider } from "../lib/ethContext";
import Footer from "../components/SystemInterface/Footer";
import Head from "next/head";

function App({ Component, pageProps }) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-between items-center text-white px-4 sm:px-10">
      <Head>
        <title>TradingAI</title>
      </Head>
      <EthProvider>
        <ToastContainer
          autoClose={2500}
          newestOnTop
          hideProgressBar
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastClassName={() =>
            `relative flex p-2 m-2 min-h-10 rounded-md justify-between cursor-pointer my-1 backdrop-blur-3xl rounded-xl shadow-md bg-gray-900 bg-opacity-10`
          }
          bodyClassName={() => "text-smxl flex m-2 p-2 bg-opacity-10"}
          position="bottom-right"
        />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </EthProvider>
    </div>
  );
}

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape().isRequired,
};

export default App;

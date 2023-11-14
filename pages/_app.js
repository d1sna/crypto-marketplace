import PropTypes from "prop-types";
import React from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/SystemInterface/Navbar";

import "../styles/globals.css";
import { EthProvider } from "../lib/ethContext";
import Footer from "../components/SystemInterface/Footer";

function App({ Component, pageProps }) {
  return (
    <div className="flex flex-col justify-center w-full items-center text-white px-8">
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
            `relative flex p-2 m-2 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer my-1 backdrop-blur-3xl border border-gray-800 rounded-xl shadow-md bg-gray-900 bg-opacity-10`
          }
          bodyClassName={() => "text-smxl flex m-2 p-2 bg-opacity-10"}
          position="bottom-right"
        />
        <Navbar />
        <div className="mainBox overflow-auto h-screen">
          <Component {...pageProps} />
        </div>
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

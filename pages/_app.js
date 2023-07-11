/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import React from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/SystemInterface/Navbar";

import "../styles/globals.css";
import { EthProvider } from "../lib/ethContext";

const contextClass = {
  success: "bg-blue-400",
  error: "bg-red-400",
  info: "bg-gray-400",
  warning: "bg-orange-400",
  default: "bg-indigo-400",
  dark: "bg-white-400 font-gray-300",
};

function App({ Component, pageProps }) {
  return (
    <div className="flex flex-col justify-center w-full items-center font-mono px-8">
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
          toastClassName={({ type }) =>
            contextClass[type || "default"] +
            " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer rounded-2xl my-1"
          }
          bodyClassName={() => "font-mono text-sm flex p-1 "}
          position="bottom-center"
        />
        <Navbar />
        <div className="mainBox overflow-auto">
          <Component {...pageProps} />
        </div>
      </EthProvider>
    </div>
  );
}

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape().isRequired,
};

export default App;

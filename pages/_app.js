/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/SystemInterface/Navbar";

import { EthProvider } from "../lib/ethContext";
import UserContext from "../lib/userContext";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  const [context, setContext] = useState({});

  const updateUserContext = (value) =>
    setContext((prevValue) => {
      sessionStorage.setItem("token", value.token);
      return { ...prevValue, ...value };
    });

  useEffect(() => {
    setContext({
      accounts: null,
      token: sessionStorage.getItem("token"),
      updateUserContext,
    });
  }, []);

  return (
    <div className="flex flex-col justify-center w-full items-center font-mono">
      <EthProvider>
        <UserContext.Provider value={context}>
          <ToastContainer
            position="top-right"
            autoClose={2500}
            // hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Navbar />
          <div className="mainBox">
            <Component {...pageProps} />
          </div>
        </UserContext.Provider>
      </EthProvider>
    </div>
  );
}

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape().isRequired,
};

export default App;

import React from "react";
import WithConnectedWallet from "../components/SystemInterface/WithConnectedWallet";

function history() {
  return (
    <div className="container" style={{ padding: "10px" }}>
      Transaction history Game history
    </div>
  );
}

export default WithConnectedWallet(history);

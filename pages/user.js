import React from "react";
import WalletInfo from "../components/SystemInterface/WalletInfo";

export default function User() {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: "10px", fontSize: "12px" }}>
        <h4>User info</h4>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ minWidth: "50%" }}>
          <WalletInfo full />
        </div>
        {/* <div className="container" style={{ width: "50%" }}>
      <script
        style={{ padding: "10px", borderRadius: "5px" }}
        src="https://widgets.coingecko.com/coingecko-coin-price-chart-widget.js"
      />
      <coingecko-coin-price-chart-widget coin-id="bitcoin" currency="usd" height="300" locale="en" />
    </div> */}
      </div>
    </div>
  );
}

// TradingViewWidget.jsx

import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

const TradingViewWidget = ({ pair }) => {
  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );
    
    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_d7a37") &&
        "TradingView" in window
      ) {
        const currency = pair || "BTCUSD";
        new window.TradingView.widget({
          autosize: true,
          symbol: `BITSTAMP:${currency}`,
          interval: "15",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "2",
          locale: "en",
          enable_publishing: false,
          hide_legend: true,
          save_image: false,
          container_id: "tradingview_d7a37",
          // hide_top_toolbar: true,
          // hide_volume: true,
          // allow_symbol_change: true,
          // width: "600px",e
        });
      }
    }
  }, [pair, tvScriptLoadingPromise]);

  return <div id="tradingview_d7a37" className={"h-full w-full"} />;
};

export default TradingViewWidget;

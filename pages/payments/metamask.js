import React, { useState } from "react";
import { Button, Input } from "@mui/material";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Send, Wallet } from "@mui/icons-material";
import WithConnectedWallet from "../../components/SystemInterface/WithConnectedWallet";
import UseFullContext from "../../lib/useFullContext";

function MetamaskPayment() {
  // const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);
  // const [hash, setHash] = useState(null);
  const [address, setAddress] = useState(null);

  const context = UseFullContext();
  const { tokenContract } = context;

  const buyBalance = async () => {
    try {
      if (!window.ethereum) {
        toast.info("Please install metamask");
        return;
      }
      console.log({ amount });
      if (!amount) {
        toast.info("Please enter amount");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      console.log({ address });
      ethers.utils.getAddress("0x83de37C18ead696A3F5E6847312f875A11e10D33");
      // const tx =
      await signer.sendTransaction({
        to: "0x83de37C18ead696A3F5E6847312f875A11e10D33",
        value: ethers.utils.parseEther(amount),
      });
      // setHash(tx.hash);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const sendCrsTo = async () => {
    if (!window.ethereum) {
      toast.info("Please install metamask");
      return;
    }

    if (!amount) {
      toast.info("Please enter amount");
      return;
    }

    if (!address) {
      toast.info("Please set address");
      return;
    }

    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // const signerAddress = await ethers.utils.getAddress(signer);

    try {
      await tokenContract.transfer(address, String(amount * 10 ** 18));
    } catch (error) {
      toast.error(error.message);
    }

    // console.log({ tokenContract });z
  };

  // const checkReceiptByHash = async () => {
  //   if (!window.ethereum || !hash) return;
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);

  //   const receipt = await provider.getTransactionReceipt(hash);
  // };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px",
        margin: "5px",
      }}
    >
      <div className="container" style={{ flexDirection: "column" }}>
        <div style={{ margin: "10px", fontSize: "12px" }}>Buy CRS</div>
        <Input
          placeholder="amount"
          type="number"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />

        <Button
          color="inherit"
          style={{ display: "flex", alignItems: "center", marginTop: "50px" }}
          onClick={buyBalance}
        >
          <Wallet />
        </Button>
      </div>

      <div className="container" style={{ flexDirection: "column" }}>
        <div style={{ margin: "10px", fontSize: "12px" }}>Sell CRS</div>
        <Input
          placeholder="amount"
          type="number"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />

        <Button
          color="inherit"
          style={{ display: "flex", alignItems: "center", marginTop: "50px" }}
          onClick={buyBalance}
          disabled
        >
          <Wallet />
        </Button>
      </div>

      <div className="container" style={{ flexDirection: "column" }}>
        <div style={{ margin: "10px", fontSize: "12px" }}>Send CRS</div>

        <Input
          placeholder="address"
          type="string"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <Input
          placeholder="amount"
          type="number"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          style={{ marginTop: "5px" }}
        />

        <Button
          color="inherit"
          style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}
          onClick={sendCrsTo}
        >
          <Send />
        </Button>
      </div>
    </div>
  );
}

export default WithConnectedWallet(MetamaskPayment);

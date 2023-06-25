import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import CasinoIcon from "@mui/icons-material/Casino";
import { toast } from "react-toastify";
import Image from "next/image";
import { CurrencyExchange, MonetizationOn } from "@mui/icons-material";
import "react-toastify/dist/ReactToastify.css";
import { grapeImage, sevenImage, watermelonImage } from "../public";

function randomNumberFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const probabilities = ["0.1", "0.5", "0.2", "1.5", "2.0", "3.0"];
const betValuesArray = [10, 15, 30, 50];

function CasinoSpinGame() {
  const grapeImageComponent = <Image src={grapeImage} className="gameItem" alt="" />;
  const watermelonImageComponent = <Image src={watermelonImage} className="gameItem" alt="" />;
  const sevenImageComponent = <Image src={sevenImage} className="gameItem" alt="" />;

  const defaultBoard = [
    [grapeImageComponent, watermelonImageComponent, sevenImageComponent],
    [grapeImageComponent, watermelonImageComponent, sevenImageComponent],
    [grapeImageComponent, watermelonImageComponent, sevenImageComponent],
    [grapeImageComponent, watermelonImageComponent, sevenImageComponent],
    [grapeImageComponent, watermelonImageComponent, sevenImageComponent],
  ];

  const [board, setBoard] = useState(defaultBoard);
  const [balance, setBalance] = useState(0);
  const [bet, setBet] = useState(10);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("black");
  const [disableStart, setDisableStart] = useState(false);

  const spinColumn = (column, seconds) => {
    // eslint-disable-next-line no-param-reassign
    column.style.animation = `spin ${seconds}s`;
    setTimeout(function addSpinAnimation() {
      // eslint-disable-next-line no-param-reassign
      column.style.animation = "";
    }, parseInt(`${seconds + 1}000`, 10));
  };

  const startGame = () => {
    if (balance <= 0) {
      const text = "Your balance is empty!";
      toast.error(text);
      return;
    }

    setDisableStart(true);

    const index = parseFloat(String(randomNumberFromInterval(0, probabilities.length - 1)));
    const probability = probabilities[index];
    const result = bet * probability;

    setBalance(balance - bet + result);

    const text = `x ${probability} | You win: ${result}`;
    setMessage(text);
    setMessageColor("green");

    const column1 = document.getElementById("column1");
    const column2 = document.getElementById("column2");
    const column3 = document.getElementById("column3");
    const column4 = document.getElementById("column4");
    const column5 = document.getElementById("column5");

    // const changeValue = height * 5;

    if (probability === "1.5") {
      spinColumn(column1, 1);
      spinColumn(column2, 2);
      spinColumn(column3, 3);
      spinColumn(column4, 4);
      spinColumn(column5, 5);
      setTimeout(() => setDisableStart(false), 1000);

      toast.success(text);
      setBoard([
        [grapeImageComponent, watermelonImageComponent, sevenImageComponent],
        [grapeImageComponent, grapeImageComponent, grapeImageComponent],
        [grapeImageComponent, watermelonImageComponent, sevenImageComponent],
        [grapeImageComponent, watermelonImageComponent, sevenImageComponent],
        [grapeImageComponent, watermelonImageComponent, sevenImageComponent],
      ]);
      return;
    }

    if (probability === "2.0") {
      spinColumn(column1, 1);
      spinColumn(column2, 2);
      spinColumn(column3, 3);
      spinColumn(column4, 4);
      spinColumn(column5, 5);
      setTimeout(() => setDisableStart(false), 1000);

      toast.success(text);
      setBoard([
        [grapeImageComponent, watermelonImageComponent, sevenImageComponent],
        [grapeImageComponent, watermelonImageComponent, sevenImageComponent],
        [grapeImageComponent, watermelonImageComponent, sevenImageComponent],
        [grapeImageComponent, watermelonImageComponent, grapeImageComponent],
        [watermelonImageComponent, watermelonImageComponent, watermelonImageComponent],
      ]);
      return;
    }

    if (probability === "3.0") {
      spinColumn(column1, 1);
      spinColumn(column2, 2);
      spinColumn(column3, 3);
      spinColumn(column4, 4);
      spinColumn(column5, 5);
      setTimeout(() => setDisableStart(false), 1000);

      toast.success(text);
      setBoard([
        [watermelonImageComponent, sevenImageComponent, sevenImageComponent],
        [sevenImageComponent, sevenImageComponent, sevenImageComponent],
        [grapeImageComponent, watermelonImageComponent, sevenImageComponent],
        [watermelonImageComponent, sevenImageComponent, sevenImageComponent],
        [grapeImageComponent, watermelonImageComponent, grapeImageComponent],
      ]);
      return;
    }

    setMessageColor("blue");
    setMessage(`Return: ${result}`);
    toast.info(`Return: ${result}`);

    spinColumn(column1, 1);
    spinColumn(column2, 2);
    spinColumn(column3, 3);
    spinColumn(column4, 4);
    spinColumn(column5, 5);
    setTimeout(() => setDisableStart(false), 1000);

    setBoard([
      [watermelonImageComponent, sevenImageComponent, sevenImageComponent],
      [sevenImageComponent, grapeImageComponent, sevenImageComponent],
      [grapeImageComponent, watermelonImageComponent, sevenImageComponent],
      [sevenImageComponent, grapeImageComponent, sevenImageComponent],
      [grapeImageComponent, watermelonImageComponent, sevenImageComponent],
    ]);

    // const gameBox = document.querySelector(".gameBox");
    // const height = gameBox.clientHeight;
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
      <div
        style={{
          display: "flex",
          // marginTop: "10px",
          height: "50%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box
          key="balance"
          className="container"
          style={{
            margin: "5px",
            padding: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "30%",
            borderRadius: "15px",
            flexDirection: "column",
          }}
        >
          <div>Game balance: {balance}</div>
          <div style={{ display: "flex", margin: "5px" }}>
            <Button
              onClick={() => {
                setBalance(balance + 500);
              }}
            >
              <MonetizationOn />
            </Button>
            <Button
              onClick={() => {
                setBalance(balance - 500);
              }}
            >
              <CurrencyExchange />
            </Button>
          </div>
        </Box>
        <Box
          className="container"
          style={{
            margin: "5px",
            padding: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "30%",
            borderRadius: "15px",
          }}
        >
          <div style={{ margin: "5px" }}>
            Last result: <div style={{ color: messageColor }}>{message}</div>
          </div>
        </Box>
        <Box
          className="container"
          style={{
            margin: "5px",
            padding: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "30%",
            borderRadius: "15px",
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
            <InputLabel shrink htmlFor="select-multiple-native">
              Your bet
            </InputLabel>
            <Select
              value={bet}
              onChange={(e) => {
                setBet(e.target.value);
              }}
              label="Your bet"
              defaultValue={10}
              variant="standard"
            >
              {betValuesArray.map((betValue) => (
                <MenuItem
                  key={betValue}
                  value={betValue}
                  style={
                    betValue === bet
                      ? {
                          textDecoration: "none",
                          border: "0.0px solid grey",
                          borderRadius: "15px",
                          filter: "blur(0.3px)",
                          boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px",
                          backgroundColor: "#e62739",
                          opacity: "0.7",
                          color: "white",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }
                      : { display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "15px" }
                  }
                >
                  {betValue}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>

      <div className="gameBox" style={{ width: "100%", height: "100%" }}>
        {board.map((column, index) => (
          <div className="gameColumn" id={`column${index + 1}`}>
            {column.map((el) => el)}
          </div>
        ))}
      </div>

      {!disableStart && (
        <Button size="large" onClick={startGame}>
          <CasinoIcon fontSize="large" />
        </Button>
      )}
    </Box>
  );
}

export default CasinoSpinGame;

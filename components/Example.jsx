import React from "react";
import Spinner from "./Spinner";

function RepeatButton(props) {
  return <button aria-label="Play again." id="repeatButton" onClick={props.onClick} />;
}

function WinningSound() {
  return (
    <audio autoPlay="autoplay" className="player" preload="false">
      <source src="https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav" />
    </audio>
  );
}

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
    };
    this.finishHandler = this.finishHandler.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ winner: null });
    this.emptyArray();
    this._child1.forceUpdateHandler();
    this._child2.forceUpdateHandler();
    this._child3.forceUpdateHandler();
    this._child4.forceUpdateHandler();
    this._child5.forceUpdateHandler();
  }

  static loser = [
    "Not quite",
    "Stop gambling",
    "Hey, you lost!",
    "Ouch! I felt that",
    "Don't beat yourself up",
    "There goes the college fund",
    "I have a cat. You have a loss",
    "You're awesome at losing",
    "Coding is hard",
    "Don't hate the coder",
  ];

  static matches = [];

  finishHandler(value) {
    Example.matches.push(value);

    if (Example.matches.length === 3) {
      const { winner } = this.state;
      const first = Example.matches[0];
      const results = Example.matches.every((match) => match === first);
      this.setState({ winner: results });
    }
  }

  emptyArray() {
    Example.matches = [];
  }

  render() {
    const { winner } = this.state;
    const getLoser = () => {
      return Example.loser[Math.floor(Math.random() * Example.loser.length)];
    };
    let repeatButton = null;
    let winningSound = null;

    if (winner !== null) {
      repeatButton = <RepeatButton onClick={this.handleClick} />;
    }

    if (winner) {
      winningSound = <WinningSound />;
    }

    return (
      <div>
        {winningSound}
        <h1 style={{ color: "white", margin: "20px", position: "fixed", top: "0px", left: "0px" }}>
          <span>{winner === null ? "Waiting…" : winner ? "🤑 Pure skill! 🤑" : getLoser()}</span>
        </h1>

        <div className="spinner-container">
          <Spinner
            onFinish={this.finishHandler}
            ref={(child) => {
              this._child1 = child;
            }}
            timer="1000"
          />
          <Spinner
            onFinish={this.finishHandler}
            ref={(child) => {
              this._child2 = child;
            }}
            timer="1400"
          />
          <Spinner
            onFinish={this.finishHandler}
            ref={(child) => {
              this._child3 = child;
            }}
            timer="2200"
          />
          <Spinner
            onFinish={this.finishHandler}
            ref={(child) => {
              this._child4 = child;
            }}
            timer="2800"
          />
          <Spinner
            onFinish={this.finishHandler}
            ref={(child) => {
              this._child5 = child;
            }}
            timer="3200"
          />

          <div className="gradient-fade" />
        </div>

        {repeatButton}
      </div>
    );
  }
}

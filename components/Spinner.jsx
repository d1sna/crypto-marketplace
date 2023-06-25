import React, { useEffect, useState } from "react";

// export default function Spinner({ timer, onFinish }) {
//   const [position, setPosition] = useState(0);
//   // const [timer, setTimer] = useState(null);
//   const [timeRemaining, setTimeRemaining] = useState(null);
//   const [start, setStart] = useState(Math.floor(Math.random() * 15) * Spinner.iconHeight * -1);

//   const multiplier = 5;
//   const iconHeight = 188;
//   const speed = iconHeight * multiplier;

//   function getSymbolFromPosition() {
//     const totalSymbols = 15;
//     const maxPosition = Spinner.iconHeight * (totalSymbols - 1) * -1;
//     const moved = (timer / 100) * multiplier;
//     const startPosition = start;
//     let currentPosition = startPosition;

//     for (let i = 0; i < moved; i++) {
//       currentPosition -= Spinner.iconHeight;

//       if (currentPosition < maxPosition) {
//         currentPosition = 0;
//       }
//     }

//     onFinish(currentPosition);
//   }

//   function reset() {
//     if (timer) {
//       clearInterval(timer);
//     }

//     setStart(Math.floor(Math.random() * 15) * Spinner.iconHeight * -1);

//     setPosition(start);
//     setTimeRemaining(timer);

//     setTimer(
//       setInterval(() => {
//         if (timeRemaining <= 0) {
//           clearInterval(timer);
//           getSymbolFromPosition();
//         } else {
//           setPosition(position - speed);
//           setTimeRemaining(timeRemaining - 100);
//         }
//       }, 100)
//     );
//   }

//   useEffect(() => {
//     clearInterval(timer);

//     setPosition(start);
//     setTimeRemaining(timer);

//     // this.timer = setInterval(() => {
//     //   this.tick();
//     // }, 100);
//   }, []);

//   return <div style={{ backgroundPosition: `0px ${position}px` }} className="icons" />;
// }

export default class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

  forceUpdateHandler() {
    this.reset();
  }

  reset() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.start = this.setStartPosition();

    this.setState({
      position: this.start,
      timeRemaining: this.props.timer,
    });

    this.timer = setInterval(() => {
      this.tick();
    }, 100);
  }

  state = {
    position: 0,
    lastPosition: null,
  };

  multiplier = Math.floor(Math.random() * 5 + 1);

  static iconHeight = 188;

  start = this.setStartPosition();

  speed = Spinner.iconHeight * this.multiplier;

  setStartPosition() {
    return Math.floor(Math.random() * 15) * Spinner.iconHeight * -1;
  }

  moveBackground() {
    this.setState({
      position: this.state.position - this.speed,
      timeRemaining: this.state.timeRemaining - 100,
    });
  }

  getSymbolFromPosition() {
    const totalSymbols = 15;
    const maxPosition = Spinner.iconHeight * (totalSymbols - 1) * -1;
    const moved = (this.props.timer / 100) * this.multiplier;
    const startPosition = this.start;
    let currentPosition = startPosition;

    for (let i = 0; i < moved; i++) {
      currentPosition -= Spinner.iconHeight;

      if (currentPosition < maxPosition) {
        currentPosition = 0;
      }
    }

    this.props.onFinish(currentPosition);
  }

  tick() {
    if (this.state.timeRemaining <= 0) {
      clearInterval(this.timer);
      this.getSymbolFromPosition();
    } else {
      this.moveBackground();
    }
  }

  componentDidMount() {
    clearInterval(this.timer);

    this.setState({
      position: this.start,
      timeRemaining: this.props.timer,
    });

    this.timer = setInterval(() => {
      this.tick();
    }, 100);
  }

  render() {
    const { position } = this.state;

    return <div style={{ backgroundPosition: `0px ${position}px` }} className="icons" />;
  }
}

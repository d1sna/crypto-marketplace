import { useEffect, useRef, useState } from "react";
import WithConnectedWallet from "../components/SystemInterface/WithConnectedWallet";
import Image from "next/image";
import { gameBackground, spinnerIcon } from "../public";

const gravity = 0.01;

class Sprite {
  constructor(position, ctx, image) {
    this.position = position;
    this.ctx = ctx;
    this.image = image;
  }

  draw() {
    this.ctx.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
  }
}

class Player {
  constructor(x, y, ctx, color) {
    this.position = { x, y };
    this.ctx = ctx;
    this.weight = 50;
    this.height = 100;
    this.velocity = { x: 0, y: 0 };
    this.color = color;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.weight,
      this.height
    );
  }

  update() {
    this.draw();

    if (
      this.position.x + this.velocity.x >= this.ctx.canvas.clientWidth ||
      this.position.x + this.velocity.x < 0
    ) {
      this.velocity.x = 0;
    }

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.x > 10) this.position.x -= 0.3;

    if (
      this.position.y + this.height + this.velocity.y <
      this.ctx.canvas.clientHeight
    ) {
      this.velocity.y += gravity;
    } else this.velocity.y = 0;
  }
}

// class Spinner {
//   height = 150;
//   weight = 150;
//   started = false;

//   constructor(ctx, position, icon) {
//     this.ctx = ctx;
//     this.position = position;
//     this.velocity = { x: 0, y: 1 };
//     this.startedPosition = { ...position };
//     this.icon = icon;
//   }

//   draw() {
//     this.ctx.drawImage(this.icon, this.position.x, this.position.y);
//   }

//   update() {
//     this.draw();

//     if (
//       this.position.y + this.height + this.velocity.y >
//       this.ctx.canvas.height
//     ) {
//       this.position.y = this.position.y + this.height - this.ctx.canvas.height;
//     }

//     if (this.started) {
//       this.position.y += this.velocity.y;
//       return;
//     }

//     if (this.position.y !== this.startedPosition.y) {
//       this.position.y += this.velocity.y;
//     }
//   }

//   run() {
//     this.velocity.y = 1;
//     this.started = !this.started;
//   }
// }

function Play() {
  const canvasRef = useRef();
  const backgroundRef = useRef();
  const spinnerIconRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const spinnerIcon = spinnerIconRef.current;
    const ctx = canvas.getContext("2d");
    const player = new Player(10, 0, ctx, "red");
    const keys = {};

    const background = new Sprite({ x: 0, y: 0 }, ctx, backgroundRef.current);
    // const spinner = new Spinner(ctx, { x: 0, y: 0 }, spinnerIcon);

    // const game = new Game(ctx, spinnerIcon);
    // console.log({ ctx });
    // console.log({ keys });

    const animate = () => {
      window.requestAnimationFrame(animate);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

      if (keys[" "]) {
        player.position.y -= 10;
        player.position.x += 3;
      }

      background.update();
      player.update();
      // spinner.update();
    };

    animate();

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    window.addEventListener("keydown", (e) => (keys[e.key] = true));
    window.addEventListener("keyup", (e) => (keys[e.key] = false));

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [canvasRef, backgroundRef, spinnerIconRef]);

  return (
    <div className="flex items-center justify-center">
      <Image
        alt="background"
        className="hidden"
        ref={backgroundRef}
        src={gameBackground}
      />
      <Image
        alt="spinner_icon"
        className="hidden"
        ref={spinnerIconRef}
        src={spinnerIcon}
      />
      <canvas className="w-full h-3/3" ref={canvasRef} />
    </div>
  );
}

export default WithConnectedWallet(Play);

import { wcDefine } from "@app/core";

const settings = {
  x: 0,
  y: 0,
  hue: 255,
  hueDropoff: 5,
  baseOpacity: 1,
  rings: 1,
  waveSize: 8,
  speed: 3,
  initialRipplePool: 10,
  throttleDelay: 34,
  falloffRate: 0.015,
  falloffModificationFactor: 1.0000001,
};

class Ripple {
  x = settings.x;
  y = settings.y;
  hue = settings.hue;
  hueDropoff = settings.hueDropoff;
  baseOpacity = settings.baseOpacity;
  rings = settings.rings;
  waveSize = settings.waveSize;
  speed = settings.speed;
  falloffRate = settings.falloffRate;
  falloffModificationFactor = settings.falloffModificationFactor;

  constructor(context) {
    this.context = context;
  }

  /**
   * @public
   * @memberof Ripple
   * @description Starts the ripple animation.
   */
  initialize(x, y, startingHue) {
    // Reset base settings
    this.baseOpacity = settings.baseOpacity;
    this.rings = settings.rings;
    this.falloffModificationFactor = settings.falloffModificationFactor;

    // set new input
    this.x = x;
    this.y = y;
    this.hue = startingHue;
  }

  /**
   * @public
   * @memberof Ripple
   * @description Creates rings
   */
  createRings() {
    this.rings += this.speed;
    const ringOpacities = [];

    for (let radius = 0; radius < this.rings; radius++) {
      ringOpacities[radius] = (0.8 * Math.sin(radius / this.waveSize) + 1) / 2;
    }
    ringOpacities.reverse();

    for (let radius = 0; radius < this.rings; radius++) {
      const sin = ringOpacities[radius];

      const radiusFalloff = 1 - (radius * this.falloffRate) / 5;

      this.#drawRing({
        radius,
        opacity: sin * this.baseOpacity * radiusFalloff,
      });
    }
    this.hue -= this.hueDropoff;
    this.baseOpacity -= this.falloffRate * this.falloffModificationFactor;
    this.falloffModificationFactor *= this.falloffModificationFactor;
  }

  #drawRing({ radius, opacity }) {
    const style = `hsla(${this.hue}deg, 100%, 95%, ${opacity})`;

    this.context.beginPath();
    this.context.arc(this.x, this.y, radius, 0, Math.PI * 2);
    this.context.strokeStyle = style;
    this.context.stroke();
    this.context.closePath();
  }
}

wcDefine(
  "color-wave",
  class extends HTMLElement {
    startingHue = 255;

    /**
     * canvas is a HTMLCanvasElement
     * @type {Ripple[]}
     * @public
     */
    activeRipples = [];

    /**
     * canvas is a HTMLCanvasElement
     * @type {Ripple[]}
     * @public
     */
    unusedRipples = [];

    lastRippleTime = 0;

    /**
     * @type {HTMLCanvasElement}
     * @public
     */
    canvas;

    /**
     * @type {CanvasRenderingContext2D}
     * @public
     */
    context;

    initialized = false;

    init() {
      if (this.initialized) return;

      this.innerHTML = "<canvas></canvas>";

      const canvas = this.querySelector("canvas");

      if (canvas) {
        this.canvas = canvas;
      }

      this.appendChild(this.canvas);

      const ctx = this.canvas.getContext("2d");

      if (ctx) {
        this.context = ctx;
      }

      this.initialized = true;
    }

    createRipple(x, y) {
      this.startingHue -= 1;
      const ripple = this.getUnusedRipple();
      ripple.initialize(x, y, this.startingHue);
      this.activeRipples.push(ripple);
    }

    throttleCreateRipple = (x, y, throttleDelay) => {
      const currentTime = new Date().getTime();
      if (currentTime - this.lastRippleTime >= throttleDelay) {
        this.createRipple(x, y);
        this.lastRippleTime = currentTime;
      }
    };

    updateCanvas() {
      requestAnimationFrame(() => this.updateCanvas());

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const newRipples = [];
      for (const ripple of this.activeRipples) {
        if (ripple.baseOpacity <= 0) {
          // Reuse the Ripple object instead of removing it
          this.unusedRipples.push(ripple);
        } else {
          newRipples.push(ripple);
          ripple.createRings();
        }
      }
      this.activeRipples = newRipples;
    }

    /**
     * @public
     * @returns {Ripple}
     */
    getUnusedRipple() {
      return this.unusedRipples.pop() || new Ripple(this.context);
    }

    connectedCallback() {
      this.init();
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.canvas.style.background = "white";

      document.onmousemove = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const delayMultiplier =
          this.activeRipples.length / settings.initialRipplePool;

        return this.throttleCreateRipple(
          x,
          y,
          settings.throttleDelay * delayMultiplier
        );
      };

      for (let i = 0; i < settings.initialRipplePool; i++) {
        this.unusedRipples.push(new Ripple(this.context));
      }

      this.updateCanvas();
    }
  }
);

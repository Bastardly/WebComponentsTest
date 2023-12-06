import { wcDefine } from '@app/core/wcshadow';

interface IDrawRing {
	radius: number;
	opacity: number;
}

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
}

class Ripple {
	x: number = settings.x;
	y: number = settings.y;
	hue: number = settings.hue;
	hueDropoff: number = settings.hueDropoff;
	baseOpacity: number = settings.baseOpacity;
	rings: number = settings.rings;
	waveSize: number = settings.waveSize;
	speed: number = settings.speed;
	falloffRate: number = settings.falloffRate;
	falloffModificationFactor: number = settings.falloffModificationFactor;

	constructor(public context: CanvasRenderingContext2D) { }

	initialize(x: number, y: number, startingHue: number) {
		// Reset base settings
		this.baseOpacity = settings.baseOpacity;
		this.rings = settings.rings;
		this.falloffModificationFactor = settings.falloffModificationFactor;

		// set new input
		this.x = x;
		this.y = y;
		this.hue = startingHue;
	}

	createRings() {
		this.rings += this.speed;
		const ringOpacities: number[] = [];

		for (let radius = 0; radius < this.rings; radius++) {
			ringOpacities[radius] = (0.8 * Math.sin(radius / this.waveSize) + 1) / 2;
		}
		ringOpacities.reverse();

		for (let radius = 0; radius < this.rings; radius++) {
			const sin = ringOpacities[radius];

			const radiusFalloff = 1 - (radius * this.falloffRate / 5);

			this.#drawRing({
				radius,
				opacity: sin * this.baseOpacity * radiusFalloff,
			});
		}
		this.hue -= this.hueDropoff;
		this.baseOpacity -= this.falloffRate * this.falloffModificationFactor;
		this.falloffModificationFactor *= this.falloffModificationFactor
	}

	#drawRing({ radius, opacity }: IDrawRing) {
		const style = `hsla(${this.hue}deg, 100%, 95%, ${opacity})`;

		this.context.beginPath();
		this.context.arc(this.x, this.y, radius, 0, Math.PI * 2);
		this.context.strokeStyle = style;
		this.context.stroke();
		this.context.closePath();
	}
}


wcDefine('color-wave', class extends HTMLElement {
	startingHue: number = 255;
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
	activeRipples: Ripple[] = [];
	unusedRipples: Ripple[] = [];
	lastRippleTime: number = 0;

	createRipple(x: number, y: number) {
		this.startingHue -= 1;
		const ripple = this.getUnusedRipple();
		ripple.initialize(x, y, this.startingHue);
		this.activeRipples.push(ripple);
	}

	throttleCreateRipple = (x: number, y: number, throttleDelay: number) => {
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
				ripple.createRings()
			}
		}
		this.activeRipples = newRipples;
	}

	getUnusedRipple(): Ripple {
		if (this.unusedRipples.length > 0) {
			return this.unusedRipples.pop()!;
		}
		return new Ripple(this.context);

	}

	connectedCallback() {
		this.innerHTML = '<canvas id="waveCanvas"></canvas>';

		this.canvas = document.getElementById("waveCanvas") as HTMLCanvasElement;
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.canvas.style.background = "white";
		this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;

		document.onmousemove = (e) => {
			const x = e.clientX;
			const y = e.clientY;
			const delayMultiplier = this.activeRipples.length / settings.initialRipplePool;

			return this.throttleCreateRipple(x, y, settings.throttleDelay * delayMultiplier);
		}

		for (let i = 0; i < settings.initialRipplePool; i++) {
			this.unusedRipples.push(new Ripple(this.context));
		}

		this.updateCanvas();
	}
})


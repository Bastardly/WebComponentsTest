import { IObserver, Observable } from '@app/core/observable';

export interface ITile {
	index: number;
	active: boolean;
	activated: boolean;
	activatedSecond: boolean;
	activateFinished: boolean;
}

export interface IState {
	tiles: ITile[];
	tileMap: {
		x: number;
		y: number;
		tileSize: number;
		tileSizePx: string;
		styleGridTemplateColumns: string;
		initTimeStamp: number;
		initialActiveValue: boolean;
	},
	helper: {
		isActive: boolean,
		helpers: Record<string, string>;
	}
}

const initialState: IState = {
	tiles: [] as ITile[],
	tileMap: {
		x: 0,
		y: 0,
		tileSize: 0,
		tileSizePx: '',
		styleGridTemplateColumns: '1fr',
		initTimeStamp: 0,
		initialActiveValue: false,
	},
	helper: {
		isActive: false,
		helpers: {
			tester: "This is Conway's game of life. Draw on map and start game.",
			tester2: `Any live cell with fewer than two live neighbours dies, as if by underpopulation.\n
			Any live cell with two or three live neighbours lives on to the next generation.\n
			Any live cell with more than three live neighbours dies, as if by overpopulation.\n
			Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
			`
		},
	}
}


export class StoreObservable extends Observable<IState> {
	constructor() {
		super();
		this.state = initialState;
	}
}

type ServiceConstructor<T> = new (store: StoreObservable) => T;

export type StoreObserver = IObserver<IState>;
export const store = new StoreObservable();
export function register<T>(Service: ServiceConstructor<T>): T {
	return new Service(store);
}


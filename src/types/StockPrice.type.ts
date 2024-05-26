export class StockPrice {
	date: Date;
	open: number;
	high: number;
	low: number;
	close: number;

	constructor(date: Date, open: number, high: number, low: number, close: number) {
		this.date = date;
		this.open = open;
		this.high = high;
		this.low = low;
		this.close = close;
	}
}
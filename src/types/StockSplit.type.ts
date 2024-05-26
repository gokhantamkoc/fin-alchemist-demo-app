// StockSplit Event [targetSplit]:[amountToSplit]
// ex: 3:1
// Each 1 stock will be split into 3
export class StockSplit {
	date: Date;
	numerator: number;
	denominator: number;

	constructor(date: Date, numerator: number, denominator: number) {
		this.date = date;
		this.numerator = numerator;
		this.denominator = denominator;
	}
}
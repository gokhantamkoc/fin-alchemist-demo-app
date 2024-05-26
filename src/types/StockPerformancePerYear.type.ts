export class StockPerformancePerYear {
	year: number;
	sharesAmountBoughtWithInvestment: number;
	dividendIncome: number;
	sharesAcquiredBySplit: number;
	sharesAmountBoughtWithDividend: number;

	constructor(
		year: number,
		sharesAmountBoughtWithInvestment: number,
		dividendIncome: number,
		sharesAcquiredBySplit: number,
		sharesAmountBoughtWithDividend: number
	) {
		this.year = year;
		this.sharesAmountBoughtWithInvestment = sharesAmountBoughtWithInvestment;
		this.dividendIncome = dividendIncome;
		this.sharesAcquiredBySplit = sharesAcquiredBySplit;
		this.sharesAmountBoughtWithDividend = sharesAmountBoughtWithDividend;
	}
}
import { StockPerformancePerYear } from "./StockPerformancePerYear.type";

export class StockPerformance {
	totalInvestedCapital: number;
	totalSharesBoughtWithInvestment: number;
	totalDividendIncome: number;
	stockPerformancePerYear: StockPerformancePerYear[];
	totalWealth: number;
	multiplierResult: number;

	constructor(
		totalInvestedCapital: number,
		totalSharesBoughtWithInvestment: number,
		totalDividendIncome: number,
		stockPerformancePerYear: StockPerformancePerYear[],
		totalWealth: number,
		multiplierResult: number
	) {
		this.totalInvestedCapital = totalInvestedCapital;
		this.totalSharesBoughtWithInvestment = totalSharesBoughtWithInvestment;
		this.totalDividendIncome = totalDividendIncome;
		this.stockPerformancePerYear = stockPerformancePerYear;
		this.totalWealth = totalWealth;
		this.multiplierResult = multiplierResult;
	}
}
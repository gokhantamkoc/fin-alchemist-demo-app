import { StockDividend } from "../types/StockDividend.type";
import { StockPerformance } from "../types/StockPerformance.type";
import { StockPerformancePerYear } from "../types/StockPerformancePerYear.type";
import { StockPrice } from "../types/StockPrice.type";
import { StockSplit } from "../types/StockSplit.type";

import * as AMZN_DATA from "./AMZN.data.json";
import * as AAPL_DATA from "./AAPL.data.json";

export class StockPerformanceService {

	private amznData = AMZN_DATA;
	private applData = AAPL_DATA;

	private stockSymbol: string;

	private capitalPerYear: number = 1000.00;

	constructor(stockSymbol: string) {
		this.stockSymbol = stockSymbol;
	}

	public extractStockPrices = (stockInfo: any): StockPrice[] => { // eslint-disable-line @typescript-eslint/no-explicit-any
		const timestamps: number[] = stockInfo.timestamp;
		const prices: any[] = stockInfo.indicators.quote; // eslint-disable-line @typescript-eslint/no-explicit-any

		return prices[0].close.map(
			(item: any, idx: number) => { // eslint-disable-line @typescript-eslint/no-explicit-any
				return {
					date: new Date(timestamps[idx] * 1000),
					open: item,
					high: prices[0].high[idx],
					low: prices[0].low[idx],
					close: prices[0].close[idx],
				};
			}
		);
	}

	public extractStockDividends = (stockInfo: any): StockDividend[] => { // eslint-disable-line @typescript-eslint/no-explicit-any
		if (!stockInfo.events) return [];
		const dividendEvents = stockInfo.events.dividends;
		const stockDividends: StockDividend[] = [];
		for (const field in dividendEvents) {
			stockDividends.push({
				date: new Date(dividendEvents[field].date * 1000),
				amount: dividendEvents[field].amount,
			});
		}
		return stockDividends;
	}

	public extractStockSplits = (stockInfo: any): StockSplit[] => { // eslint-disable-line @typescript-eslint/no-explicit-any
		if (!stockInfo.events) return [];
		const splitEvents = stockInfo.events.splits;
		const stockSplits: StockSplit[] = [];
		for (const field in splitEvents) {
			stockSplits.push({
				date: new Date(splitEvents[field].date * 1000),
				numerator: splitEvents[field].numerator,
				denominator: splitEvents[field].denominator,
			});
		}

		return stockSplits;
	}

	private getBeginningOfYearMap = (stockPrices: StockPrice[]): Map<number, Date> => {
		const beginningOfYear = new Map<number, Date>();

		for (const price of stockPrices) {
			const year = price.date.getFullYear();
			if (!beginningOfYear.has(year)) {
				beginningOfYear.set(year, price.date);
			}
		}

		return beginningOfYear;
	}

	private calculateSharesBySplit = (
		sharesAmount: number,
		numerator: number,
		denominator: number
	): number => {
		return Math.floor((sharesAmount / denominator) * numerator) - sharesAmount;
	}

	private calculateSharesBoughtWithDividendIncome = (
		dividendIncome: number,
		priceAfterDividendDate: number
	): number => {
		return Math.floor(dividendIncome / priceAfterDividendDate);
	}

	private getPrice = (date: Date, stockPrices: StockPrice[]): number => {
		for (const stockPrice of stockPrices) {
			if (stockPrice.date.getTime() === date.getTime()) {
				return stockPrice.close;
			}
		}
		return 0.0;
	}

	public calculateStockPerformance(
		capitalPerYear: number,
		stockPrices: StockPrice[],
		stockDividends: StockDividend[],
		stockSplits: StockSplit[]
	): StockPerformance {
		const beginningOfYear = this.getBeginningOfYearMap(stockPrices);
		const events = [
			...stockDividends.map((dividend) => {
				return {
					...dividend,
					type: "D"
				}
			}),
			...stockSplits.map((split) => {
				return {
					...split,
					type: "S"
				}
			})
		];
		events.sort((a, b) => a.date.getTime() - b.date.getTime());
		const lastYear = new Date().getFullYear() - 1;

		let accumulatedShares: number = 0;
		let totalInvestedCapital: number = 0;

		const stockPerformancePerYear: StockPerformancePerYear[] = [];

		for (let i = 4; i >= 0; i--) {
			totalInvestedCapital += capitalPerYear;
			const currentYear = lastYear - i;
			const beginDate: Date = beginningOfYear.get(currentYear)!;

			if (!beginDate) continue;

			const beginningPrice: number = this.getPrice(beginDate, stockPrices);
			const sharesBoughtByInvestment = capitalPerYear / beginningPrice;

			accumulatedShares += sharesBoughtByInvestment;

			let sharesAcquiredBySplit = 0;
			let sharesBoughtWithDividend = 0;

			let dividendIncome = 0;

			for (const event of events) {
				if (event.date.getFullYear() === currentYear) {
					if (event.type === "S") {
						sharesAcquiredBySplit += this.calculateSharesBySplit(
							accumulatedShares,
							(event as StockSplit).numerator,
							(event as StockSplit).denominator
						);
						accumulatedShares += sharesAcquiredBySplit;
					} else {
						const evtDividendIncome = (accumulatedShares * (event as StockDividend).amount);
						dividendIncome += evtDividendIncome;
						sharesBoughtWithDividend += this.calculateSharesBoughtWithDividendIncome(
							evtDividendIncome,
							beginningPrice
						);
						accumulatedShares += sharesBoughtWithDividend;
					}
				}
			}

			stockPerformancePerYear.push(
				new StockPerformancePerYear(
					currentYear,
					sharesBoughtByInvestment,
					dividendIncome,
					sharesAcquiredBySplit,
					sharesBoughtWithDividend
				)
			);
		}

		let totalSharesBoughtWithInvestment: number = 0;
		let totalDividendIncome: number = 0;

		for (const stockPerformance of stockPerformancePerYear) {
			totalSharesBoughtWithInvestment += stockPerformance.sharesAmountBoughtWithInvestment;
			totalDividendIncome += stockPerformance.dividendIncome;
		}

		const lastPrice = stockPrices[stockPrices.length - 1];
		const totalWealth = accumulatedShares * lastPrice.close;

		return new StockPerformance(
			totalInvestedCapital,
			totalSharesBoughtWithInvestment,
			totalDividendIncome,
			stockPerformancePerYear,
			totalWealth,
			Number((totalWealth / totalInvestedCapital).toFixed(2))
		)
	}

	public analyze = async (): Promise<StockPerformance | undefined> => {
		try {
			const response = this.stockSymbol === 'AMZN' ? this.amznData : this.applData;

			const stockInfo = response.chart.result[0];

			const stockPrices: StockPrice[] = this.extractStockPrices(stockInfo);
			const stockDividends: StockDividend[] = this.extractStockDividends(stockInfo);
			const stockSplits: StockSplit[] = this.extractStockSplits(stockInfo);


			return this.calculateStockPerformance(
				this.capitalPerYear,
				stockPrices,
				stockDividends,
				stockSplits
			);
		} catch (error) {
			console.error("Error fetching stock prices:", error);
			return undefined;
		}
	}
}
import { Divider, Loader, Table, TableBody, TableCell, TableHead, TableRow, Text } from "@aws-amplify/ui-react";
import { StockPerformanceService } from "../../service/StockPerformance.service";
import { useEffect, useState } from "react";
import { StockPerformance } from "../../types/StockPerformance.type";

interface StockAnalysisProps {
	symbol: string
}

const StockAnalysis = ({ symbol }: StockAnalysisProps) => {

	const [analysisLoading, setAnalysisLoading] = useState<boolean>(true);
	const [analysisResult, setAnalysisResult] = useState<StockPerformance | null>(null);

	const [errorMessageVisible, setErrorMessageVisible] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const analyzeStock = async () => {
		setAnalysisLoading(true);
		setErrorMessageVisible(false);
		const stockAnalyzer = new StockPerformanceService(symbol);
		const result = await stockAnalyzer.analyze();
		if (!result) {
			setAnalysisLoading(false);
			setErrorMessage('error: could not load analysis!');
			setErrorMessageVisible(true);
			return;
		}
		setAnalysisResult(result);
		setAnalysisLoading(false);
		setErrorMessageVisible(false);
	}

	useEffect(() => {
		analyzeStock();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div>
			{
				analysisLoading ? <Loader variation="linear" /> : (
					<div>
						<Text variation="tertiary">
							<strong>Stock:</strong> {symbol}
						</Text>
						{
							errorMessageVisible ? <Text variation="error">
								{errorMessage}
							</Text> : (
								<div>
									<Table
										size="small"
										highlightOnHover={true}
										borderWidth={5}
										variation="bordered">
										<TableHead>

										</TableHead>
										<TableBody>
											<TableRow>
												<TableCell textAlign="center" colSpan={2}>
													Stock Overall Performance
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													Total Investment
												</TableCell>
												<TableCell>
													{analysisResult!.totalInvestedCapital.toFixed(2)} $
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													Total Wealth
												</TableCell>
												<TableCell>
													{analysisResult!.totalWealth.toFixed(2)} $
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
									<Divider />
									<Table
										size="small"
										highlightOnHover={true}
										borderWidth={5}
										variation="bordered">
										<TableHead>
											<TableRow>
												<TableCell as="th" textAlign="center" colSpan={5}>
													Stock Performance per Year
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell as="th">
													Year
												</TableCell>
												<TableCell as="th">
													Dividend Income
												</TableCell>
												<TableCell as="th">
													Shares Acq. After Split
												</TableCell>
												<TableCell as="th">
													Shares Acq. From Dividend
												</TableCell>
												<TableCell as="th">
													Total Acq. Shares
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{
												analysisResult?.stockPerformancePerYear.map((sppyItem) => {
													return (
														<TableRow>
															<TableCell>
																{sppyItem.year}
															</TableCell>
															<TableCell>
																{sppyItem.dividendIncome.toFixed(2)} $
															</TableCell>
															<TableCell>
																{sppyItem.sharesAcquiredBySplit.toFixed(0)}
															</TableCell>
															<TableCell>
																{sppyItem.sharesAmountBoughtWithDividend.toFixed(0)}
															</TableCell>
															<TableCell>
																{(sppyItem.sharesAmountBoughtWithDividend + sppyItem.sharesAmountBoughtWithInvestment).toFixed(0)}
															</TableCell>
														</TableRow>
													);
												})
											}
										</TableBody>
									</Table>
								</div>
							)
						}
					</div>
				)
			}
		</div>
	);
}

export default StockAnalysis;

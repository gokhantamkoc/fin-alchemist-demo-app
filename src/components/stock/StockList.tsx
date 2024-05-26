import { useEffect, useState } from "react";
import { V6Client } from '@aws-amplify/api-graphql';

import {
	Button,
	Flex,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@aws-amplify/ui-react';

import type { Schema } from "../../../amplify/data/resource";
import AddStockPopup from "./AddStockPopup";
import AlertPopup from "../alertpopup/AlertPopup";
import { AuthUser } from "aws-amplify/auth";

interface StockListProps {
	authUser: AuthUser;
	client: V6Client<Schema>;
}

const StockList = ({ authUser, client }: StockListProps) => {
	const [stockPerformances, setStockPerformances] = useState<Array<Schema["StockPerformance"]["type"]>>([]);
	const [addStockPopupOpen, setAddStockPopupOpen] = useState<boolean>(false);
	const [alertPopupOpen, setAlertPopupOpen] = useState<boolean>(false);
	const [alertMessage, setAlertMessage] = useState<string>('');

	useEffect(() => {
		client.models.StockPerformance.observeQuery().subscribe({
			next: (data) => setStockPerformances([...data.items]),
		});
	});

	const addStock = (username: string, stockSymbol: string, isActive: boolean) => {
		client.models.StockPerformance.create({
			username: username,
			stockSymbol: stockSymbol,
			isActive: isActive
		});
	}

	const deleteStock = (stockPerformance: Schema["StockPerformance"]["type"]) => {
		client.models.StockPerformance.delete(stockPerformance);
	}

	const openAddStockPopup = () => {
		if (stockPerformances.length >= 2) {
			setAlertPopupOpen(true);
			setAlertMessage("Sorry, but you cannot add more than 2 stocks to your virtual portfolio");
			return;
		}
		setAddStockPopupOpen(true);
	}

	const closeAddStockPopup = () => {
		setAddStockPopupOpen(false);
	}

	return (
		<div style={{ height: "100vh" }}>
			<div>
				{
					addStockPopupOpen &&
					<AddStockPopup
						addStock={addStock}
						handleClose={closeAddStockPopup}
						username={authUser.username} />
				}
			</div>
			<div>
				{
					alertPopupOpen &&
					<AlertPopup
						title="Stock Limit Exceeded"
						closeAlertPopup={() => setAlertPopupOpen(false)}
						message={alertMessage}
					/>
				}
			</div>
			<Flex direction="column">
				<Table 
					highlightOnHover={true}
					variation="bordered" 
					borderColor="white">
					<TableHead>
						<TableRow>
							<TableCell as="th">
								Stock Symbol
							</TableCell>
							<TableCell as="th">
								Is Active?
							</TableCell>
							<TableCell as="th">
								*
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{stockPerformances.map((sp, index) => {
							return (
								<TableRow key={index}>
									<TableCell>
										{sp.stockSymbol}
									</TableCell>
									<TableCell>
										{sp.isActive === true ? 'YES' : 'NO'}
									</TableCell>
									<TableCell>
										<Button onClick={() => deleteStock(sp)} colorTheme="error">
											X
										</Button>
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</Flex>
			<div>
				<Button onClick={() => openAddStockPopup()}>Add Stock</Button>
			</div>
		</div>
	);
}

export default StockList;

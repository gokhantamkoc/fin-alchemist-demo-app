import { useEffect, useState } from 'react';
import { V6Client } from '@aws-amplify/api-graphql';

import {
	Collection,
	Divider,
	Heading,
	Text
} from "@aws-amplify/ui-react";

import { Schema } from "../../../amplify/data/resource";
import StockAnalysis from '../stock/StockAnalysis';
import { AuthUser } from 'aws-amplify/auth';

interface HomeProps {
	authUser: AuthUser;
	client: V6Client<Schema>
}

const Home = ({authUser, client}: HomeProps) => {
	const [stockPerformances, setStockPerformances] = useState<Array<Schema["StockPerformance"]["type"]>>([]);

	useEffect(() => {
		client.models.StockPerformance.observeQuery().subscribe({
			next: (data) => setStockPerformances([...data.items]),
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div style={{height: "100vh"}}>
			<Text variation="tertiary">
				Hi {authUser.signInDetails!.loginId},
			</Text>

			<Text variation="tertiary">
				Fin Alhemist is a simple Virtual Portfolio Analyzer for Nasdaq Stocks.
				You can add NASDAQ stocks by entering their symbols from "Add Stock".
			</Text>

			<Text variation="tertiary">
				After adding stocks, Fin Alchemist will analyze the added NASDAQ stocks for the last five years.
			</Text>

			<Text variation="warning">
				<strong>WARNING: The max # of stocks that can be added is 2.</strong>
			</Text>
			<Text variation="warning">
				<strong>WARNING: It is not a financial advice. Please do your own research.</strong>
			</Text>
			<Divider/>
			<Heading level={4}>
				Your Portfolio
			</Heading>
			<Collection
				type='list'
				items={stockPerformances}>
					{
						(item: Schema["StockPerformance"]["type"], index) => (
							<StockAnalysis key={index} symbol={item.stockSymbol!}/>
						)
					}
			</Collection>
		</div>
	)
}

export default Home;

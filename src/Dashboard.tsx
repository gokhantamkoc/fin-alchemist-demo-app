import * as React from 'react';
import { V6Client } from '@aws-amplify/api-graphql';

import { View, Menu, MenuItem, Divider } from '@aws-amplify/ui-react';

import type { Schema } from "../amplify/data/resource";

import Home from "./components/home/Home";
import StockList from './components/stock/StockList';
import { AuthUser } from 'aws-amplify/auth';

interface DashboardProps {
	authUser: AuthUser;
	signOut: () => void;
	client: V6Client<Schema>;
}

const Dashboard = (props: DashboardProps) => {
	
	const [activeMenu, setActiveMenu] = React.useState<string>("home");

	return (
		<div>
			<View>
				<Menu>
					<MenuItem onClick={() => setActiveMenu("home")}>
						Home
					</MenuItem>
					<MenuItem onClick={() => setActiveMenu("stocks")}>
						Stocks
					</MenuItem>
					<Divider/>
					<MenuItem onClick={() => props.signOut()}>
						Sign Out
					</MenuItem>
				</Menu>
			</View>
			<View
				padding={10}>
				{activeMenu === 'home' && <Home client={props.client} authUser={props.authUser}/>}
				{activeMenu === 'stocks' && <StockList client={props.client} authUser={props.authUser}/>}
			</View>
		</div>
	);

	// return (
	// 	<View>
	// 		<Grid
	// 			columnGap="0.5rem"
	// 			rowGap="0.5rem"
	// 			templateColumns="1fr 1fr 1fr"
	// 			templateRows="1fr 3fr 1fr"
	// 		>
	// 			<Card
	// 				columnStart="1"
	// 				columnEnd="-1"
	// 			>
	// 				Header
	// 			</Card>
	// 			<Card
	// 				columnStart="1"
	// 				columnEnd="2"
	// 			>
	// 				Nav
	// 			</Card>
	// 			<Card
	// 				columnStart="2"
	// 				columnEnd="-1"
	// 			>
	// 				Main
	// 			</Card>
	// 			<Card
	// 				columnStart="2"
	// 				columnEnd="-1"
	// 			>
	// 				Footer
	// 			</Card>
	// 		</Grid>
	{/* <CssBaseline />
			<TopMenu handleDrawerOpen={handleDrawerOpen} open={open} />
			<Box
				component="nav"
				>
				<LeftMenu setActiveMenu={setActiveMenu} logout={() => props.signOut!()} theme={theme} handleDrawerClose={handleDrawerClose} open={open} />
			</Box>
			<Box component="main" sx={{p: 2}}>
				<LeftMenuHeader/>
				
				{activeMenu === 'stocks' && <StockList client={props.client} authUser={props.authUser}/>}
			</Box> */}
	{/* </View> */ }
	{/* ); */ }
}

export default Dashboard;

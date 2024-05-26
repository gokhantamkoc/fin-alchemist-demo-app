import { Button, Flex, Input, Label, SelectField, View } from '@aws-amplify/ui-react';
import React from 'react';
import Modal from '../modal/Modal';



interface AddStockPopupProps {
	addStock: (username: string, stockSymbol: string, isActive: boolean) => void;
	handleClose: () => void;
	username: string;
}

const AddStockPopup = ({ addStock, handleClose, username }: AddStockPopupProps) => {

	const [stockSymbol, setStockSymbol] = React.useState<string>("AMZN");
	const [isActive, setIsActive] = React.useState<string>("YES");

	return (
		<Modal title='Add New Stock' closeModal={() => handleClose()}>
			<div>
				<View>
					<Flex direction="column" gap="small">
						<Label htmlFor="username">Username:</Label>
						<Input id="username" name="username" disabled={true} value={username} />
					</Flex>
					<Flex direction="column" gap="small">
						<SelectField
							label="Stock Symbol"
							value={stockSymbol}
							onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStockSymbol(e.target.value)}> // eslint-disable-line no-use-before-define
							<option value="AAPL">Apple Inc.</option>
							<option value="AMZN">Amazon.com Inc</option>
						</SelectField>
					</Flex>
					<Flex direction="column" gap="small">
						<SelectField
							label="Is Active?"
							value={isActive}
							onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setIsActive(e.target.value)}> // eslint-disable-line no-use-before-define
							<option value="YES">YES</option>
							<option value="NO">NO</option>
						</SelectField>
					</Flex>
					<Flex>
						<Button 
							onClick={() => handleClose()} 
							colorTheme="error">
							Cancel
						</Button>
						<Button onClick={() => {
							addStock(username, stockSymbol, isActive === 'YES')
						}} colorTheme="success">
							Success
						</Button>
					</Flex>
				</View>
			</div>
		</Modal>
		// <Modal
		// 	open={open}
		// 	onClose={handleClose}
		// 	aria-labelledby="parent-modal-title"
		// 	aria-describedby="parent-modal-description"
		// >
		// 	<Box
		// 		sx={{ ...style, width: 600, heigh: "100%" }}>
		// 		<Grid container>
		// 			<Grid item md={12}>
		// 				<h2>Add New Stock</h2>
		// 			</Grid>
		// 			<Grid item md={12}>
		// 				<TextField
		// 					id="username"
		// 					label="Username"
		// 					variant="filled"
		// 					value={username}
		// 					fullWidth
		// 					disabled />
		// 			</Grid>
		// 			<Grid item md={12}>
		// 				<InputLabel id="stockSymboLabel">Stock Symbol</InputLabel>
		// 				<Select
		// 					labelId="stockSymboLabel"
		// 					id="stockSymbol"
		// 					value={stockSymbol}
		// 					label="Stock Symbol"
		// 					onChange={(e: any) => setStockSymbol(e.target.value)}
		// 					fullWidth
		// 				>
		// 					<MenuItem value="AAPL">Apple Inc.</MenuItem>
		// 					<MenuItem value="GOOG">Alphabet</MenuItem>
		// 					<MenuItem value="AMZN">Amazon</MenuItem>
		// 				</Select>
		// 			</Grid>
		// 			<Grid item md={12}>
		// 			<InputLabel id="isActiveLabel">Is Active?</InputLabel>
		// 				<Select
		// 					labelId="isActiveLabel"
		// 					id="isActive"
		// 					value={isActive}
		// 					label="Is Active?"
		// 					onChange={(e: any) => setIsActive(e.target.value)}
		// 					fullWidth
		// 				>
		// 					<MenuItem value="Yes">Yes</MenuItem>
		// 					<MenuItem value="No">No</MenuItem>
		// 				</Select>
		// 			</Grid>
		// 			<Grid item md={3}>
		// 				<Button onClick={handleClose} variant="contained" color="error">Cancel</Button>
		// 			</Grid>
		// 			<Grid item md={6}/>

		// 			<Grid item md={3} sx={{alignSelf: "flex-end"}}>
		// 				<Button onClick={() => addStock(
		// 					username,
		// 					stockSymbol,
		// 					isActive==="Yes"
		// 				)} variant="contained" color="success">Add</Button>
		// 			</Grid>
		// 		</Grid>
		// 	</Box>
		// </Modal>
	);
}

export default AddStockPopup;

import { Button, Text } from "@aws-amplify/ui-react";
import Modal from "../modal/Modal";


interface AlertPopupProps {
	title: string;
	message: string;
	closeAlertPopup: () => void;
}


const AlertPopup = ({ title, message, closeAlertPopup }: AlertPopupProps) => {
	return (
		<Modal title={title} closeModal={closeAlertPopup}>
			<Text variation="tertiary">
				{message}
			</Text>
			<Button onClick={() => closeAlertPopup()} color="success">OK</Button>
		</Modal>
	);
}

export default AlertPopup;

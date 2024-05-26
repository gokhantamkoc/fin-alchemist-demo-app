import {
	View,
	Image
} from "@aws-amplify/ui-react";

const AuthHeader = () => {

	return (
		<View
			textAlign="center"
			padding={8}>
			<Image
				style={{ width: "100px", height: "100px" }}
				alt="Amplify logo"
				src="fin_alchemist_logo.svg"
			/>
		</View>
	);
}

export default AuthHeader;

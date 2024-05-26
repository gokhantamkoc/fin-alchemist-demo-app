export const formFields = {
	signIn: {
		username: {
			placeholder: 'Enter your email',
		},
	},
	signUp: {
		password: {
			label: 'Password:',
			placeholder: 'Enter your Password:',
			isRequired: false,
			order: 2,
		},
		confirm_password: {
			label: 'Confirm Password:',
			order: 1,
		},
	},
	forceNewPassword: {
		password: {
			placeholder: 'Enter your Password:',
		},
	},
	forgotPassword: {
		username: {
			placeholder: 'Enter your email:',
		},
	},
	confirmResetPassword: {
		confirmation_code: {
			placeholder: 'Enter your Confirmation Code:',
			label: 'New Label',
			isRequired: false,
		},
		confirm_password: {
			placeholder: 'Enter your Password Please:',
		},
	}
};
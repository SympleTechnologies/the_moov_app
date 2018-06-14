// react libraries
import React from 'react';

// third-libraries
import { StackNavigator } from 'react-navigation';
import { Root } from 'native-base';

// screens
import { LandingPage, Moov, SignInPage } from "./src/screens";

// components
import { FirstPage,  SecondPage, FinalPage } from "./src/component/Registrstion";

// forms
import { FABSocial } from "./src/component/Forms";

const AppNavigator = StackNavigator({
	LandingPage: {
		screen: LandingPage,
		navigationOptions: {
			header: null,
		}
	},
	SignInPage: {
		screen: SignInPage,
		navigationOptions: {
			header: null,
		}
	},
	FirstPage: {
		screen: FirstPage,
		navigationOptions: {
			header: null,
		}
	},
	SecondPage: {
		screen: SecondPage,
		navigationOptions: {
			header: null,
		}
	},
	FinalPage: {
		screen: FinalPage,
		navigationOptions: {
			header: null,
		}
	},
	Moov: {
		screen: Moov,
		navigationOptions: {
			header: null,
		}
	},
	FABSocial: {
		screen: FABSocial,
		navigationOptions: {
			header: null,
		}
	},
}, {
	navigationOptions: {
		header: 'screen',
	}
});


export default () =>
	<Root>
		<AppNavigator />
	</Root>

// react libraries
import React from 'react';

// third-libraries
import { StackNavigator } from 'react-navigation';
import { Root } from 'native-base';

// screens
import { LandingPage, SignInPage } from "./src/screens";

// components
import { FirstPage, SecondPage } from "./src/component/Registrstion";

const AppNavigator = StackNavigator({
	// LandingPage: {
	// 	screen: LandingPage,
	// 	navigationOptions: {
	// 		header: null,
	// 	}
	// },
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
	SignInPage: {
		screen: SignInPage,
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

// react libraries
import React from 'react';

// third-libraries
import { StackNavigator } from 'react-navigation';

// screens
import { LandingPage } from "./src/screens";

// components
import { FirstPage } from "./src/component/Registrstion";

const AppNavigator = StackNavigator({
	LandingPage: {
		screen: LandingPage,
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
}, {
	navigationOptions: {
		header: 'screen',
	}
});


export default () =>
	<AppNavigator />

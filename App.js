// react libraries
import React from 'react';

// third-libraries
import { StackNavigator } from 'react-navigation';

// screens
import { LandingPage } from "./src/screens";

const AppNavigator = StackNavigator({
	LandingPage: {
		screen: LandingPage,
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

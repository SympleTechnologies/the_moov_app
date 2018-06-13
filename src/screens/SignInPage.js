// react
import React from 'react';

// react-native libraries
import { Dimensions, ImageBackground, Platform } from 'react-native';

// third-party libraries
import { Container, Content, Body, CardItem, Card } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { NavigationActions } from 'react-navigation';

// component
import { StatusBarComponent, Texts } from "../common";

class SignInPage extends React.Component {
	
	/**
	 * newUser
	 *
	 * checks for active user and navigate
	 */
	newUser = () => {
		this.navigateToRegistrationPage();
	};
	
	/**
	 * newUser
	 *
	 * navigates user to registration page
	 */
	navigateToRegistrationPage = () => {
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName: 'FirstPage'})
			],
			key: null // THIS LINE
		});
		
		this.props.navigation.dispatch(resetAction)
	};
	
	render() {
		let { height, width } = Dimensions.get('window');
		
		return (
			<Container style={{ backgroundColor: '#ffffff' }}>
				<StatusBarComponent hidden backgroundColor='#fff' barStyle="dark-content" />
				<ImageBackground
					style={{
						height: height,
						width: width,
						flex: 1
					}}
					source={require('../../assets/images/landing_BP.png')}
				>
				</ImageBackground>
			</Container>
		);
	}
}

export { SignInPage };

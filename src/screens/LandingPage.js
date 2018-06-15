// react
import React from 'react';

// react-native libraries
import {AsyncStorage, Dimensions, ImageBackground, Platform} from 'react-native';

// third-party libraries
import { Container, Content, Body, CardItem, Card } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { NavigationActions } from 'react-navigation';

// component
import { StatusBarComponent, Texts } from "../common";

class LandingPage extends React.Component {
	
	/**
	 * isUserLoggedIn
	 *
	 * checks if user is logged in and then routes user to the right place
	 * @return {Promise<void>}
	 */
	isUserLoggedIn = async () => {
		try {
			const value = await AsyncStorage.getItem('token');
			if (value !== null){
				this.navigateToRegistrationPage('Moov');
			} else {
				this.navigateToRegistrationPage('FirstPage');
			}
		} catch (error) {
			// Error retrieving data
		}
	};
	
	/**
	 * newUser
	 *
	 * navigates user to registration page
	 */
	navigateToRegistrationPage = (page) => {
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName: page})
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
					
					{/*Moov Icon*/}
					<Content contentContainerStyle={{ alignItems: 'center'}}>
						<Animatable.View
							animation="fadeOut"
							delay={6300}
							onAnimationEnd={this.isUserLoggedIn}
						>
							<Animatable.Image
								animation="fadeInDownBig"
								delay={1700}
								style={{
									alignItems: 'center',
									height: height / 5.5,
									width: width / 3,
									borderRadius: 25,
									marginTop: height / 10
								}}
								source={require('../../assets/images/appLogo.png')}
							/>
						</Animatable.View>
					</Content>
					
					{/*Welcome text*/}
					<Content
						contentContainerStyle={{
							alignItems: 'center',
						}}>
						<Animatable.View
							animation="fadeInUpBig"
							delay={2000}
						>
							<Animatable.View
								animation="fadeOut"
								delay={6300}
								onAnimationEnd={this.newUser}
							>
								<Card style={{marginTop: 10,
									borderRadius: 0,
									borderWidth: 0,
									borderColor: 'white',
								}}>
									<CardItem
										style={{
											marginTop: 10,
											flexDirection: 'column',
											marginLeft: 10,
											marginBottom: 5,
											alignItems: 'center',
											borderColor: 'white',
											borderRadius: 10,
											borderWidth: 2,
											shadowOffset: { height: 2, width: 3 },
											shadowOpacity: 0,
											elevation:0
										}}
									>
										<Body
											style={{
												marginBottom: 5,
												flexDirection: 'row',
											}}>
											<Texts
												animation="fadeIn"
												delay={2300}
												text="We"
												textColor='#fdb456'
												fontWeight='700'
											/>
											<Texts
												animation="fadeIn"
												delay={2600}
												text={`${' '} will`}
												textColor='#f9945b'
												fontWeight='700'
											/>
											<Texts
												animation="fadeIn"
												delay={2900}
												text={`${' '} help`}
												textColor='#f77a5d'
												fontWeight='700'
											/>
											<Texts
												animation="fadeIn"
												delay={3100}
												text={`${' '} you`}
												textColor='#f35462'
												fontWeight='700'
											/>
											<Texts
												animation="fadeIn"
												delay={3400}
												text={`${' '} get`}
												textColor='#f24064'
												fontWeight='700'
											/>
											<Texts
												animation="fadeIn"
												delay={3700}
												text={`${' '} there`}
												textColor='#f45e61'
												fontWeight='700'
											/>
											<Texts
												animation="fadeIn"
												delay={4000}
												text={`${' '} Faster!`}
												textColor='#f03664'
												fontWeight='900'
											/>
										</Body>
									</CardItem>
								</Card>
							</Animatable.View>
						</Animatable.View>
					</Content>
					
					{/*Moov car */}
					<Animatable.View
						animation="fadeOut"
						delay={6300}
						onAnimationEnd={this.newUser}
					>
						<Animatable.Image
							animation="fadeInLeftBig"
							delay={4300}
							styleName="medium"
							style={{
								marginLeft: Platform.OS === 'ios' ? width / 4 : width / 3.3,
								height: Platform.OS === 'ios' ? 90 :  height / 7.3,
								width:  Platform.OS === 'ios' ? 270 : width / 1.5,
							}}
							source={require('../../assets/images/moov-car-side.png')}
						/>
					</Animatable.View>
				</ImageBackground>
			</Container>
		);
	}
}

export { LandingPage };

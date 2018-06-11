// react
import React from 'react';

// react-native libraries
import {
	Dimensions,
	ImageBackground,
	TouchableOpacity,
	Image,
	View,
	Platform
} from 'react-native';

// third-party libraries
import { Container, Content, Text, Body, CardItem, Card } from 'native-base';
import * as Animatable from 'react-native-animatable';

// component
import { StatusBarComponent, Texts } from "../common";

class LandingPage extends React.Component {
	
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
					source={require('../../assests/landing_BP.png')}
				>
					{/*<Content/>*/}
					<Content contentContainerStyle={{ alignItems: 'center'}}>
						<TouchableOpacity>
							<Animatable.Image
								animation="fadeInDownBig"
								// animation="slideInDown" iterationCount={1} direction="alternate"
								style={{
									alignItems: 'center',
									height: height / 5.5,
									width: width / 3,
									borderRadius: 25,
									marginTop: height / 10
								}}
								source={require('../../assests/appLogo.png')}
							/>
						</TouchableOpacity>
					</Content>
					<Content contentContainerStyle={{
						// flex: 1,
						alignItems: 'center',
					}}>
						<TouchableOpacity>
							<Animatable.View
								animation="fadeInUpBig"
							>
								<Animatable.View
									animation="wobble"
									delay={4900}
									iterationCount={20}
								>
								
									<Card style={{marginTop: 10,
										borderRightColor: '#ed1a68',
										borderLeftColor: '#fdbf55',
										borderRadius: 10,
										borderWidth: 5,
									}}>
											<CardItem
												style={{
													marginTop: 10,
													flexDirection: 'column',
													marginLeft: 10,
													marginBottom: 5,
													borderColor: 'blue',
													alignItems: 'center'
												}}
											>
												<Body
													style={{
														marginBottom: 5,
														flexDirection: 'row',
													}}>
												<Texts
													animation="fadeIn"
													delay={1000}
													text="We"
													textColor='#fdb456'
													fontWeight='700'
												/>
												<Texts
													animation="fadeIn"
													delay={1300}
													text={`${' '} will`}
													textColor='#f9945b'
													fontWeight='700'
												/>
												<Texts
													animation="fadeIn"
													delay={1700}
													text={`${' '} Help`}
													textColor='#f77a5d'
													fontWeight='700'
												/>
												<Texts
													animation="fadeIn"
													delay={2000}
													text={`${' '} you`}
													textColor='#f35462'
													fontWeight='700'
												/>
												<Texts
													animation="fadeIn"
													delay={2300}
													text={`${' '} get`}
													textColor='#f24064'
													fontWeight='700'
												/>
												<Texts
													animation="fadeIn"
													delay={2700}
													text={`${' '} there`}
													textColor='#f45e61'
													fontWeight='700'
												/>
												<Texts
													animation="fadeIn"
													delay={3000}
													text={`${' '} faster!`}
													textColor='#f03664'
													fontWeight='900'
												/>
												</Body>
											</CardItem>
									</Card>
								</Animatable.View>
							</Animatable.View>
						</TouchableOpacity>
					</Content>
					<TouchableOpacity onPress={this.appNavigation}>
						<Animatable.Image
							animation="fadeInLeftBig"
							delay={3300}
							styleName="medium"
							style={{
								marginLeft: Platform.OS === 'ios' ? width / 4 : width / 3.3,
								height: Platform.OS === 'ios' ? 90 :  height / 7.3,
								width:  Platform.OS === 'ios' ? 270 : width / 1.5,
							}}
							source={require('../../assests/moov-car-side.png')}
						/>
					</TouchableOpacity>
				</ImageBackground>
			</Container>
		);
	}
}

export { LandingPage };

// react
import React from 'react';

// react-native libraries
import { Dimensions, ImageBackground, StyleSheet, Platform, Image, ScrollView, AsyncStorage } from 'react-native';

// third-party libraries
import {Container, Text, Content, Button, Toast} from 'native-base';
import * as Animatable from 'react-native-animatable';
import PhoneInput from "react-native-phone-input";
import * as axios from 'axios';
import { NavigationActions } from 'react-navigation';

// component
import {StatusBarComponent, CardNumber, LoadingPage} from "../../common";

// fonts
import { Fonts } from "../../utils/Font";

class FinalPage extends React.Component {
	
	state = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		imgURL: '',
		socialEmail: '',
		userAuthID: '',
		authentication_type: '',
		selectedSchool: '',
		
		isValidPhoneNumber: '',
		type: '',
		phoneNumber: '',
		
		loading: false,
	};
	
	/**
	 * componentDidMount
	 *
	 * React life-cycle method sets user token
	 */
	componentDidMount() {
		this.refs.phone.focus();
		
		this.setState({
			firstName: this.props.navigation.state.params.firstName,
			lastName: this.props.navigation.state.params.lastName,
			email: this.props.navigation.state.params.email,
			password: this.props.navigation.state.params.password,
			imgURL: this.props.navigation.state.params.imgURL,
			socialEmail: this.props.navigation.state.params.socialEmail,
			userAuthID: this.props.navigation.state.params.userAuthID,
			authentication_type: this.props.navigation.state.params.authentication_type,
			selectedSchool: this.props.navigation.state.params.selectedSchool,
		});
	};
	
	/**
	 * signUpUser
	 *
	 * signs user up on the moov platform
	 */
	signUpUser = () => {
		this.setState({
			isValidPhoneNumber: this.refs.phone.isValidNumber(),
			type: this.refs.phone.getNumberType(),
			phoneNumber: this.refs.phone.getValue()
		}, () => this.verifyPhoneNumber());
	};
	
	/**
	 * verifyPhoneNumber
	 *
	 * verifies user phone number
	 */
	verifyPhoneNumber = () => {
		if(this.state.isValidPhoneNumber) {
			this.setState({ loading: !this.state.loading });
			// this.signUpWithEmailAndPassword();
			if(this.state.authentication_type === 'email') {
				this.signUpWithEmailAndPassword();
			} else {
				this.signUpWithSocialAuth();
			}
		} else {
			this.errorMessage(`Invalid phone number`)
		}
	};
	
	/**
	 * errorMessage
	 *
	 * displays error message to user using toast
	 * @param errorMessage
	 * return {void}
	 */
	errorMessage = (errorMessage) => {
		Toast.show({ text: `${errorMessage}`, type: "danger", position: 'top' })
	};
	
	/**
	 * successMessage
	 *
	 * displays success message to user using toast
	 * @param successMessage
	 * return {void}
	 */
	successMessage = (successMessage) => {
		Toast.show({ text: `${successMessage}`, type: "success", position: 'top' })
	};
	
	/**
	 * signUpWithSocialAuth
	 *
	 * signs up users using social auth
	 * @return {void}
	 */
	signUpWithSocialAuth  = async () => {
		await axios.post('https://moov-backend-staging.herokuapp.com/api/v1/signup', {
			"password": this.state.userAuthID,
			"user_type": "student",
			"firstname":  this.toTitleCase(this.state.firstName),
			"lastname": this.toTitleCase(this.state.lastName),
			"email": this.state.socialEmail,
			"image_url": this.state.imgURL,
			"mobile_number": this.state.phoneNumber,
			"school": this.toTitleCase(this.state.selectedSchool),
			"authentication_type": this.state.authentication_type
		})
			.then((response) => {
				this.successMessage(`${response.data.data.message}`)
				this.saveTokenToLocalStorage(response.data.data.token)
					.then(this.navigateUserTo('Moov'))
			})
			.catch((error) => {
				return error.message === 'Network Error'
					? this.errorMessage(error.message)
					: this.errorMessage(`${error.response.data.data.message}`)
			});
	};
	
	/**
	 * signUpWithEmailAndPassword
	 *
	 * signs up users using email and password
	 * @return {void}
	 */
	signUpWithEmailAndPassword  = async () => {
		await axios.post('https://moov-backend-staging.herokuapp.com/api/v1/signup', {
			"password": this.state.password,
			"user_type": "student",
			"firstname":  this.toTitleCase(this.state.firstName),
			"lastname": this.toTitleCase(this.state.lastName),
			"email": this.state.email.toLocaleLowerCase(),
			"mobile_number": this.state.phoneNumber,
			"school": this.toTitleCase(this.state.selectedSchool),
			"authentication_type": this.state.authentication_type
		})
			.then((response) => {
				this.successMessage(`${response.data.data.message}`);
				this.saveTokenToLocalStorage(response.data.data.token)
					.then(this.navigateUserTo('Moov'))
			})
			.catch((error) => {
				return error.message === 'Network Error'
					? this.errorMessage(error.message)
					: this.errorMessage(`${error.response.data.data.message}`);
			});
	};
	
	/**
	 * toTitleCase
	 *
	 * converts covenant university to Covenant University
	 * @param {string} schoolName - school name
	 * @return {*}
	 */
	toTitleCase = (schoolName) => {
		return schoolName.replace(/\w\S*/g, (txt) => {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	};
	
	/**
	 * saveTokenToLocalStorage
	 *
	 * saves user's token to phone storage
	 */
	saveTokenToLocalStorage = async (token) => {
		try {
			await AsyncStorage.setItem("token", token)
		} catch (error) {
			// Error saving data
		}
	};
	
	/**
	 * navigateUserTo
	 *
	 * navigate user to MOOV page
	 * @param {string} screen - screen name
	 */
	navigateUserTo = (screen) => {
		this.setState({ loading: !this.state.loading });
		
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName: screen })
			],
			key: null // THIS LINE
		});
		
		this.props.navigation.dispatch(resetAction)
	};
	
	
	render() {
		console.log(this.state);
		const { getText, moovingText } = styles;
		let { height, width } = Dimensions.get('window');
		
		if(this.state.loading) {
			return (
				<LoadingPage />
			)
		}
		
		return (
			<Container style={{ backgroundColor: '#ffffff' }}>
				<StatusBarComponent hidden backgroundColor='#fff' barStyle="dark-content" />
				<ImageBackground
					style={{
						height: height,
						width: width,
						flex: 1
					}}
					source={require('../../../assets/images/registration_BP.png')}
				>
					<Content contentContainerStyle={{ alignItems: 'center'}}>
						
						{/*Moov Icon*/}
						<Image
							style={{
								alignItems: 'center',
								height: height / 15,
								width: width / 9,
								borderRadius: 8,
								marginTop: Platform.OS === 'ios' ? height / 10 : height / 15
							}}
							source={require('../../../assets/images/appLogo.png')}
						/>
						
						{/*Heading text*/}
						<Content
							contentContainerStyle={{
								flexDirection: 'row',
								justifyContent: 'center',
								marginTop: Platform.OS === 'ios' ? 20 : 10
							}}
						>
							<Text style={getText}>Let's</Text>
							<Text style={moovingText}> moov!</Text>
						</Content>
						
						{/*Progress bar*/}
						<Content
							contentContainerStyle={{
								flexDirection: 'row',
								alignItems: 'center',
								marginTop: Platform.OS === 'ios' ? 20 : 10,
								width: width / 1.25,
							}}
						>
							
							{/*Left bar*/}
							<Animatable.View
								animation="fadeInLeftBig"
								style={{
									marginTop: Platform.OS === 'ios' ? 10 : 20,
									width: width / 1.49
								}}
							>
								<Content
									contentContainerStyle={{
										borderWidth: Platform.OS === 'ios' ? 0.6 : 0.7,
										borderColor: '#f9a24f',
										marginTop: Platform.OS === 'ios' ? 20 : 10,
										marginBottom: 10,
									}}>
								</Content>
							</Animatable.View>
							
							{/*Card 2*/}
							<Animatable.View animation="fadeInLeftBig">
								<CardNumber number={3} />
							</Animatable.View>
						
						</Content>
						
						{/*Body*/}
						<Content
							contentContainerStyle={{
								marginTop: height / 6,
							}}
						>
							
							{/*Select preferred institute*/}
							<Text
								style={{
									color: '#e0ddde',
									fontFamily: Fonts.GothamRounded,
									fontWeight: '400',
									textAlign: 'center',
								}}
							>Enter Mobile Phone Number</Text>
							
							{/*Phone Number component*/}
							<Content
								contentContainerStyle={{
									marginTop: 22,
									width: width / 1.25,
									height: height / 10,
									borderColor: '#b1b1b1',
									borderWidth: 1,
									backgroundColor: '#fff',
									flexDirection: 'row',
									
									alignItems: 'center',
									justifyContent: 'center'
								}}
							>
								<ScrollView
									contentContainerStyle={{
										marginLeft: 15,
									}}>
									<PhoneInput
										ref='phone'
										textStyle={{
											color: '#b0b0b0',
											fontFamily: Fonts.GothamRounded,
											fontWeight: '400',
											fontSize: 17
										}}
										initialCountry='ng'
										autoFocus
										allowZeroAfterCountryCode
										textProps={{
											returnKeyType: "done",
											onSubmitEditing: () => this.signUpUser()
										}}
									/>
								</ScrollView>
							</Content>
						
						</Content>
						
						{/*Button*/}
						<Button
							style={{
								width: width / 1.5,
								height: height / 13,
								marginLeft: width / 5.6,
								marginTop: Platform.OS === 'ios' ? height / 6 : height / 5,
								backgroundColor: '#fff',
								borderWidth: 1.3,
								borderColor: '#d3000d',
								borderRadius: 8,
								zIndex: 1,
							}}
							onPress={this.signUpUser}
							block
							dark>
							
							<Text
								uppercase={false}
								style={{
									color: '#df5559',
									fontWeight: '900',
									fontFamily: Fonts.GothamRounded
								}}>
								Next
							</Text>
						</Button>
					
					</Content>
				</ImageBackground>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	getText: {
		fontSize: 25,
		color: '#ffc653',
		fontWeight: '400',
		fontFamily: Fonts.GothamRounded
	},
	moovingText: {
		fontSize: 25,
		color: '#d3000d',
		fontWeight: '400',
		fontFamily: Fonts.GothamRounded
	},
	activityIndicator: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 20
	},
});

export { FinalPage };

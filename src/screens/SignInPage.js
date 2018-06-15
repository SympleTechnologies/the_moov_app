// react
import React from 'react';

// react-native libraries
import {Dimensions, ImageBackground, Keyboard, StyleSheet, TouchableOpacity, Image, AsyncStorage} from 'react-native';

// third-party libraries
import {Container, Content, Text, Button, Toast} from 'native-base';
import * as Animatable from 'react-native-animatable';
import * as axios from 'axios';
import { NavigationActions } from 'react-navigation';

// component
import { LoadingPage, StatusBarComponent } from "../common";

// font
import {Fonts} from "../utils/Font";

// form
import { FABSocial, SignInForm } from "../component/Forms";

class SignInPage extends React.Component {
	
	state={
		loading: false,
		email: '',
		password: '',
	};
	
	/**
	 * signUpPage
	 *
	 * navigates to sign-up page
	 * @return {void}
	 */
	signUpPage = () => {
		this.props.navigation.dispatch(new NavigationActions.reset({
			index: 1,
			actions: [
				NavigationActions.navigate({ routeName: 'SignInPage'}),
				NavigationActions.navigate({ routeName: 'FirstPage'})
			]
		}));
	};
	
	/**
	 * toggleSpinner
	 *
	 * toggles loading state
	 */
	toggleSpinner = () => {
		Keyboard.dismiss();
		this.setState({
			loading: !this.state.loading
		})
	};
	
	/**
	 * signInWithEmailAndPassword
	 *
	 * Sign in with user's email and password
	 * @return {void}
	 */
	signInWithEmailAndPassword = () => {
		if(this.validateFields()) {
			this.toggleSpinner();
			axios.post('https://moov-backend-staging.herokuapp.com/api/v1/login', {
				"email": this.state.email,
				"password": this.state.password,
			})
				.then((response) => {
					this.toggleSpinner();
					this.successMessage(response.data.data.message);
					this.saveTokenToLocalStorage(response.data.data.token)
						.then(this.navigateUserTo('Moov'))
				})
				.catch((error) => {
					console.log(error)
					console.log(error.message);
					console.log(error.message === 'Network Error')
					this.toggleSpinner();
					return error.message === 'Network Error'
						? this.errorMessage(error.message)
						: this.errorMessage(error.response.data.data.message)
				});
		}
	};
	
	/**
	 * validateFields
	 *
	 * validates user input fields
	 * @return {boolean}
	 */
	validateFields = () => {
		let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		
		if ( this.state.email === '') {
			this.errorMessage('Email field cannot be empty')
		} else if(this.state.email.match(pattern) === null) {
			this.errorMessage('Email address is badly formatted')
		} else if ( this.state.password === '' ) {
			this.errorMessage('Password field cannot be empty')
		} else if(this.state.password.length < 6) {
			this.errorMessage('Password cannot be less than 6 characters')
		} else {
			return true
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
					source={require('../../assets/images/landing_BP.png')}
				>
					<Content contentContainerStyle={{ alignItems: 'center'}}>
						
						{/*Moov Icon*/}
						<Image
							style={{
								alignItems: 'center',
								height: height / 5.5,
								width: width / 3,
								borderRadius: 25,
								marginTop: height / 10
							}}
							source={require('../../assets/images/appLogo.png')}
						/>
						
						{/*Heading text*/}
						<Content
							contentContainerStyle={{
								flexDirection: 'row',
								justifyContent: 'center',
								marginTop: 35
							}}
						>
							<Text style={getText}>Welcome</Text>
							<Text style={moovingText}> Back</Text>
						</Content>
						
						{/*Sign-in Form*/}
						<SignInForm
							emailValue={this.state.email}
							passwordValue={this.state.password}
							
							onChangeEmailText={email =>  this.setState({ email: email.trim() })}
							onChangePasswordText={password => this.setState({ password })}
							
							onSubmit={this.signInWithEmailAndPassword}
						/>
						
						{/*Sign-in Button*/}
						<Button
							style={{
								width: width / 1.5,
								height: width / 7,
								marginLeft: width / 5.6,
								marginTop: height / 15,
								backgroundColor: '#ed1768',
								borderRadius: 8
							}}
							onPress={this.signInWithEmailAndPassword}
							block
							dark>
							<Text
								uppercase={false}
								style={{
									fontWeight: '900',
									fontFamily: Fonts.GothamRoundedLight
								}}>Sign in</Text>
						</Button>
						
						<Content
							contentContainerStyle={{
								marginTop: height / 15,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center'
							}}>
							<Text style={{ color: '#9b9b9b', fontFamily: Fonts.GothamRounded }}>You don't have an account?</Text>
							<TouchableOpacity onPress={this.signUpPage}>
								<Text style={{ color: '#f00266', fontWeight: '900', fontFamily: Fonts.GothamRounded }}> Sign up</Text>
							</TouchableOpacity>
						</Content>
						
						{/*Social Auth*/}
						<FABSocial
							onPress={() => Keyboard.dismiss()}
							navigate={this.props.navigation}
							toggleSpinner={this.toggleSpinner}
						/>
					
					</Content>
					
				</ImageBackground>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	getText: {
		fontSize: 35,
		color: '#ffc653',
		fontWeight: '400',
		fontFamily: Fonts.GothamRounded
	},
	moovingText: {
		fontSize: 35,
		color: '#d3000d',
		fontWeight: '400',
		fontFamily: Fonts.GothamRounded
	},
});

export { SignInPage };

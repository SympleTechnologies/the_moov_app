// react
import React from 'react';

// react-native libraries
import { Dimensions, ImageBackground, StyleSheet, Platform, Image, TouchableOpacity } from 'react-native';

// third-party libraries
import { Container, Text, Content, Button, Toast } from 'native-base';

// component
import { StatusBarComponent, CardNumber } from "../../common";

// forms
import { BasicInformation, FABSocial } from "../Forms";

// fonts
import { Fonts } from "../../utils/Font";


class FirstPage extends React.Component {
	
	state = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: ''
	};
	
	/**
	 * submitForm
	 *
	 * calls validate method before moving to the next form
	 */
	submitForm = () => {
		const { navigate } = this.props.navigation;
		
		if(this.validateFields()) {
			this.successMessage('YAY!')
			navigate('SecondPage', {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				email: this.state.email,
				password: this.state.password,
				imgURL: '',
				authentication_type: "email",
			});
		}
	};
	
	
	/**
	 * signInPage
	 *
	 * navigates to sign-ip page
	 * @return {void}
	 */
	signInPage = () => {
		const { navigate } = this.props.navigation;
		
		navigate('SignInPage');
	};
	
	/**
	 * validateFields
	 *
	 * validates user input fields
	 * @return {boolean}
	 */
	validateFields = () => {
		let hasNumber = /\d/;
		let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		let format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
		
		if ( this.state.firstName === '') {
			this.errorMessage('First Name field cannot be empty')
		} else if(format.test(this.state.firstName)){
			this.errorMessage('First Name field cannot special characters')
		} else if(hasNumber.test(this.state.firstName)) {
			this.errorMessage('First Name field cannot contains numbers')
		} else if ( this.state.lastName === '') {
			this.errorMessage('Last Name field cannot be empty')
		} else if(format.test(this.state.lastName)){
			this.errorMessage('Last Name field cannot special characters')
		} else if(hasNumber.test(this.state.lastName)) {
			this.errorMessage('Last Name field cannot contains numbers')
		} else if ( this.state.email === '') {
			this.errorMessage('Email field cannot be empty')
		} else if(this.state.email.match(pattern) === null) {
			this.errorMessage('Email address is badly formatted')
		} else if ( this.state.password === '' ) {
			this.errorMessage('Password field cannot be empty')
		} else if(this.state.password.length < 6) {
			this.errorMessage('Password cannot be less than 6 characters')
		} else if ( this.state.confirmPassword === '' ) {
			this.errorMessage('Confirm Password cannot be empty')
		} else if ( this.state.confirmPassword !== this.state.password ) {
			this.errorMessage('Password does not match the confirm password field')
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
	
	render() {
		console.log(this.state);
		const { getText, moovingText } = styles;
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
					source={require('../../../assets/registration_BP.png')}
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
							source={require('../../../assets/appLogo.png')}
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
							<CardNumber number={1} />
							
							<Content
								contentContainerStyle={{
									borderWidth: Platform.OS === 'ios' ? 0.6 : 0.7,
									borderColor: '#e3dfe0',
									marginTop: Platform.OS === 'ios' ? 20 : 10,
									marginBottom: 10,
								}} />
						</Content>
						
						{/*Form */}
						<BasicInformation
							firstNameValue={this.state.firstName}
							lastNameValue={this.state.lastName}
							emailValue={this.state.email}
							passwordValue={this.state.password}
							confirmPasswordValue={this.state.confirmPassword}
							
							onChangeFirstNameText={firstName => this.setState({ firstName })}
							onChangeLastNameText={lastName => this.setState({ lastName })}
							onChangeEmailText={email => this.setState({ email })}
							onChangePasswordText={password => this.setState({ password })}
							onChangeConfirmPasswordText={confirmPassword => this.setState({ confirmPassword })}
							
							onSubmit={this.submitForm}
						/>
						
						{/*Button*/}
						<Button
							style={{
								width: width / 1.5,
								height: height / 13,
								marginLeft: width / 5.6,
								marginTop: Platform.OS === 'ios' ? 30 : height / 20,
								backgroundColor: '#fff',
								borderWidth: 1.3,
								borderColor: '#d3000d',
								borderRadius: 8,
							}}
							onPress={this.submitForm}
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
						
						{/*Sign In link*/}
						<Content
							contentContainerStyle={{
								marginTop: Platform.OS === 'ios' ? 30 : height / 20,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center'
							}}>
							<Text style={{
								color: '#b4b4b4',
								fontSize: 12,
								fontWeight: '400',
								fontFamily: Fonts.GothamRoundedLight
							}}>
								
								Do you have an account?
							</Text>
							<TouchableOpacity
								onPress={this.signInPage}
							>
								<Text
									style={{
										color: '#f00266',
										fontSize: 12,
										fontWeight: '900',
										fontFamily: Fonts.GothamRounded
									}}> Sign In</Text>
							</TouchableOpacity>
						</Content>
						
						{/*Social Auth*/}
						<FABSocial />
						
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

export { FirstPage };

// react
import React, { Component } from 'react';

// third-libraries
import {Button, Icon, Fab, Toast} from 'native-base';
import { LoginManager } from "react-native-fbsdk";
import FBSDK from "react-native-fbsdk";
import * as axios from 'axios';
import {AsyncStorage} from "react-native";
import { NavigationActions } from 'react-navigation';
import { GoogleSignin } from 'react-native-google-signin';

// Facebook
const { AccessToken } = FBSDK;
const { GraphRequest, GraphRequestManager } = FBSDK;

class FABSocial extends Component {
	
	state = {
		active: false,
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		socialEmail: '',
		imgURL: '',
		userAuthID: '',
		authentication_type: '',
	};
	
	/**
	 * componentDidMount
	 *
	 * React life-cycle method
	 * @return {void}
	 */
	componentDidMount() {
		LoginManager.logOut();
		this.googleSignOut();
		this.setupGoogleSignin().then();
	}
	
	/**
	 * setupGoogleSignin
	 *
	 * Initialize google auth
	 * @return {Promise<void>}
	 */
	async setupGoogleSignin() {
		try {
			await GoogleSignin.hasPlayServices({ autoResolve: true });
			
			await GoogleSignin.configure({
				iosClientId: '365082073509-5071c4nc1306fh1mu7ka4hj0evhr85e4.apps.googleusercontent.com',
				webClientId: '840588850714-7gj2or93l68me32o2nc46qb9e7u50t8i.apps.googleusercontent.com',
				offlineAccess: false
			});
			
			const user = await GoogleSignin.currentUserAsync();
			console.log(user);
		}
		catch (err) {
			console.log("Google signin error", err.code, err.message);
		}
	}
	
	
	/**
	 * handleFacebookLogin
	 *
	 * handles user facebook login
	 * @return {void}
	 */
	handleFacebookLogin = () => {
		LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then((result) => {
				if (result.isCancelled) {
					this.errorMessage('Login cancelled!');
				} else {
					AccessToken.getCurrentAccessToken()
						.then((data) => {
							this.getFacebookUser(data.accessToken);
						})
						.catch((error) => {
							console.log(error);
							this.errorMessage('Unable to fetch user details!');
						})
				}
			},
			(error) => {
				console.log('Login fail with error: ' + error)
			}
		)
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
	 * getFacebookUser
	 *
	 * Get facebook user information
	 * @param {string} token - user's access token
	 * @return {void}
	 */
	getFacebookUser = (token) => {
		const infoRequest = new GraphRequest(
			'/me',
			{
				accessToken: token,
				parameters: {
					fields: {
						string: 'name,first_name,middle_name,last_name,picture,email'
					}
				}
			},
			this._responseInfoCallback
		);
		
		new GraphRequestManager().addRequest(infoRequest).start()
		
	};
	
	/**
	 * _responseInfoCallback
	 *
	 * GraphRequest call back handler
	 * @param {object} error - error containing error message
	 * @param {object} result - object containg user information
	 * @private
	 * @return {void}
	 */
	_responseInfoCallback = (error: ?Object, result: ?Object) => {
		if (error) {
			this.errorMessage('The operation could not be completed');
			LoginManager.logOut()
		} else {
			this.facebookLoginSuccess(result);
		}
	};
	
	/**
	 * facebookLoginSucces
	 *
	 * Sets the state with the user's details
	 * @param {object} userDetails - User's information
	 * @return {void}
	 */
	facebookLoginSuccess = (userDetails) => {
		this.setState({
			firstName: userDetails.first_name,
			lastName: userDetails.last_name,
			socialEmail: userDetails.email,
			imgURL: userDetails.picture.data['url'],
			userAuthID: userDetails.id,
			authentication_type: "facebook"
		}, () => {
			this.signInWithSocialAuth()
		});
	};
	
	/**
	 * signInWithSocialAuth
	 *
	 * Sign in with Social media
	 * @return {void}
	 */
	signInWithSocialAuth = () => {
		this.props.toggleSpinner();
		axios.post('https://moov-backend-staging.herokuapp.com/api/v1/login', {
			"email": this.state.socialEmail,
			"password": this.state.userAuthID,
		})
			.then((response) => {
				this.successMessage(`${response.data.data.message}`);
				this.saveTokenToLocalStorage(response.data.data.token)
					.then(this.navigateUserTo('Moov'))
			})
			.catch((error) => {
				this.checkErrorMessage(error.response.data.data.message);
			});
	};
	
	/**
	 * checkErrorMessage
	 *
	 * checks error message from the server for right navigation
	 * @param {string} message - Error message from server
	 * @return {void}
	 */
	checkErrorMessage = (message) => {
		LoginManager.logOut();
		this.props.toggleSpinner();
		if(message === 'User does not exist') {
			this.successMessage(`Yay! Sign-Up`);
			this.appNavigation('social');
		} else if(message === 'Invalid email/password') {
			this.errorMessage(message)
		} else {
			this.errorMessage(`Request was not successful`)
		}
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
		this.props.toggleSpinner();
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName: screen })
			],
			key: null // THIS LINE
		});
		//
		this.props.navigate.dispatch(resetAction)
	};
	
	/**
	 * appNavigation
	 *
	 * @param {string} page - The page the user wants to navigate to
	 * @return {void}
	 */
	appNavigation = (page) => {
		const { navigate } = this.props.navigate;
		
		if (page === 'social') {
			this.props.toggleSpinner();
			navigate('SecondPage', {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				email: '',
				socialEmail: this.state.socialEmail,
				imgURL: this.state.imgURL,
				userAuthID: this.state.userAuthID,
				authentication_type: this.state.authentication_type
			});
		}
	};
	
	/**
	 * googleSignIn
	 *
	 * Signs user in using google login interface
	 * @return {void}
	 */
	googleSignIn = () => {
		this.setState({ loading: !this.state.loading });
		GoogleSignin.configure({
			iosClientId: '365082073509-5071c4nc1306fh1mu7ka4hj0evhr85e4.apps.googleusercontent.com'
		})
			.then(() => {
				GoogleSignin.signIn()
					.then((user) => {
						console.log(user);
						
						this.setState({
							firstName: user.givenName,
							lastName: user.familyName,
							socialEmail: user.email,
							imgURL: user.photo,
							userAuthID: user.id,
							authentication_type: "google"
						}, () => {
							this.googleSignOut();
							this.signInWithSocialAuth();
						});
						// this.successMessage('Success')
					})
					.catch((err) => {
						this.errorMessage('Failed!');
					})
					.done();
			})
	};
	
	/**
	 * googleSignIn
	 *
	 * Signs user out using google login interface
	 * @return {void}
	 */
	googleSignOut = () => {
		GoogleSignin.signOut()
			.then(() => {
				console.log('out');
			})
			.catch((err) => {
			
			});
	};
	
	render() {
		return (
			<Fab
				active={this.state.active}
				direction="down"
				containerStyle={{ }}
				style={{ backgroundColor: '#ffc653' }}
				position="topRight"
				onPress={() => this.setState({ active: !this.state.active })}>
				<Icon name={this.state.active ? "more-vertical" : "more-horizontal"} type="Feather" />
				<Button onPress={this.handleFacebookLogin} style={{ backgroundColor: '#3B5998' }}>
					<Icon name="logo-facebook" />
				</Button>
				<Button onPress={this.googleSignIn} style={{ backgroundColor: '#DD5144' }}>
					<Icon name="google" type="FontAwesome" />
				</Button>
				<Button style={{ backgroundColor: '#1ea0f3' }}>
					<Icon name="twitter" type="FontAwesome" />
				</Button>
			</Fab>
		);
	}
}

export { FABSocial };

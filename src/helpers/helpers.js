import FBSDK from 'react-native-fbsdk';
import { LoginManager } from 'react-native-fbsdk'

// Facebook
const { AccessToken } = FBSDK;
const { GraphRequest, GraphRequestManager } = FBSDK;

/**
 * handleFacebookLogin
 *
 * handles user facebook login
 * @return {void}
 */
export const handleFacebookLogin = () => {
	LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then((result) => {
			if (result.isCancelled) {
				console.log('Login cancelled')
				this.setState({ loading: !this.state.loading });
			} else {
				AccessToken.getCurrentAccessToken()
					.then((data) => {
						this.getFacebookUser(data.accessToken);
					})
					.catch((error) => {
						this.errorMessage('Unable to fetch user details!')
						this.setState({ loading: !this.state.loading });
					})
			}
		},
		(error) => {
			console.log('Login fail with error: ' + error)
		}
	)
};

/**
 * getFacebookUser
 *
 * Get facebook user information
 * @param {string} token - user's access token
 * @return {void}
 */
export const getFacebookUser = (token) => {
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
export const _responseInfoCallback = (error: ?Object, result: ?Object) => {
	if (error) {
		this.setState({ loading: !this.state.loading });
		this.errorMessage('The operation couldn’t be completed');
		LoginManager.logOut()
	} else {
		this.facebookLoginSucces(result);
	}
};

/**
 * facebookLoginSucces
 *
 * Sets the state with the user's details
 * @param {object} userDetails - User's information
 * @return {void}
 */
export const facebookLoginSucces = (userDetails) => {
	this.setState({
		firstName: userDetails.first_name,
		lastName: userDetails.last_name,
		socialEmail: userDetails.email,
		imgURL: userDetails.picture.data['url'],
		userAuthID: userDetails.id,
		authentication_type: "facebok"
	});
};
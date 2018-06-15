// react libraries
import React from 'react';

// react-native libraries
import { ScrollView, Dimensions, Platform } from 'react-native'

// third-party libraries
import { Item, Input, Icon } from 'native-base';

// fonts
import { Fonts } from "../../utils/Font";

class SignInForm extends React.Component {
	
	/**
	 * _handleFocusNextField
	 *
	 * changes focus to the next input field
	 * @param {string} nextField - ref value
	 * @private
	 */
	_handleFocusNextField = (nextField) => { this.refs[nextField].wrappedInstance.focus()};
	
	render() {
		let { width } = Dimensions.get('window');
		const {
			emailValue,
			passwordValue,
			onChangeEmailText,
			onChangePasswordText,
			onSubmit
		} = this.props;
		return (
			<ScrollView
				enableAutoAutomaticScroll={true}
				style={{
					marginLeft: width / 40,
					marginTop: 20,
					width: width / 1.5,
					borderWidth: 1,
					borderColor: '#a0a0a0',
					borderRadius: 10,
					backgroundColor: 'white'
				}}>
				<Item style={{ borderWidth: 1, borderColor: '#b3b4b4' }}>
					<Icon
						style={{ marginLeft: width / 20, color: '#b3b4b4' }}
						color={'b3b4b4'}
						active name='ios-mail-outline'
						type='Ionicons'
					/>
					<Input
						placeholder='Email'
						placeholderTextColor='#b3b4b4'
						value={emailValue}
						onChangeText={onChangeEmailText}
						autoCapitalize='none'
						style={{ fontWeight: '100', fontFamily: Fonts.GothamRounded }}
						returnKeyType={'next'}
						blurOnSubmit={false}
						autoFocus={true}
						ref="Email"
						onSubmitEditing={() => this._handleFocusNextField('Password')}
					/>
				</Item>
				<Item>
					<Icon
						active
						style={{ marginLeft: width / 20, color: '#b3b4b4' }}
						name='user-secret'
						type="FontAwesome"
						returnKeyType='next'
					/>
					<Input
						placeholder='Password'
						placeholderTextColor='#b3b4b4'
						secureTextEntry
						value={passwordValue}
						onChangeText={onChangePasswordText}
						autoCapitalize='none'
						style={{ fontWeight: '100', fontFamily: Fonts.GothamRounded}}
						returnKeyType={'next'}
						blurOnSubmit={false}
						ref="Password"
						onSubmitEditing={onSubmit}
					/>
				</Item>
			</ScrollView>
		)
	}
	
}

export { SignInForm };

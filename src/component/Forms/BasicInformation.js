// react libraries
import React from 'react';

// react-native libraries
import { ScrollView, Dimensions, Platform } from 'react-native'

// third-party libraries
import { Item, Input, Icon } from 'native-base';

// fonts
import { Fonts } from "../../utils/Font";

class BasicInformation extends React.Component {
	
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
			firstNameValue,
			lastNameValue,
			emailValue,
			passwordValue,
			confirmPasswordValue,
			onChangeFirstNameText,
			onChangeLastNameText,
			onChangeEmailText,
			onChangePasswordText,
			onChangeConfirmPasswordText,
			onSubmit
		} = this.props;
		return (
			<ScrollView
				enableAutoAutomaticScroll={true}
				style={{
					marginLeft: width / 40,
					marginTop: Platform.OS === 'ios' ? 20 : 10,
					width: width / 1.2,
					borderWidth: 1,
					borderColor: '#b3b4b4',
					borderRadius: 10,
					backgroundColor: 'white'
				}}>
				<Item style={{ borderWidth: 1, borderColor: '#b1b1b1' }}>
					<Icon
						style={{ marginLeft: width / 20, color: '#b1b1b1' }}
						color={'b3b4b4'}
						active
						name='user'
						type='Entypo'
					/>
					<Input
						placeholder='First Name'
						placeholderTextColor='#b3b4b4'
						value={firstNameValue}
						onChangeText={onChangeFirstNameText}
						autoCapitalize='none'
						style={{ fontWeight: '100', fontFamily: Fonts.GothamRounded }}
						returnKeyType={'next'}
						blurOnSubmit={false}
						autoFocus={true}
						onSubmitEditing={() => this._handleFocusNextField('LastName')}
					/>
				</Item>
				<Item style={{ borderWidth: 1, borderColor: '#b1b1b1' }}>
					<Icon
						style={{ marginLeft: width / 20, color: '#b1b1b1' }}
						color={'b3b4b4'}
						active
						name='user'
						type='Entypo'
					/>
					<Input
						placeholder='Last Name'
						placeholderTextColor='#b3b4b4'
						value={lastNameValue}
						onChangeText={onChangeLastNameText}
						autoCapitalize='none'
						style={{ fontWeight: '100', fontFamily: Fonts.GothamRounded }}
						returnKeyType={'next'}
						blurOnSubmit={false}
						ref="LastName"
						onSubmitEditing={() => this._handleFocusNextField('Email')}
					/>
				</Item>
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
						onSubmitEditing={() => this._handleFocusNextField('Confirm Password')}
					/>
				</Item>
				<Item>
					<Icon
						active
						style={{ marginLeft: width / 20, color: '#b3b4b4', borderBottomColor: 'white' }}
						name='user-secret'
						type="FontAwesome"
						returnKeyType='next'
					/>
					<Input
						placeholder='Confirm Password'
						placeholderTextColor='#b3b4b4'
						secureTextEntry
						value={confirmPasswordValue}
						onChangeText={onChangeConfirmPasswordText}
						autoCapitalize='none'
						style={{ fontWeight: '100', fontFamily: Fonts.GothamRounded}}
						returnKeyType={'next'}
						ref="Confirm Password"
						onSubmitEditing={onSubmit}
					/>
				</Item>
			</ScrollView>
		)
	}
	
}

export { BasicInformation };

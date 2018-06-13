// react
import React from 'react';

// react-native libraries
import { Dimensions, ImageBackground, StyleSheet, Platform, Image, TouchableOpacity, View } from 'react-native';

// third-party libraries
import { Container, Text, Content, Button, Toast, Icon, Body } from 'native-base';
import * as Animatable from 'react-native-animatable';
import * as axios from "axios"

// component
import { StatusBarComponent, CardNumber } from "../../common";

// fonts
import { Fonts } from "../../utils/Font";

// forms
import { DropDown } from "../Forms";

class SecondPage extends React.Component {
	
	state = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		
		dropDown: false,
		
		schools: [
			{
				"alias": "BU",
				"created_at": "2018-04-21T16:10:26.995375+00:00",
				"id": "-k-babcock",
				"modified_at": "2018-04-21T16:10:26.995375+00:00",
				"name": "babcock university"
			}
		],
		
		selectedSchool: ''
	};
	
	/**
	 * componentDidMount
	 *
	 * React life-cycle method sets user token
	 */
	componentDidMount() {
		
		this.setState({
			firstName: this.props.navigation.state.params.firstName,
			lastName: this.props.navigation.state.params.lastName,
			email: this.props.navigation.state.params.email,
			password: this.props.navigation.state.params.password,
			imgURL: this.props.navigation.state.params.imgURL,
			socialEmail: this.props.navigation.state.params.socialEmail,
			userAuthID: this.props.navigation.state.params.userAuthID,
			authentication_type: this.props.navigation.state.params.authentication_type,
		});
		
		this.getAllSchool();
	};
	
	/**
	 * getAllSchool
	 *
	 * fetches all school
	 */
	getAllSchool = async () => {
		this.setState({ loading: !this.state.loading });
		
		await axios.get(`https://moov-backend-staging.herokuapp.com/api/v1/all_schools`)
			.then((response) => {
				this.setState({
					schools: response.data.data.schools,
				});
			})
			.catch((error) => {
				this.setState({ loading: !this.state.loading });
			});
	};
	
	/**
	 * submitForm
	 *
	 * calls validate method before moving to the next form
	 */
	submitForm = () => {
		const { navigate } = this.props.navigation;
		navigate('FinalPage');
		
		Toast.show({ text: `Yay!`, type: "success", position: 'top' })
	};
	
	/**
	 * toggleDropDown
	 *
	 * toggles dropDown state
	 */
	toggleDropDown = () => {
		this.setState({ dropDown: !this.state.dropDown })
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
	 * getSelectedSchool
	 *
	 * gets the selected school
	 * @param {object} schoolName - school name
	 */
	getSelectedSchool = (schoolName) => {
		console.log(schoolName, 'My selected school')
		this.setState({
			dropDown: !this.state.dropDown,
			selectedSchool: schoolName.name
		})
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
							<Text style={getText}>Some</Text>
							<Text style={moovingText}> other stf!</Text>
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
									width: width / 3
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
								<CardNumber number={2} />
							</Animatable.View>
							
							{/*Right bar*/}
							<Animatable.View
								animation="fadeIn"
								delay={600}
								style={{
									marginTop: Platform.OS === 'ios' ? 10 : 20,
									width: width / 3
								}}
							>
								<Content
									contentContainerStyle={{
										borderWidth: Platform.OS === 'ios' ? 0.6 : 0.7,
										borderColor: '#e3dfe0',
										marginTop: Platform.OS === 'ios' ? 20 : 10,
										marginBottom: 10,
									}} />
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
							>Select Preferred Institution</Text>
							
							{/*Drop down selector*/}
							<Content
								contentContainerStyle={{
									marginTop: 22,
									width: width / 1.25,
									height: height / 10,
									borderColor: '#b1b1b1',
									borderWidth: 1,
									backgroundColor: '#fff',
									flexDirection: 'row'
								}}
							>
							
							{/*Left Icon*/}
								<TouchableOpacity onPress={this.toggleDropDown}>
									<Icon
										style={{
											marginLeft: 10,
											marginTop: 15,
											color: '#e0ddde'
										}}
										color={'b3b4b4'}
										active
										name='school'
										type='MaterialIcons'
									/>
								</TouchableOpacity>
								
								{/*Body*/}
								<Body
									style={{
										marginRight: 40,
									}}
								>
									<TouchableOpacity onPress={this.toggleDropDown}>
										<Text
											style={{ color: '#e0ddde', fontSize: 16 }}
										>
											{
												this.state.selectedSchool === ''
													? this.toTitleCase(this.state.schools[0].name)
													: this.toTitleCase(this.state.selectedSchool)
											}
										</Text>
									</TouchableOpacity>
								</Body>
								
								{/*Right drop down icon*/}
								<TouchableOpacity onPress={this.toggleDropDown}>
									<Icon
										style={{
											marginRight: 20,
											marginTop: 15,
											color: '#ea8c99'
										}}
										active
										name='angle-down'
										type='FontAwesome'
									/>
								</TouchableOpacity>
							
							</Content>
							
							{/*School Drop Down*/}
							{
								this.state.dropDown
									?
										<DropDown
											schools={this.state.schools}
											selectedSchool={
												this.state.selectedSchool === ''
													? this.state.schools[0].name
													: this.state.selectedSchool
											}
											onPress={this.getSelectedSchool}
											toTitleCase={this.toTitleCase}
										/>
									:
										<View/>
							}
							
						</Content>
						
						{/*Button*/}
						{
							this.state.dropDown
								?
									<View/>
								:
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
						}
						
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

export { SecondPage };

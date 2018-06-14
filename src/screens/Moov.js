// react library
import React from  'react';

// react-native libraries
import { AsyncStorage } from 'react-native';

// third-party libraries
import { Container, Text } from 'native-base';
import { NavigationActions } from 'react-navigation';

class Moov extends React.Component {
	
	state={
		userToken: ''
	};
	
	/**
	 * componentDidMount
	 *
	 * React life-cycle method sets user token
	 */
	async componentDidMount() {
		try {
			const value = await AsyncStorage.getItem('token');
			if (value !== null){
				this.setState({ userToken: value });
			}
		} catch (error) {
			// Error retrieving data
		}
	}
	
	render() {
		console.log(this.state);
		return(
			<Container>
				<Text>Moov Homepage</Text>
				<Text>Moov Homepage</Text>
				<Text>Moov Homepage</Text>
				<Text>Moov Homepage</Text>
				<Text>Moov Homepage</Text>
				<Text>Moov Homepage</Text>
			</Container>
		)
	}
	
}

export { Moov };

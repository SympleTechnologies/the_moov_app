// react
import React from 'react';

// react-native libraries
import {
	Dimensions,
} from 'react-native';

// third-party libraries
import { Container, Text } from 'native-base';

// component
import { StatusBarComponent } from "../../common";

class FirstPage extends React.Component {
	
	componentDidMount() {
	}
	
	render() {
		let { height, width } = Dimensions.get('window');
		
		return (
			<Container style={{ backgroundColor: '#ffffff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>First Page registration</Text>
			</Container>
		);
	}
}

export { FirstPage };

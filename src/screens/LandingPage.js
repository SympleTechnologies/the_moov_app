// react
import React from 'react';

// react-native libraries
import { StyleSheet, Text, View } from 'react-native';

class LandingPage extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>Welcome to our Landing page</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export { LandingPage };

// react library
import React from 'react';

// react-native libraries
import {Dimensions, Platform} from "react-native";

// third-party librariies
import { Container, Content, Spinner } from 'native-base';
import * as Animatable from 'react-native-animatable';

// component
import { StatusBarComponent } from "./StatusBarComponent";

class LoadingPage extends React.Component {
	render() {
		let { height, width } = Dimensions.get('window');
		
		return (
			<Container style={{ backgroundColor: 'white' }}>
				<StatusBarComponent hidden backgroundColor='#fff' barStyle="dark-content" />
				<Content contentContainerStyle={{
					flex: 1,
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center'
				}}>
					<Animatable.Image
						animation="fadeInLeftBig"
						delay={1000}
						styleName="medium"
						style={{
							marginLeft: 700,
							height: Platform.OS === 'ios' ? 90 :  height / 7.3,
							width:  Platform.OS === 'ios' ? 270 : width / 1.5,
						}}
						source={require('../../assets/images/moov-car-side.png')}
					/>
					<Animatable.Image
						animation="fadeInRightBig"
						delay={3000}
						styleName="medium"
						style={{
							marginRight: 700,
							height: Platform.OS === 'ios' ? 90 :  height / 7.3,
							width:  Platform.OS === 'ios' ? 270 : width / 1.5,
						}}
						source={require('../../assets/images/moov-car-right-side.png')}
					/>
					<Animatable.Image
						animation="fadeInLeftBig"
						delay={5000}
						styleName="medium"
						style={{
							marginLeft: 700,
							height: Platform.OS === 'ios' ? 90 :  height / 7.3,
							width:  Platform.OS === 'ios' ? 270 : width / 1.5,
						}}
						source={require('../../assets/images/moov-car-side.png')}
					/>
					<Spinner color='#004a80' />
					<Animatable.Image
						animation="fadeInRightBig"
						delay={7000}
						styleName="medium"
						style={{
							marginRight: 700,
							height: Platform.OS === 'ios' ? 90 :  height / 7.3,
							width:  Platform.OS === 'ios' ? 270 : width / 1.5,
						}}
						source={require('../../assets/images/moov-car-right-side.png')}
					/>
					<Animatable.Image
						animation="fadeInLeftBig"
						delay={9000}
						styleName="medium"
						style={{
							marginLeft: 700,
							height: Platform.OS === 'ios' ? 90 :  height / 7.3,
							width:  Platform.OS === 'ios' ? 270 : width / 1.5,
						}}
						source={require('../../assets/images/moov-car-side.png')}
					/>
					<Animatable.Image
						animation="fadeInRightBig"
						delay={11000}
						styleName="medium"
						style={{
							marginRight: 700,
							height: Platform.OS === 'ios' ? 90 :  height / 7.3,
							width:  Platform.OS === 'ios' ? 270 : width / 1.5,
						}}
						source={require('../../assets/images/moov-car-right-side.png')}
					/>
				</Content>
			</Container>
		)
	}
}

export { LoadingPage };

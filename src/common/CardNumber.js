// react libraries
import React from 'react';

// react-native libraries
import { Dimensions, Platform, StatusBar, View} from 'react-native'

// third-party libraries
import { Body, CardItem, Card, Text } from 'native-base';
import {Fonts} from "../utils/Font";

const CardNumber = ({ number }) => {
	let { height, width } = Dimensions.get('window');
	return (
		<View>
			<Card
				style={{
					marginTop: Platform.OS === 'ios' ? 10 : 5,
					marginBottom: Platform.OS === 'ios' ? 5 : 10,
					marginRight: 0,
					borderColor: '#ebebeb',
					width: Platform.OS === 'ios' ? width / 10 :width / 9,
				}}
			>
				<CardItem
					style={{
						height: Platform.OS === 'ios' ? height / 17 : height / 13.5,
					}}
				>
					<Body>
					<Text
						style={{
							marginTop: Platform.OS === 'ios' ? 4 : 0,
							color: '#f9a24f',
							fontWeight: '900',
							fontFamily: Fonts.GothamRounded
						}}>{number}</Text>
					</Body>
				</CardItem>
			</Card>
		</View>
	)
}

export { CardNumber };

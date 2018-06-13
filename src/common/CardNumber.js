// react libraries
import React from 'react';

// react-native libraries
import { Dimensions, Platform } from 'react-native'

// third-party libraries
import { Body, CardItem, Card, Text } from 'native-base';
import { Fonts } from "../utils/Font";

const CardNumber = ({ number }) => {
	let { height, width } = Dimensions.get('window');
	return (
			<Card
				style={{
					marginTop: Platform.OS === 'ios' ? 10 : 5,
					marginBottom: Platform.OS === 'ios' ? 5 : 10,
					marginRight: 1,
					borderColor: '#ebebeb',
					width: Platform.OS === 'ios' ? width / 9.5 :width / 8.37,
				}}
			>
				<CardItem
					style={{
						height: Platform.OS === 'ios' ? height / 17 : height / 14,
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
	)
};

export { CardNumber };

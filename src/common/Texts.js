// react
import React from 'react';

// third-party libraries
import { Text } from 'native-base';
import * as Animatable from 'react-native-animatable';

const Texts = ({ animation, delay, text, textColor, fontWeight }) => {
	return (
		<Animatable.Text
			animation={animation}
			delay={delay}
			style={{
				marginBottom: 5,
				fontSize: 15,
				color:textColor,
				fontWeight: fontWeight
			}}
		>
			{text}
		</Animatable.Text>
	)
}

export { Texts };

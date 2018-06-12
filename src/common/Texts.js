// react
import React from 'react';

// third-party libraries
import * as Animatable from 'react-native-animatable';

// fonts
import { Fonts } from "../utils/Font";

const Texts = ({ animation, delay, text, textColor, fontWeight }) => {
	return (
		<Animatable.Text
			animation={animation}
			delay={delay}
			style={{
				marginBottom: 5,
				fontSize: 15,
				color:textColor,
				fontWeight: fontWeight,
				fontFamily: Fonts.GothamRounded
			}}
		>
			{text}
		</Animatable.Text>
	)
}

export { Texts };

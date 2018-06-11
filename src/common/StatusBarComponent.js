// react libraries
import React from 'react';

// react-native libraries
import { StatusBar } from 'react-native'

const StatusBarComponent = ({ backgroundColor, barStyle, hidden }) => {
  return (
    <StatusBar
      hidden={hidden}
      barStyle={barStyle}
      backgroundColor={backgroundColor}
    />
  )
}

export { StatusBarComponent };

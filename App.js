import React from 'react';
import { View } from 'react-native';
import ScanScreen from './screens/scanScreen'

export default class App extends React.Component {
  render() {
    return (
      <View>
        <ScanScreen />
      </View>
    )
  }
}
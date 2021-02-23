import React from 'react';
import LottieView from 'lottie-react-native';

export default class SantaAnimation extends React.Component {
  render() {
    return (
      <LottieView
      source={require('../Assets/31017-job-ready.json')}
      style={{width:"60%"}}
       />
    )
  }
}
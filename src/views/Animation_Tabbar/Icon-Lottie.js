import * as React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import LottieView from 'lottie-react-native';
const bell = require('../../../assets/lottie-bell.json')
const bookmark = require('../../../assets/bookmark.json')
const email = require('../../../assets/email.json')
const eye = require('../../../assets/eye.json')
const wifi = require('../../../assets/wifi.json')
const Cor = require('../../../assets/Cor.json')
const LottieIcon = ({icon,isActive,...arg}) => {
  const animation = React.useRef(null);
  var animationSource = bell
  React.useEffect(() => {
    console.log("arg:",arg)
    // You can control the ref programmatically, rather than using autoPlay
if(isActive){
  setTimeout(() => {
    animation.current?.play()
  }, 550);
}
    // animation.current?.play()
    // setTimeout(() => {
    //   animation.current?.stop()
    // }, 100);
  });
  switch (icon) {
    case 'bell':
      animationSource = bell
      break;
    case 'bookmark':
      animationSource = bookmark
      break;
    case 'email':
      animationSource = email
      break;
    case 'eye':
      animationSource = eye
      break;
      case 'wifi':
        animationSource = wifi
        break;

        case 'Cor':
      animationSource = Cor
      break;

    default:
      break;
  }
  return (
    <View style={{
      // width: 200,
      // height: 200,
    }}>
      <LottieView
        autoPlay={false}
        loop={false}
        speed={1}
        onAnimationFinish={() => { console.log('onAnimationFinish') }}
        ref={animation}
        style={{
          width: 25,
          height: 25,
          // backgroundColor: '#eee',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={animationSource}
      />

    </View>
  );
};

const styles = StyleSheet.create({

});
export default LottieIcon;

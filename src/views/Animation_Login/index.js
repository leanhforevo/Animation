import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient, LinearTextGradient } from 'expo-linear-gradient';
import * as Animatable from "react-native-animatable";
import Animated, {
  useSharedValue, useDerivedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";

const BG_IMAGE = require("../../../assets/triangle.jpeg")
const BG_IMAGE2 = require("../../../assets/triangle2.jpeg")

const ITEM_IMAGE = require("../../../assets/itemTriangle3.png")

const Colors = {
  primary: "rgb(20,94,139)",
  second: "rgb(74,230,234)"
}
const config = {
  duration: 1200,
  easing: Easing.bezier(0.5, 0.01, 0, 1),
};
const { width, height } = Dimensions.get('window')
function App() {
  const [isLogin, setLogin] = useState(false);
  const anim_HeightImage = useSharedValue(350);
  const anim_transparent = useSharedValue(1);
  useEffect(() => {
    if (isLogin) {
      anim_HeightImage.value = 250
      anim_transparent.value = 0
    } else {
      anim_HeightImage.value = 350
      anim_transparent.value = 1
    }
  }, [isLogin])

  const _evtLogin = () => {
    setLogin(!isLogin)
  }

  const image_Header = useAnimatedStyle(() => {
    return {
      height: withTiming(anim_HeightImage.value, config),
    };
  });

  const Anim_Opacity = useAnimatedStyle(() => {
    return {
      opacity: withTiming(anim_transparent.value, config),
    };
  });
  const Anim_OpacityUp = useAnimatedStyle(() => {
    return {
      opacity: withTiming(Math.abs(anim_transparent.value - 1), config),
    };
  });

  const rotateZ = useDerivedValue(() => {
    return withTiming(isLogin ? 360 : 0, config);
  });
  const Anim_Item = useAnimatedStyle(() => {
    if (isLogin) {
      return {
        transform: [
          {
            translateY: withTiming(-100, config),
          },
          {
            translateX: withTiming(150 - width, config),
          },
          { rotateZ: `${rotateZ.value}deg` }
        ],
      };
    } else {
      return {
        transform: [
          {
            translateY: withTiming(0, config),
          }, {
            translateX: withTiming(0, config),
          },
          { rotateZ: `${rotateZ.value}deg` }
        ],
      };
    }

  });

  const Form_Fadeout = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(!isLogin ? 0 : height-250, config),
        },
      ],
    };
  });

  const Form_FadeLeft = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(!isLogin ? 0 : 100, config),
        },
      ],
    };
  });

  const Form_FadeRight = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(!isLogin ? -100 : 0, config),
        },
      ],
    };
  });
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 0 }}>
      {/* Image BG 1 */}
      <Animated.View style={[styles.groupRight, Anim_Opacity, Form_FadeLeft]}>
        <Text style={styles.txtTitle}>{"Together"}</Text>
        <Text style={styles.txtSubTitle}>{"We can work hard"}</Text>
      </Animated.View>


      <Animated.Image
        source={BG_IMAGE2}
        style={[{ width: '100%', height: 350 }, image_Header, Anim_Opacity]}
      />
      {/* Image BG2 */}
      <Animated.View style={[{
        position: 'absolute', zIndex: 999,
        left: 20, top: 100,
        height: 100
      }, Anim_OpacityUp, Form_FadeRight]}>
        <Text style={styles.txtTitle}>{"Sales"}</Text>
        <Text style={styles.txtSubTitle}>{"Manage Customer"}</Text>
      </Animated.View>
      <Animated.Image
        source={BG_IMAGE}
        style={[{ position: "absolute", top: 0, right: 0, left: 0, width: '100%', height: 350 }, image_Header, Anim_OpacityUp]}
      />

      {/* Image Child rotate */}
      <Animated.Image
        source={ITEM_IMAGE}
        style={[{
          position: 'absolute', zIndex: 999,

          width: 100, height: 100,
          right: 20, top: 290,
          // left: 20, top: 190,
        }, Anim_Item]}
      />

      <View style={{ flex: 1 }} />
      {/* FORM Login */}
      <Animated.View
        style={[{ height: height - 250, width: '100%', backgroundColor: '#fff', paddingVertical: 50, }, Anim_OpacityUp]}
        entering={ZoomIn.duration(300)}
        exiting={ZoomOut.duration(300)}
      >
        <View style={{
          alignItems: 'flex-start', paddingHorizontal: 15
        }}>
          <Text numberOfLines={2} style={styles.txtTitle}>{"Chào mừng bạn đến với hệ thống quản trị."}</Text>
          <Text numberOfLines={2} style={styles.txtSubTitle}>{"Vui lòng đăng nhập."}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{marginBottom:15}}>
          <InputOutline title={"Email"}/>
          <InputOutline title={"Password"}/>
          </View>
          <Button title='Đăng nhập ngay' onPress={_evtLogin} />
          <View style={{ marginHorizontal: 15, marginTop: 5, alignItems: 'center' }}>
            <Text style={styles.txtSubTitle}>{"Your project contains lock files generated by tools other than Yarn."}</Text>
          </View>
        </View>

      </Animated.View>
      {/* FORM welcome */}
      <Animated.View
        style={
          [{
            position: 'absolute', bottom: 0,
            height: height - 350, width: '100%',
            backgroundColor: '#fff', paddingVertical: 50,
          }, Form_Fadeout,Anim_Opacity]
        }
      >
        <View style={{
          alignItems: 'center', paddingHorizontal: 15
        }}>
          <Text numberOfLines={2} style={styles.txtTitle}>{"Its really strange that I found no solution over web for a very simple feature."}</Text>

        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Button title='Đăng nhập ngay' onPress={_evtLogin} />
          <View style={{ marginHorizontal: 15, marginTop: 5, alignItems: 'center' }}>
            <Text style={styles.txtSubTitle}>{"Your project contains lock files generated by tools other than Yarn."}</Text>
          </View>
        </View>
        <View style={{ height: StyleSheet.hairlineWidth, marginHorizontal: 15, backgroundColor: Colors.primary }} />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ButtonOutline title='Đăng ký tài khoản' />
          <View style={{ marginHorizontal: 15, marginTop: 5, alignItems: 'center' }}>
            <Text style={styles.txtSubTitle}>{"To clear this warning, remove package-lock.json."}</Text>
          </View>
        </View>
      </Animated.View>

    </View>
  );
}

const Button = ({ title = 'Button', onPress = () => { } }) => {
  return (

    <TouchableOpacity
      style={{ marginHorizontal: 15, height: 60, borderRadius: 100, overflow: 'hidden' }}
      onPress={onPress}
      activeOpacity={.9}
    >
      <LinearGradient
        // Button Linear Gradient
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        colors={[Colors.primary, Colors.second]}
        style={styles.button}
      >
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500' }}>{title}</Text>

      </LinearGradient>
    </TouchableOpacity>


  )
}

const ButtonOutline = ({ title = 'Button' }) => {
  return (

    <View style={styles.buttonOutline}>

      <Text style={{ color: Colors.primary, fontSize: 18, fontWeight: '500' }}>{title}</Text>

    </View>


  )
}

const InputOutline = ({ title = 'Email' }) => {
  return (

    <View style={{
      justifyContent: 'center',paddingLeft:20,marginBottom:15,
      marginHorizontal: 15, height: 60,
      borderRadius: 100, overflow: 'hidden',
      borderWidth: 1, borderColor: Colors.primary
    }}>

      <Text style={{ color: "#ccc", fontSize: 18, fontWeight: '500' }}>{title}</Text>

    </View>


  )
}

const styles = StyleSheet.create({
  button: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  buttonOutline: {
    justifyContent: 'center', alignItems: 'center',
    marginHorizontal: 15, height: 60,
    borderRadius: 100, overflow: 'hidden',
    borderWidth: 1, borderColor: Colors.primary
  },
  groupRight: {
    position: 'absolute', zIndex: 999,
    right: 20, top: 170,
    height: 100
  },

  txtTitle: { color: Colors.primary, fontSize: 32, fontWeight: 'bold' },
  txtSubTitle: { color: Colors.primary, fontSize: 16, fontWeight: '500', textAlign: 'center' }
})
export default App;
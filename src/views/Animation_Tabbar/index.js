import * as React from 'react';
import { Dimensions, SafeAreaView, View, Text, Platform, TouchableOpacity } from "react-native"
import Svg, { Path, PathProps } from 'react-native-svg';
import Slider from '@react-native-community/slider';
import * as shape from 'd3-shape';

import Animated, {
  useSharedValue, useDerivedValue, useAnimatedProps,
  withTiming, withSpring,
  useAnimatedStyle,
  Easing,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";


const { width } = Dimensions.get('window');

const height = 64;

const tabWidth = width / 4;
const configAnimation = { duration: 350 }
const AnimatedSvg = Animated.createAnimatedComponent(Svg)
const AnimatedPath = Animated.createAnimatedComponent(Path);
const Test = () => {
  const [tabSelected, setTabSelected] = React.useState(0);
  const [slider, setSlidder] = React.useState(0);
  const [slider2, setSlidder2] = React.useState(0);
  const anim_1 = useSharedValue(205);

  const left = shape.line()
    .x(d => d.x)
    .y(d => d.y)
    ([
      { x: 0, y: 0 },
      { x: width, y: 0 }
    ]);
  const right = shape.line()
    .x(d => d.x)
    .y(d => d.y)
    ([
      { x: width + tabWidth, y: 0 },
      { x: width * 2, y: 0 },
      { x: width * 2, y: height },
      { x: 0, y: height },
      { x: 0, y: 0 },
    ])

  const rounded = Platform.OS == 'ios' ? 20 : 10


  const arrTab = [1, 2, 3, 4, 5]
  const widthOfTab = (width / arrTab.length)
  const caculatePositionTab = (widthOfTab * tabSelected) - (width - widthOfTab)
  React.useEffect(() => {
    //left
    // anim_1.value = 205 + slider
    anim_1.value = 205 + caculatePositionTab
  }, [slider, tabSelected])


  // const tab = shape.line()
  // .x(d => d.x)
  // .y(d => d.y)
  // .curve(shape.curveBasis)
  // ([
  //   { x: width + slider - rounded, y: 0 },
  //   { x: width - rounded + slider - 30, y: 0 },
  //   { x: width + rounded + slider - 5, y: 0 },

  //   { x: width + 55 - height / 2 + slider, y: height / 2 + slider2 },

  //   { x: width + tabWidth - height / 2 + slider - 6, y: height - 20 + slider2 },
  //   { x: width + tabWidth - rounded + slider + 7, y: 0 },
  //   { x: width + tabWidth + rounded + slider + 5, y: 0 },
  // ])

  const Form_FadeLeft = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(anim_1.value, configAnimation),
        },
      ],
    };
  });
  const Anim_cruve =
    [
      { x: width + caculatePositionTab - rounded, y: 0 },
      { x: width - rounded + caculatePositionTab - 30, y: 0 },
      { x: width + rounded + caculatePositionTab - 5, y: 0 },

      { x: width + 55 - height / 2 + caculatePositionTab, y: height / 2 + slider2 },

      { x: width + tabWidth - height / 2 + caculatePositionTab - 6, y: height - 20 + slider2 },
      { x: width + tabWidth - rounded + caculatePositionTab + 7, y: 0 },
      { x: width + tabWidth + rounded + caculatePositionTab + 5, y: 0 },
    ]

  //   const animatedProps = useAnimatedProps(()=>{
  //     const fill = progress.value ? colorNumber2hex(interpolateColor(progress.value,
  //         [0,1],
  //         ['rgba(255,255,255,1)','rgba(0,148,68,1)'],
  //         'RGB')) : 'white'
  //     console.log(fill);
  //     return {d : d,fill : fill};
  // });


  const anim_2_x = useSharedValue((width + 55 - height / 2 + caculatePositionTab));
  const anim_2_y = useSharedValue((height / 2 + slider2).toFixed(0));

  const propsxxa = {
    x: withTiming(anim_2_x.value, configAnimation),
    y: withTiming(height / 2 + slider2, configAnimation)
  }


  const style22 = [
    { x: width + caculatePositionTab - rounded, y: 0 },
    { x: width - rounded + caculatePositionTab - 30, y: 0 },
    { x: width + rounded + caculatePositionTab - 5, y: 0 },

     { x: width + 55 - height / 2 + caculatePositionTab, y: height / 2 + slider2 },
   // propsxxa,
    { x: width + tabWidth - height / 2 + caculatePositionTab - 6, y: height - 20 + slider2 },
    { x: width + tabWidth - rounded + caculatePositionTab + 7, y: 0 },
    { x: width + tabWidth + rounded + caculatePositionTab + 5, y: 0 },
  ];

  const tab = shape.line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(shape.curveBasis)
    (style22)

  const animatedProps = useAnimatedProps(() => {
    return {
      d: `${right} ${left} ${tab}`,
    };
  });

  // const d = `${right} ${left} ${tab}`;
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={{ flex: 1, backgroundColor: 'rgb(96,208,225)', justifyContent: 'center' }}>
        <View style={{ height }}>


          <Animated.View style={[{
            zIndex: 999, position: 'absolute',
            left: 150, top: -20, width: 50, height: 50,
            borderRadius: 55, backgroundColor: '#fff'
          }, Form_FadeLeft]} />


          <AnimatedSvg
            style={{
              transform: [
                {
                  translateX: -100
                }
              ]
            }}
            width={width * 2}
            {...{ height }}>
            <AnimatedPath
              //{...{ d }} 
              animatedProps={animatedProps}
              fill="white" />
          </AnimatedSvg>
        </View>

        <View style={{ width: '100%', height: 50, backgroundColor: '#fff', marginTop: 10, flexDirection: 'row' }}>
          {
            arrTab.map((e, index) => {
              return <TouchableOpacity
                key={`tabItem${index}`}
                style={[{
                  width: width / arrTab.length,
                  height: 50,
                  backgroundColor: 'pink',
                  justifyContent: 'center',
                  alignItems: 'center',

                }, tabSelected == index ? {
                  borderWidth: 1,
                  borderColor: 'blue'
                } : {}]}
                onPress={() => { setTabSelected(index) }}
              >
                <Text>Tab {e} at {index}</Text>
              </TouchableOpacity>
            })
          }
        </View>


        <Text>width_screen:{width}</Text>
        <Text>width_screen /4:{width / arrTab.length}</Text>
        <Text>Tab Selected:{tabSelected}</Text>
        <Text>caculatePositionTab:{caculatePositionTab}</Text>

        <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#c2c2c2', marginTop: 50 }}>
          <Slider
            style={{ width: '80%', }}
            minimumValue={0 - width + 90}
            value={slider}
            onValueChange={(e) => setSlidder(e)}
            maximumValue={0}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
          <Text>{slider}</Text>
        </View>

        <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#c2c2c2', marginTop: 50 }}>
          <Slider
            style={{ width: '80%', }}
            minimumValue={0 - width + 150}
            value={slider2}
            onValueChange={(e) => setSlidder2(e)}
            maximumValue={width - 150}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
          <Text>{slider2}</Text>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default Test
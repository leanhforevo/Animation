import * as React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, View, Text, Platform, TouchableOpacity, LayoutAnimation, Animated as Animated2, UIManager } from "react-native"
import Svg, { Path, PathProps, Rect } from 'react-native-svg';
import Slider from '@react-native-community/slider';
import * as shape from 'd3-shape';

import Animated, {
  useSharedValue, useDerivedValue, useAnimatedProps,
  withTiming, withSpring,
  useAnimatedStyle,
  Easing,
  ZoomIn,
  ZoomOut,
  Value, interpolate,
  timing, EasingNode
} from "react-native-reanimated";


const { width, } = Dimensions.get('window');

const height = 64;

const tabWidth = width / 4;
const configAnimation = { duration: 350 }

const AnimatedSvg = Animated.createAnimatedComponent(Svg)
const AnimatedPath = Animated.createAnimatedComponent(Path);
const Test = () => {
  // if (UIManager.setLayoutAnimationEnabledExperimental) {
  //   UIManager.setLayoutAnimationEnabledExperimental(true);
  // }
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


  const arrTab = [1, 2,3,4,5 ]
  const widthOfTab = (width / arrTab.length)
  const caculatePositionTab = (widthOfTab * tabSelected) - (width - widthOfTab) + 4 + rounded

  React.useEffect(() => {
    anim_1.value = 198 + caculatePositionTab - 50 - slider
    // LayoutAnimation.spring()
  }, [slider, tabSelected, slider2])




  const data = [
    { x: width + caculatePositionTab - rounded, y: 0 },
    { x: width - rounded + caculatePositionTab - 40, y: 0 },
    { x: width + rounded + caculatePositionTab - 40, y: 0 },

    { x: width + 55 - height / 2 + caculatePositionTab - 15, y: height / 2 + 16 - 2 - slider2 },

    { x: width + tabWidth - height / 2 + caculatePositionTab - 20, y: height - 20 + 16 - 10 - slider2 },
    { x: width + tabWidth - rounded + caculatePositionTab, y: 0 },
    { x: width + tabWidth + rounded + caculatePositionTab, y: 0 },
  ];
  const tab = shape.line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(shape.curveBasis)
    (data)


  const animatedProps = useAnimatedProps(() => {
    return {
      d: `${right} ${left} ${tab}`,
    };
  });

  // const d = `${right} ${left} ${tab}`;


  const caculatePositionTab1111 = useAnimatedStyle(() => {
    const caculatePositionTab11112 = interpolate(anim_1.value - 200,
      [-342, 0],
      [0, 75],
    );
    return {
      borderRadius: withTiming(caculatePositionTab11112, configAnimation)
    };
  });

  const fixedTabSample = [
    `M517.5,0L828,0L828,64L0,64L0,0 M0,0L414,0 M86.80000000000001,0L80.13333333333334,0C73.46666666666668,0,60.13333333333335,0,60.13333333333335,0C60.13333333333335,0,73.46666666666668,0,84.80000000000001,7.666666666666667C96.13333333333334,15.333333333333334,105.46666666666668,30.666666666666668,117.38333333333333,39C129.3,47.333333333333336,143.8,48.666666666666664,156.38333333333333,41C168.96666666666667,33.333333333333336,179.63333333333335,16.666666666666668,191.63333333333333,8.333333333333334C203.63333333333335,0,216.9666666666667,0,223.63333333333333,0L230.3,0`,
    `M517.5,0L828,0L828,64L0,64L0,0 M0,0L414,0 M169.60000000000002,0L162.93333333333337,0C156.26666666666668,0,142.93333333333337,0,142.93333333333337,0C142.93333333333337,0,156.26666666666668,0,167.60000000000002,7.666666666666667C178.93333333333337,15.333333333333334,188.26666666666668,30.666666666666668,200.18333333333337,39C212.10000000000002,47.333333333333336,226.60000000000002,48.666666666666664,239.1833333333333,41C251.76666666666668,33.333333333333336,262.43333333333334,16.666666666666668,274.43333333333334,8.333333333333334C286.43333333333334,0,299.7666666666667,0,306.43333333333334,0L313.1,0`,
    `M517.5,0L828,0L828,64L0,64L0,0 M0,0L414,0 M252.39999999999998,0L245.73333333333335,0C239.06666666666663,0,225.73333333333335,0,225.73333333333335,0C225.73333333333335,0,239.06666666666663,0,250.4,7.666666666666667C261.7333333333333,15.333333333333334,271.06666666666666,30.666666666666668,282.98333333333335,39C294.9,47.333333333333336,309.4,48.666666666666664,321.98333333333335,41C334.56666666666666,33.333333333333336,345.2333333333333,16.666666666666668,357.23333333333335,8.333333333333334C369.2333333333333,0,382.5666666666666,0,389.23333333333335,0L395.9,0`,
    `M517.5,0L828,0L828,64L0,64L0,0 M0,0L414,0 M335.2,0L328.53333333333336,0C321.8666666666666,0,308.5333333333333,0,308.53333333333336,0C308.5333333333333,0,321.8666666666666,0,333.2,7.666666666666667C344.5333333333333,15.333333333333334,353.8666666666666,30.666666666666668,365.7833333333333,39C377.7,47.333333333333336,392.2,48.666666666666664,404.7833333333333,41C417.3666666666666,33.333333333333336,428.0333333333333,16.666666666666668,440.0333333333333,8.333333333333334C452.0333333333333,0,465.3666666666666,0,472.0333333333333,0L478.7,0`,
    `M517.5,0L828,0L828,64L0,64L0,0 M0,0L414,0 M418,0L411.3333333333333,0C404.6666666666667,0,391.3333333333333,0,391.3333333333333,0C391.3333333333333,0,404.6666666666667,0,416,7.666666666666667C427.3333333333333,15.333333333333334,436.6666666666667,30.666666666666668,448.5833333333333,39C460.5,47.333333333333336,475,48.666666666666664,487.5833333333333,41C500.1666666666667,33.333333333333336,510.8333333333333,16.666666666666668,522.8333333333334,8.333333333333334C534.8333333333334,0,548.1666666666666,0,554.8333333333334,0L561.5,0`
  ]
  const animatedProps2 = interpolate(tabSelected,
    [0, 5],
    [-160, 160],
  );

  // const Dot_Animation = useAnimatedStyle(() => {
  //   const animatedProps2zzx = interpolate(tabSelected,
  //     [0, 5],
  //     [-135, width - 40 - 100],
  //   );
  //   return {
  //     transform: [
  //       {
  //         translateX: withTiming(animatedProps2zzx, configAnimation),
  //       },
  //     ],
  //   };
  // });
  const DotPosition = useSharedValue(0);
  const Dot_Animation = useAnimatedStyle(() => {
    const animatedValueX = interpolate(tabSelected,
      [0, arrTab.length],
      [-130, width - 152],
    );

    const animatedOpacity = interpolate(DotPosition.value,
      [0, 100],
      [1, 0],
    );
    return {
      opacity:withTiming(animatedOpacity, configAnimation),
      transform: [
        {
          translateX: withTiming(animatedValueX, configAnimation),
         
        },
        {
          translateY: withTiming(DotPosition.value, configAnimation),
        }
      ],
    };
  });

  const SVG_TabAnimation = useAnimatedStyle(() => {
    
    const animatedProps2zzx = interpolate(tabSelected,
      [0, arrTab.length],
      [-40, width - 60],
    );
    return {
      transform: [
        {
          translateX: withTiming(animatedProps2zzx, configAnimation,(ok)=>{
            console.log("SVG_TabAnimation:",ok)
            DotPosition.value=0
          }),
        },
      ],
    };
  });
  console.log(" `${right} ${left} ${tab} ${tabSelected}`:", tabSelected + ":" + `${right} ${left} ${tab}`)
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={{ flex: 1, backgroundColor: 'rgb(96,208,225)', justifyContent: 'center' }}>
        <View style={{ height }}>
          <Animated.View
            style={[styles.circalButton,
              Dot_Animation
            ]} ><Text>{tabSelected}</Text></Animated.View>

          <Animated.View style={[{
            transform: [
              {
                translateX: animatedProps2
              }
            ]
          }, SVG_TabAnimation]}>
            <Svg
              style={[{
                transform: [
                  {
                    translateX: -300
                  }
                ]
              },
                // Form_FadeLeft
              ]}
              width={width * 4}
              {...{ height }}>
              <AnimatedPath

                d={fixedTabSample[3]}
                fill="white" />
              {/* <AnimatedPath
              //{...{ d }} 
              animatedProps={animatedProps}
              // d={fixedTabSample[tabSelected]}
              fill="white" /> */}

              {/* <AnimatedPath
            d={'M40,40L33,60L60,60L65,40Z'}
            stroke="blue"
          /> */}
            </Svg>
          </Animated.View>

<View style={{ width: '100%', height: 50,  marginTop: 10, flexDirection: 'row',position:'absolute' }}>
          {
            arrTab.map((e, index) => {
              return <TouchableOpacity
                key={`tabItem${index}`}
                style={[{
                  width: width / arrTab.length,
                  height: 50,
                  // backgroundColor: 'pink',
                  justifyContent: 'center',
                  alignItems: 'center',

                }]}
                onPress={() => {
                  setTabSelected(index);
                  DotPosition.value=200
                }}
              >
                {tabSelected!=index&&<Text>Tab {e} at {index}</Text>}
              </TouchableOpacity>
            })
          }
        </View>
        </View>

        


        <Text>width_screen: {width}</Text>
        <Text>width_screen / {arrTab.length} : {width / arrTab.length}</Text>
        <Text>Tab Selected: {tabSelected}</Text>
        <Text>caculatePositionTab: {caculatePositionTab}</Text>
        {/* <Text>this.scrollEndDragVelocity:{scrollEndDragVelocity}</Text> */}
        <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#c2c2c2', marginTop: 50 }}>
          <Slider
            style={{ width: '80%', }}
            minimumValue={- width}
            maximumValue={width}
            value={slider}
            onValueChange={(e) => setSlidder(e)}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
          <Text>{'slider'}</Text>
          <Text>{slider}</Text>
        </View>

        <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#c2c2c2', marginTop: 50 }}>
          <Slider
            style={{ width: '80%', }}
            minimumValue={- width}
            maximumValue={width}
            value={slider2}
            onValueChange={(e) => setSlidder2(e)}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
          <Text>{'slider2'}</Text>
          <Text>{slider2}</Text>
        </View>
        <Animated.View style={[{
          width: 100,
          height: 100,
          backgroundColor: 'blue',
          // borderRadius: caculatePositionTab1111,
          transform: [
            // { translateX: anim },
          ],
        }, caculatePositionTab1111]} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  circalButton: {
    zIndex: 999, position: 'absolute',
    left: 150, top: -20, width: 55, height: 55,
    borderRadius: 55, backgroundColor: 'pink',justifyContent:'center',alignItems:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  }
})
export default Test
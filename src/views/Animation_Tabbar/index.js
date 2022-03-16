import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";

const headerHeight = Platform.OS == 'ios' ? 22 : 0;
const tabbarHeight = headerHeight + 50
const colorPrimary = "rgb(42,100,241)";
const colorError = "rgb(235,81,71)";
const sampleData = [{
  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/2048px-BMW_logo_%28gray%29.svg.png",
  title: "BMW",
  amount: "20,000 ",
  date: "22/2/2222",
  status: "Connect",
},
{
  logo: "https://gmolsolutions.com/wp-content/uploads/2020/06/image-43.png",
  title: "Free Dom",
  amount: "15,795",
  date: "1/3/2002",
  status: "Recive",
},
{
  logo: "https://img.etimg.com/thumb/msid-59738997,width-640,resizemode-4,imgsize-21421/nike.jpg",
  title: "Nike",
  amount: "185 ",
  date: "04/05/1999",
  status: "connect",
},
{
  logo: "https://designs.vn/wp-content/images/09-08-2013/logo_lagi_8_resize.JPG",
  title: "StarBuck",
  amount: "20,000 ",
  date: "24/6/1999",
  status: "connect",
},
{
  logo: "https://cdn.thukyluat.vn/nhch-images//CauHoi_Hinh/9eb6abaa-8cda-456c-ad66-26ba4da23ffe.jpg",
  title: "Nokey",
  amount: "18,250 ",
  date: "22/2/2432",
  status: "connect",
}

];
const arrTabbar = [
  "medical-outline",
  "nuclear-outline",
  "person-circle-outline",
  "options-outline",
  "settings-outline"
]
function App() {
  const [isShowDetail, setShowDetail] = useState(null);
  const [selected, setSelected] = useState(null);

  const randomWidth = useSharedValue(0);
  const animMenu = useSharedValue(-50);

  const animTabbar = useSharedValue(0);
  const offset = useSharedValue(0);
  const config = {
    duration: 770,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };
  const _evtOnpressItem = (index) => {
    setSelected(index);
    offset.value = -20; //Math.random()
    setShowDetail(false);
    randomWidth.value = 150;
    animTabbar.value = -100
    animMenu.value = 80;
  };

  const _evtBack = () => {
    if (!isShowDetail) {
      setShowDetail(true);
      randomWidth.value = 0;
      animTabbar.value = 0
      animMenu.value = -50;
      setSelected(null);
    }
  };

  const backgroundHeader = useAnimatedStyle(() => {
    return {
      height: withTiming(randomWidth.value, config),
    };
  });

  const stylesBTNMenu1 = useAnimatedStyle(() => {
    return {
      bottom: withTiming(animMenu.value, {
        // ...config,
        duration: 400,
      }),
    };
  });
  const stylesBTNMenu2 = useAnimatedStyle(() => {
    return {
      bottom: withTiming(animMenu.value, {
        // ...config,
        duration: 300,
      }),
    };
  });

  const stylesTabbar = useAnimatedStyle(() => {
    return {
      bottom: withTiming(animTabbar.value, {

        duration: 600,
      }),
    };
  });
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 0,
            backgroundColor: colorPrimary,
          },
          backgroundHeader,
        ]}
      />

      <Animated.View
        style={[
          styles.menu1,
          stylesBTNMenu1,
        ]}
      ><Ionicons
          name="chatbubble-ellipses-outline"
          size={22}
          color={'#fff'}
        /></Animated.View>
      <Animated.View
        style={[
          styles.menu2,
          stylesBTNMenu2,
        ]}
      ><Ionicons
          name="people-outline"
          size={22}
          color={'#fff'}
        /></Animated.View>
      <StatusBar style="auto" />
      <HeaderItem isShowDetail={isShowDetail} onBack={_evtBack} />

      {sampleData.map((item, index) => {
        return (
          <ItemList
            key={`itemKey${index}`}
            onPress={() => {
              _evtOnpressItem(index);
            }}
            index={index}
            selected={selected}
            data={item}
          />
        );
      })}
      {selected != null && selected >= 0 ? (
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            top: 225,
          }}
          entering={ZoomIn.duration(300).delay(300)}
        >
          <View style={{ paddingHorizontal: 15, height: 90, flexDirection: 'row', borderBottomWidth: StyleSheet.hairlineWidth, borderColor: 'gray' }}>
            <View style={{ flex: 1, justifyContent: 'space-around', paddingVertical: 5, }}>
              <Text style={styles.txtPlaceHolder}>DH #1293753873</Text>
              <Text style={styles.txtBold}>ACB Bank</Text>
              <Text style={styles.txtPlaceHolder}>alex Kitahorie</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'flex-end', paddingVertical: 5, }}>
              <Text style={styles.txtPlaceHolder}>21/02/2014 18:06</Text>
              <Text style={styles.txtBold}>Incomming</Text>
              <Text numberOfLines={1} style={styles.txtPlaceHolder}>£37 Global Copyright Service - Get protected in 5 minutes.</Text>
            </View>
          </View>
          {sampleData.map((item, index) => {
            return (
              <ItemDetail
                key={`itemKey${index}`}
                onPress={() => {
                  _evtOnpressItem(index);
                }}
                index={index}
                selected={selected}
                data={item}
              />
            );
          })}
        </Animated.View>
      ) : null}
      <Animated.View style={[
        {
          width: '100%', height: tabbarHeight, bottom: 0,
          position: 'absolute', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: 'gray',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          backgroundColor: '#fff',
          overflow: 'hidden'
        },
        stylesTabbar
      ]
      }>
        <View style={{ marginBottom: headerHeight, flex: 1, flexDirection: 'row' }}>

          {arrTabbar.map((e, i) => {
            return <TouchableOpacity
              key={`itemTab${i}`}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => { alert(e) }}
            >
              <View style={styles.containerIcon}>
                <Ionicons
                  name={e}
                  size={22}
                  color={colorPrimary}
                />
              </View>
            </TouchableOpacity>
          })}
        </View>
      </Animated.View>
    </View>
  );
}
const ItemDetail = ({ onPress = () => { }, index, selected, data = {} }) => {
  return (
    <Animated.View
      style={{
        marginLeft: 15,
        marginTop: 5,
        borderRadius: 8,
        backgroundColor: "#fff",
        alignItems: 'center',
        flexDirection: 'row',
      }}
      entering={ZoomIn.duration(300 + (index * 50)).delay(300)}
      exiting={ZoomOut.duration(300 - (index * 50))}
    >
      <View style={{ flex: 1, justifyContent: 'space-around', paddingVertical: 5, }}>
        <Text numberOfLines={2} style={styles.txtNormal}>React Native Animation | Examples for Animating in React NativeReact Native Animation | Examples for Animating in React Native</Text>
        <Text numberOfLines={1} style={styles.txtPlaceHolder}>React Native Animation Using Hooks: Floating Heads – Full-Stack FeedReact Native Animation Using Hooks</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'flex-end', paddingVertical: 5, }}>
        <Text style={styles.txtBold}>$ 178</Text>

      </View>
      <View style={styles.containerIcon}>
        <Ionicons
          name="chevron-forward-outline"
          size={30}
          color={'gray'}
        />
      </View>
    </Animated.View>
  );
};
const ItemList = ({ onPress = () => { }, index, selected, data = {} }) => {
  const [itemPosition, setitemPosition] = useState({});

  const offset = useSharedValue(0);
  const scaleAnimation = useSharedValue(1);
  const animationOpacityView = useSharedValue(1);

  useEffect(() => {
    loadAnim();
  }, [selected]);

  const loadAnim = () => {
    if (selected === null) {
      resetAnimation();
      return true;
    }
    if (index == selected) {
      onActive();
    } else {
      onHide();
    }
  };

  const onActive = () => {
    offset.value = 0 - ((itemPosition?.layout?.y || 0) - 100);
  };

  const onHide = () => {
    scaleAnimation.value = withTiming(0.6, {
      duration: 600 - itemPosition?.target || 0,
    });
    animationOpacityView.value = withTiming(0, { duration: 300 });
  };

  const resetAnimation = () => {
    offset.value = 0;
    scaleAnimation.value = withTiming(1, { duration: 600 });
    animationOpacityView.value = withTiming(1, { duration: 600 });
  };
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(offset.value, { duration: 600 }),
        },
      ],
    };
  });
  const scaleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleAnimation.value,
        },
      ],
      opacity: animationOpacityView.value,
    };
  });

  return (
    <Animated.View
      onLayout={(e) => {
        setitemPosition(e.nativeEvent);
      }}
      style={[styles.containerItem, animatedStyles, scaleStyles]}
    >
      <TouchableOpacity
        style={{ flex: 1, }}
        activeOpacity={0.9}
        onPress={() => {
          if (onPress && !selected && selected != 0) {
            onPress()
          }
        }}
      >
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Image
            source={{ uri: data?.logo }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
            resizeMode={'cover'}
          />
          <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>{data?.title}</Text>
          </View>
          <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons
              name="download-outline"
              size={25}
              color={colorPrimary}
            />
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 15, paddingBottom: 5 }}>

          <View style={{ flex: 1, justifyContent: "space-around" }}>
            <Text style={styles.txtPlaceHolder}>{"Amount"}</Text>
            <Text style={styles.txtBold}>$ {data?.amount}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: "space-around" }}>
            <Text style={styles.txtPlaceHolder}>{"Date"}</Text>
            <Text style={{ fontSize: 16, }}>{data?.date}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: "space-around" }}>
            <Text style={styles.txtPlaceHolder}>{"Status"}</Text>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>{data?.status}</Text>
          </View>
        </View>
      </TouchableOpacity>

    </Animated.View>
  );
};

const HeaderItem = ({ isShowDetail = null, onBack = () => { } }) => {
  const refTitle = useRef(null);
  const refOptions = useRef(null);
  const refBTNBack = useRef(null);

  useEffect(() => {
    loadForm();
  }, [isShowDetail]);

  const loadForm = () => {
    if (isShowDetail) {
      _onShow();
    } else if (isShowDetail === false) {
      _onHide();
    } else {
      refBTNBack.current.animate("fadeOutUp", 10);
    }
  };

  const _onShow = () => {
    refTitle.current.animate("fadeInDown", 350);
    refOptions.current.animate("fadeInDown", 350);
    refBTNBack.current.animate("fadeOutUp", 350);
  };

  const _onHide = () => {
    refTitle.current.animate("fadeOutUp", 350);
    refOptions.current.animate("fadeOutUp", 350);
    refBTNBack.current.animate("fadeInDown", 350);
  };
  return (
    <View
      style={{
        height: headerHeight + 120,
        paddingTop: headerHeight,
        width: "100%",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingHorizontal: 15,
          flexDirection: "row",
        }}
      >
        <Animatable.Text
          ref={refTitle}
          style={{ fontSize: 28, fontWeight: "bold", color: "#000" }}
        >
          My Checks
        </Animatable.Text>
        <Animatable.View
          ref={refOptions}
          style={{ flex: 1, justifyContent: "flex-end", flexDirection: "row" }}
        >
          <View style={styles.containerIcon}>
            <Ionicons name="archive-outline" size={32} color={colorPrimary} />
          </View>
          <View style={styles.containerIcon}>
            <Ionicons
              name="add-circle-outline"
              size={32}
              color={colorPrimary}
            />
          </View>
        </Animatable.View>
      </View>
      <Animatable.View
        ref={refBTNBack}
        style={{
          position: "absolute",
          top: headerHeight + 22,
          width: '100%',
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          onPress={onBack}
        >
          <View style={styles.containerIcon}>
            <Ionicons name="chevron-back-outline" size={32} color={"#fff"} />
          </View>
          <Text style={{ fontSize: 18, fontWeight: "500", color: "#fff" }}>
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end",
          }}
          onPress={onBack}
        >
          <View style={styles.containerIcon}>
            <Ionicons name="paw-outline" size={32} color={"#fff"} />
          </View>

        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerIcon: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  containerItem: {
    height: 120,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  txtPlaceHolder: { fontSize: 15, fontWeight: "500", color: 'gray' },
  txtBold: { fontSize: 18, fontWeight: "bold" },
  txtNormal: { fontSize: 16, },

  menu1: {
    position: "absolute",
    zIndex: 9999,
    bottom: -50,
    left: 120,
    right: 0,
    height: 50, width: 50, backgroundColor: colorError,
    borderRadius: 25, justifyContent: 'center', alignItems: 'center'
  },
  menu2: {
    position: "absolute",
    zIndex: 9999,
    bottom: -50,
    left: 250,
    right: 0,
    height: 50, width: 50, backgroundColor: colorPrimary,
    borderRadius: 25, justifyContent: 'center', alignItems: 'center'
  }
});

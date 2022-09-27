import { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  StatusBar,
  FlatList,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
const widthDevice = Dimensions.get("window").width;
export default function App() {
  const refFlatlist = useRef(null);
  useEffect(() => { }, []);

  const data = [
    //animal
    {
      title: "Animal",
      src: "https://w7.pngwing.com/pngs/57/323/png-transparent-black-lion-background-wild-beast-lion-wild-thumbnail.png",
      isHeader: true,
    },
    {
      title: "Lion",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC7pf-PZe15omyqRtrstSd4gElnwHAX0Obife5qkLGU48FmsXX6ocz7-ZmyElRKgG9Qac&usqp=CAU",
      isHeader: false,
    },
    {
      title: "curiously",
      src: "https://thumbs.dreamstime.com/b/wild-doe-curiously-looking-something-fores-wild-doe-curiously-looking-something-fores-234465847.jpg",
      isHeader: false,
    },
    {
      title: "wolf",
      src: "https://img.freepik.com/premium-photo/wild-wolf-coyote-coywolf-winter-snowy-fores-california-wildlife-fauna-usa_333216-1606.jpg?w=2000",
      isHeader: false,
    },
    //fores
    {
      title: "Fores",
      src: "https://w0.peakpx.com/wallpaper/116/724/HD-wallpaper-green-forest-forest-1366x768-green-thumbnail.jpg",
      isHeader: true,
    },

    {
      title: "curiously",
      src: "https://gallery.yopriceville.com/var/resizes/Nature/Beautiful_Green_Forest_Background.jpg?m=1358636400",
      isHeader: false,
    },
    {
      title: "wolf",
      src: "https://thumbs.dreamstime.com/b/green-forest-26752813.jpg",
      isHeader: false,
    },
    //Space
    {
      title: "Fores",
      src: "https://cdn.pixabay.com/photo/2016/10/20/18/35/earth-1756274__340.jpg",
      isHeader: true,
    },
    {
      title: "Lion",
      src: "https://media.istockphoto.com/photos/exoplanet-in-deep-space-picture-id692243858?k=20&m=692243858&s=170667a&w=0&h=roZ6reXgvUKG6qJEuLh8c0mcyJb7fAG6LhVua88BFbk=",
      isHeader: false,
    },
    {
      title: "curiously",
      src: "https://img.freepik.com/free-vector/hand-painted-watercolor-galaxy-background_52683-63443.jpg?w=360",
      isHeader: false,
    },
    {
      title: "wolf",
      src: "https://images.theconversation.com/files/223749/original/file-20180619-126537-5l632j.jpg?ixlib=rb-1.1.0&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip",
      isHeader: false,
    },
    //ww2
    {
      title: "tank",
      src: "https://media.istockphoto.com/photos/tanks-and-planes-rush-into-battle-on-besieged-burning-land-picture-id1171956238?k=20&m=1171956238&s=612x612&w=0&h=iZoYAw2OGJvpFS1Pc1uGsgSo4qsCvRznzno5KmSsxVE=",
      isHeader: true,
    },
    {
      title: "Lion",
      src: "https://t4.ftcdn.net/jpg/01/09/51/23/360_F_109512359_psl6yE013qLU06oZc1LCsU61PngB4tWk.jpg",
      isHeader: false,
    },
    {
      title: "curiously",
      src: "https://t4.ftcdn.net/jpg/01/42/09/21/360_F_142092156_J55smXhrQvHllyrBdP6balzWXch9xMl6.jpg",
      isHeader: false,
    },
    {
      title: "wolf",
      src: "https://t4.ftcdn.net/jpg/01/33/68/71/360_F_133687166_Z9X5afogFwOuVOyz04P6NlCBuTaKwtTM.jpg",
      isHeader: false,
    },
  ];
  const arrHeader = data.reduce(function (a, e, i) {
    if (e.isHeader) a.push(i);
    return a;
  }, []);
  const onPress = (index) => {
    console.log("index:", index);
    refFlatlist.current.scrollToIndex({ index: index });
    // console.log("refFlatlist:", refFlatlist.current);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={""} />
      <ScrollView
        style={styles.containerScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {arrHeader.map((e, i) => (
          <TouchableOpacity
          key={`itemHeadler${i}`}
            style={styles.btnHeaderStyle}
            onPress={() => {
              onPress(e);
            }}
          >
            <Text>{i}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        ref={refFlatlist}
        data={[...data]}
        keyExtractor={(e, i) => `indexitem${i}`}
        // ListHeaderComponent={()=><View  style={styles.headerList}><Text>HEADER</Text></View>}
        // stickyHeaderHiddenOnScroll={true}
        stickyHeaderIndices={arrHeader}
        // ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        // style={{flexGrow: 0}}
        renderItem={({ item, index }) => {
          const isHeader = arrHeader.find((e) => e == index) > -1;

          return (
            <ItemList
              key={`itemFlatlist${index}`}
              item={item}
              index={index}
              isHeader={isHeader}
            />
          );
        }}
      />
    </SafeAreaView>
  );
}
const ItemList = ({ item, index, isHeader }) => {
  const [heightImage, setHeight] = useState(100);
  useEffect(() => {
    getHeight();
  }, []);

  const getHeight = () => {
    Image.getSize(item.src, (width, height) => {
      setHeight(isHeader ? 100 : (widthDevice * height) / width);
    });
  };

  const styleItem = isHeader > -1 ? styles.headerList : styles.containerItem;
  return (
    <View key={`itemFlatlistc${index}`} style={{ ...styleItem, height: isHeader ? 100 : heightImage }}>
      <Text>{item.title}</Text>
      <Text>index:{index}</Text>
      <Image
        style={{ ...StyleSheet.absoluteFillObject }}
        source={{ uri: item.src, cache: "force-cache" }}
      />
      <Text
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          fontSize: 21,
          fontWeight: "500",
          color: "#fff",
        }}
      >
        {heightImage.toFixed(0)} X {widthDevice}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerList: {
    width: "100%",
    height: 80,
    backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
  },
  containerItem: {
    height: 155,
    // marginHorizontal: 15,
    backgroundColor: "#c2c2c2",
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 10,
    overflow: "hidden",
  },
  btnHeaderStyle: {
    width: 80,
    height: 40,
    borderRadius: 80,
    marginRight: 10,
    backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
  },
  containerScroll: {
    width: "100%",
    paddingVertical: 10,
    // backgroundColor: "#fff",
    // marginBottom: 10,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
});

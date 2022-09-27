import { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";

export default function App() {
  const refFlatlist = useRef(null)
  useEffect(() => { }, []);

  const data = [...Array.from({ length: Math.pow(5, 2) }, (_, i) => i + 1)];
  const arrHeader = [0, 3, 6, 9, 12];
  const onPress = (index) => {
    console.log("index:", index)
    refFlatlist.current.scrollToIndex({ index: index })
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
            style={styles.btnHeaderStyle}
            onPress={() => { onPress(e) }}
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
        stickyHeaderHiddenOnScroll={true}
        stickyHeaderIndices={arrHeader}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item, index }) => {
          const checkHeader = arrHeader.find((e) => e == index);
          const styleItem =
            checkHeader > -1 ? styles.headerList : styles.containerItem;
          return (
            <View style={styleItem}>
              <Text>isHeader:{checkHeader > -1 ? "ok" : "no"}</Text>
              <Text>index:{index}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerList: {
    width: "100%",
    height: 50,
    backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
  },
  containerItem: {
    height: 105,
    marginHorizontal: 15,
    backgroundColor: "#c2c2c2",
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "#fff",
    marginBottom: 10,
    flexDirection: "row",
    paddingHorizontal: 10,
  }
});

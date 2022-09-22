import { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const sizeItem = 30;
const marginItem = 8;
const Button = ({ select, onPress }) => {
  let icon;
  if (select == "x" || select == "o") {
    icon = select === "x" ? "close-outline" : "radio-button-off";
  }
  return (
    <TouchableOpacity
      style={{
        ...styles.item,
      }}
      onPress={onPress}
    >
      {icon && <Ionicons name={icon} size={24} color="black" />}
    </TouchableOpacity>
  );
};
export default function App() {
  const [data, setData] = useState(["x", null, "o"]);
  const [size, setSize] = useState(3);
  const [sizeWin, setSizeWin] = useState(3);
  const [turn, setTurn] = useState("x");
  const sizeContainer = sizeItem * size + size * marginItem + 10;
  useEffect(() => {
    loadData();
  }, [size]);

  const loadData = () => {
    const caculateSize = [
      ...Array.from({ length: Math.pow(size, 2) }, (_, i) => i + 1),
    ];
    setData([...caculateSize]);
    setTurn("x");
  };

  useEffect(() => {
    const turnCheck = turn == 'x' ? "o" : "x"

    const checkWin = (data) => {
      const lengArr = data.length
      let dataWin = {
        checkDuongCheo: 0,
        checkDuongCheo2: 0,
        row: [],
        col: []
      };
      for (let k = 0; k < lengArr; k++) {
        if (data[k][lengArr - k - 1] == turnCheck) {
          dataWin.checkDuongCheo++;
        } else if (data[k][lengArr - k - 1] == turn && dataWin.checkDuongCheo < sizeWin) {
          dataWin.checkDuongCheo = 0
        }


        if (data[k][k] == turnCheck) {
          dataWin.checkDuongCheo2++;
        } else if (data[k][k] == turn && dataWin.checkDuongCheo2 < sizeWin) {
          dataWin.checkDuongCheo2 = 0
        }
        //check row
        let countRow = 0
        for (let j = 0; j < lengArr; j++) {
          if (data[k][j] == turnCheck) {
            countRow++;
          } else if (data[k][j] == turn && countRow < sizeWin) {
            countRow = 0
          }
        }
        dataWin.row[k] = countRow;
        // check col
        let countCol = 0
        for (let j = 0; j < lengArr; j++) {
          if (data[j][k] == turnCheck) {
            countCol++;
          } else if (data[j][k] == turn && countCol < sizeWin) {
            countCol = 0
          }
        }
        dataWin.col[k] = countCol;
      }

      return dataWin;
    }
    const dataSplit = data.reduce((all, one, i) => {
      const ch = Math.floor(i / size);
      all[ch] = [].concat(all[ch] || [], one);
      return all;
    }, []);
    console.log("dataSplit:", dataSplit);
    const datacheckWin = checkWin(dataSplit);
    const findCol = datacheckWin.col.find((e) => e >= sizeWin)
    const findRow = datacheckWin.row.find((e) => e >= sizeWin)
    if (
      datacheckWin.checkDuongCheo >= sizeWin ||
      datacheckWin.checkDuongCheo2 >= sizeWin || findRow || findCol) {
      alert('done')
    }
    console.log("datacheckWin:", datacheckWin)
  }, [data]);

  const ItemPressed = (e, i) => {
    console.log("e,i:", e, i);
    if (e * 0 === 0) {
      let newData = [...data];
      newData[i] = turn;
      console.log("newData:", newData);
      setData(newData);
      setTurnCaculate();
    }
  };
  const setTurnCaculate = () => {
    if (turn == "x") {
      setTurn("o");
    } else {
      setTurn("x");
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ position: "absolute", top: 100, alignItems: "center" }}>
        <CBN_InCrease data={size} setData={(e) => setSize(e)} label='size' />

        <CBN_InCrease data={sizeWin} setData={(e) => setSizeWin(e)} label='sizeWin' />

       <View style={{flexDirection:'row'}}>
       <Text style={{width:100}}>Turn:</Text>
       <Text style={{width:100}}>{turn}</Text>
       </View>
        <TouchableOpacity style={styles.buttonIn} onPress={() => loadData()}>
          <Text>Clear</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          ...styles.containerView,
          maxWidth: sizeContainer,
        }}
      >
        {[...data].map((e, i) => {
          return (
            <Button
              key={`itemKey${i}`}
              select={e}
              onPress={() => {
                ItemPressed(e, i);
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

const CBN_InCrease = ({ data = 0, setData = () => { }, label = 'label' }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: 'center' }}>
      <Text style={{ width: 100 }}>{label}:</Text>
      <TouchableOpacity
        style={styles.buttonIn}
        onPress={() => setData(data - 1)}
      >
        <Text>-</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ padding: marginItem, margin: marginItem }}>
        <Text>{data}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonIn}
        onPress={() => setData(data + 1)}
      >
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  buttonIn: {
    padding: marginItem,
    margin: marginItem,
    backgroundColor: "pink",
  },
  containerView: {
    borderWidth: 1,
    borderColor: "gray",
    paddingLeft: marginItem,
    paddingTop: marginItem,
    minWidth: sizeItem,
    flexWrap: "wrap",
    flexDirection: "row",
    borderRadius: 4,
  },
  item: {
    width: 30,
    height: 30,
    marginRight: marginItem,
    marginBottom: marginItem,
    backgroundColor: "#fff",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

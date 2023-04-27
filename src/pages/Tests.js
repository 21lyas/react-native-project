import React, { useState, useEffect } from "react";
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

export const Tests = ({ navigation }) => {
  const [tests, setTests] = useState([]);
  const [obj, setObj] = useState({});
  async function init() {
    await Promise.all([getTests(), getToken()]);
  }

  useEffect(() => {
    init();
  }, []);

  async function getTests() {
    axios.get(`http://185.4.180.111/api/test`).then((data) => {
      setTests(data.data);
      console.log(tests);
    });
  }

  async function getToken() {
    let token = await AsyncStorage.getItem("token");
    setObj(jwtDecode(token));
  }

  console.log(obj);

  const [refreshing, setRefreshing] = React.useState(false);

  return (
    <View style={{ backgroundColor: "#dedede", height: "100%" }}>
      <View style={styles.container}>
        <Text style={styles.tittle}>Тесты</Text>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getTests} />
        }
      >
        <View>
          {tests.map((item, i) => (
            <View style={styles.testContainer} key={i}>
              <View>
                <Text style={styles.testName}>{item.name}</Text>
                <Text style={styles.testDesc}>{item.description}</Text>
                <Text style={styles.testDesc}>
                  {item.data.length} тестовых вопросов
                </Text>
              </View>

              <View style={{ right: 0, position: "absolute" }}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    navigation.navigate("TestPass", item);
                  }}
                >
                  <Text style={styles.textBtn}>Пройти</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#122d64",
    height: "20%",
    alignItems: "center",
    justifyContent: "flex-end",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  tittle: {
    fontSize: 25,
    color: "white",
    marginBottom: 10,
  },
  testContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    borderRadius: 5,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  testName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#122d64",
    padding: 2,
    textTransform: "capitalize",
  },
  testDesc: {
    width: "100%",
    fontSize: 14,
  },
  btn: {
    backgroundColor: "#122d64",
    width: "auto",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    top: "60%",
  },
  textBtn: {
    color: "#f2f0fa",
    fontWeight: "bold",
  },
});

export default Tests;

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
import Moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

export const StudentProfile = ({ navigation }) => {
  const [student, setStudent] = useState({});
  const [testAttempts, setTestAttempts] = useState([]);
  const [obj, setObj] = useState({});
  async function init() {
    await Promise.all([getToken(), getStudent(), getTestAttempts()]);
  }

  useEffect(() => {
    init();
  }, []);

  async function getToken() {
    let token = await AsyncStorage.getItem("token");
    setObj(jwtDecode(token));
  }

  async function getStudent() {
    axios.get(`http://185.4.180.111/api/student/${obj.id}`).then((data) => {
      setStudent(data.data);
      console.log(student);
    });
  }

  async function getTestAttempts() {
    axios
      .get(`http://185.4.180.111/api/test-attempt/${obj.id}`)
      .then((data) => {
        setTestAttempts(data.data);
        console.log(testAttempts);
      });
  }

  const [refreshing, setRefreshing] = React.useState(false);
  return (
    <View style={{ backgroundColor: "#dedede", height: "100%" }}>
      <View style={styles.container}>
        <Text style={styles.tittle}>
          {student.name} - №{student.book_code}
        </Text>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getTestAttempts} />
        }
      >
        {testAttempts.map((item, i) => (
          <View style={styles.testContainer} key={i}>
            <View>
              <Text style={styles.testName}>{item.name}</Text>
              <Text style={styles.testDesc}>{item.description}</Text>
              <Text style={styles.testDesc}>
                {Moment(item.createdAt).format("DD/MM/YYYY HH:mm")}
              </Text>
            </View>

            <View style={{ right: 0, position: "absolute" }}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  navigation.navigate("SeeAttemptStudent", item);
                }}
              >
                <Text style={styles.textBtn}>
                  {item.right_answers} / {item.question_count}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#122d64",
    height: "20%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  tittle: {
    fontSize: 25,
    color: "white",
    marginTop: 80,
  },
  testContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#f2f0fa",
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
    color: "#fff",
    fontWeight: "bold",
  },
});

export default StudentProfile;

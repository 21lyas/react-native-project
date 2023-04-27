import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
} from "react-native";

import axios from "axios";
import lodash from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

export const TestPass = ({ route, navigation }) => {
  const [attempt, setAttempt] = useState(route.params);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [obj, setObj] = useState({});

  async function init() {
    await Promise.all([getToken()]);
  }

  async function getToken() {
    let token = await AsyncStorage.getItem("token");
    setObj(jwtDecode(token));
  }

  useEffect(() => {
    init();
  }, []);

  const showPrevButton = currentQuestion !== 0;
  const showNextButton = currentQuestion !== attempt.data.length - 1;

  console.log(showPrevButton);

  function nextQuestion() {
    setCurrentQuestion((prev) => prev + 1);
  }

  function prevQuestion() {
    setCurrentQuestion((prev) => prev - 1);
  }

  async function endTest() {
    console.log(attempt);
    let count = 0;

    attempt.data.map((item, i) => {
      if (item.answers.length !== item.studentAnswers.length) {
        count = 0;
      }
      // Сортируем оба массива
      const sortedArr1 = item.answers.slice().sort();
      const sortedArr2 = item.studentAnswers.slice().sort();

      let isEqual = lodash.isEqual(sortedArr1, sortedArr2);

      if (isEqual) {
        count = count + 1;
      }
      console.log(isEqual);
      console.log(item);

      item.isRight = isEqual;
    });
    console.log(`Набрано : ${count}`);

    let testAttempt = {};

    testAttempt.name = `${attempt.name} попытка`;
    testAttempt.question_count = attempt.data.length;
    testAttempt.right_answers = count;
    testAttempt.testId = attempt.id;
    testAttempt.studentId = obj.id;
    testAttempt.attempt = attempt.data;

    const response = await axios
      .post("http://185.4.180.111/api/test-attempt", testAttempt, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setModalVisible(false);
        navigation.navigate("SeeAttempt", testAttempt);
      })
      .catch((error) => console.log(error));

    console.log(testAttempt);
  }

  const addAnswers = (answer, i) => {
    if (!attempt.data[currentQuestion].studentAnswers.includes(answer)) {
      attempt.data[currentQuestion].studentAnswers.push(answer);
    } else {
      let index = attempt.data[currentQuestion].studentAnswers.indexOf(answer);
      if (index !== -1) {
        attempt.data[currentQuestion].studentAnswers.splice(index, 1);
      }
    }
    setAttempt(attempt);
    lodash.set(
      attempt,
      `data[${currentQuestion}].studentAnswers`,
      attempt.data[currentQuestion].studentAnswers
    );

    if (!showNextButton) {
      setCurrentQuestion(currentQuestion);
      setModalVisible(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };
  console.log(attempt);

  const alphabet = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
    4: "E",
    5: "F",
    6: "G",
    7: "H",
  };

  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <View style={styles.container}>
        <Text style={styles.tittle}>{route.params.name}</Text>
      </View>
      <Text
        style={{
          padding: 10,
          fontSize: 20,
          marginHorizontal: 10,
        }}
      >
        {currentQuestion + 1}. {attempt.data[currentQuestion].question}
      </Text>

      <View>
        {attempt.data[currentQuestion].responses.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => addAnswers(item, i)}
            style={
              attempt.data[currentQuestion].studentAnswers.includes(item)
                ? styles.selected
                : styles.option
            }
          >
            <Text
              key={i}
              style={{
                borderWidth: 1,
                borderColor: "black",
                padding: 10,
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              {alphabet[i]}
            </Text>
            <Text
              style={{
                padding: 10,
                fontSize: 16,
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View>
        <ScrollView
          horizontal={true}
          style={{
            display: "flex",
            flexDirection: "row",
            width: "80%",
            marginHorizontal: 30,
            marginTop: 10,
            height: "5%",
          }}
        >
          {attempt.data.map((item, i) => (
            <TouchableOpacity key={i} style={{ alignItems: "center" }}>
              <Text
                style={{
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderColor: "#909090",
                  borderRadius: 7,
                  paddingHorizontal: 5,
                  paddingVertical: 3,
                  fontWeight: "bold",
                  fontSize: 14,
                  marginHorizontal: 3,
                  color: currentQuestion === i ? "white" : "#909090",
                  backgroundColor: currentQuestion === i ? "#909090" : "white",
                }}
                onPress={() => setCurrentQuestion(i)}
              >
                {i + 1}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.btnBlock}>
        <View style={styles.nextPrevBlock}>
          {showPrevButton && (
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#122d64",
                  color: "#fff",
                  paddingVertical: 10,
                  paddingHorizontal: 25,
                  borderRadius: 10,
                  display: "",
                }}
                onPress={() => {
                  prevQuestion();
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Prev</Text>
              </TouchableOpacity>
            </View>
          )}

          {showNextButton && (
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#122d64",
                  color: "#fff",
                  paddingVertical: 10,
                  paddingHorizontal: 25,
                  borderRadius: 10,
                  alignItems: "flex-end",
                  display: "",
                }}
                onPress={() => {
                  nextQuestion();
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Next</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View>
          <TouchableOpacity
            style={styles.textBtn}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Завершить тест
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Завершить тест?</Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: "#909090",
                  marginRight: 10,
                  borderRadius: 15,
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Отменить
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#122d64",
                  padding: 10,
                  borderRadius: 15,
                }}
                onPress={() => endTest()}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Завершить
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  content: {
    margin: 20,
  },
  question: {
    fontSize: 18,
  },
  btnBlock: {
    marginHorizontal: 20,
    bottom: 0,
    marginTop: "auto",
    marginBottom: 20,
    flexDirection: "column",
  },
  nextPrevBlock: {
    justifyContent: "space-between",
    bottom: 0,
    marginTop: "auto",
    marginBottom: 20,
    flexDirection: "row",
  },
  textBtn: {
    backgroundColor: "#122d64",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 40,
      height: 20,
    },
    shadowOpacity: 0.7,
    shadowRadius: 200,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 21,
    fontWeight: "bold",
  },
  option: {
    flexDirection: "row",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 15,
    backgroundColor: "white",
  },
  selected: {
    flexDirection: "row",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 15,
    backgroundColor: "#909090",
  },
});

export default TestPass;

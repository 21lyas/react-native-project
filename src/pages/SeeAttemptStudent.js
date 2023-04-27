import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Moment from "moment";

export const SeeAttemptStudent = ({ route, navigation }) => {
  console.log({ route });
  const attempt = route.params;
  console.log(attempt);
  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <View style={styles.container}>
        <Text style={styles.tittle}>{attempt.name}</Text>
      </View>

      <ScrollView>
        <View style={{ padding: 15 }}>
          <Text style={styles.result}>
            Результат: {attempt.right_answers}/{attempt.question_count}
          </Text>
          <Text style={styles.date}>
            Дата: {Moment(attempt.createdAt).format("DD/MM/YYYY HH:mm")}
          </Text>
        </View>

        <View style={{ padding: 15 }}>
          {attempt.attempt.map((item, i) => (
            <View key={i} style={{ marginBottom: 25 }}>
              <Text style={{ fontSize: 18 }}>
                {i + 1}){item.question}
              </Text>

              {item.studentAnswers.map((el) => (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: item.isRight ? "green" : "red",
                  }}
                >
                  {el}
                </Text>
              ))}

              {item.answers.map((el) => (
                <Text
                  style={{
                    fontSize: 16,
                    padding: 5,
                    width: "auto",
                    backgroundColor: "#ffc107",
                  }}
                >
                  Правильный ответ: {el}
                </Text>
              ))}
            </View>
          ))}

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate("StudentProfile");
            }}
          >
            <Text style={styles.textBtn}>Вернуться</Text>
          </TouchableOpacity>
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
  result: {
    fontSize: 25,
    fontWeight: "bold",
  },
  date: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#9ea0a3",
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#122d64",
    width: 100,
    borderRadius: 10,
  },
  textBtn: {
    fontSize: 16,
    color: "#fff",
  },
});

export default SeeAttemptStudent;

import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Options = ({ test, currentQuestion }) => {
  const [attempt, setAttempt] = useState(test);

  const [options, setOptions] = useState(
    attempt.data[currentQuestion].responses
  );
  const [answers, setAnswers] = useState(
    attempt.data[currentQuestion].studentAnswers
  );

  const addAnswers = (answer, i) => {
    if (!answers.includes(answer)) {
      setAnswers([...answers, answer]);
    } else {
      let index = answers.indexOf(answer);
      if (index > -1) {
        setAnswers(answers.filter((a) => a !== answer));
      }
    }
  };

  console.log(currentQuestion);
  console.log(answers);
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
    <View>
      {options.map((item, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => addAnswers(item, i)}
          style={answers.includes(item) ? styles.selected : styles.option}
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
  );
};

const styles = StyleSheet.create({
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

export default Options;

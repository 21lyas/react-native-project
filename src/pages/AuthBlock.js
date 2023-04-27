import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAuth } from "../useAuth";

export const AuthBlock = ({ navigation }) => {
  const { isAuth, setIsAuth } = useAuth(false);
  console.log(isAuth);

  const [student, setStudent] = useState({
    name: "",
    phone: "",
    mail: "",
    book_code: "",
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [book_code, setBookCode] = useState("");

  async function regStudent() {
    student.name = name;
    student.phone = phone;
    student.mail = mail;
    student.book_code = book_code;
    console.log(student);

    try {
      const response = await axios.post(
        "http://185.4.180.111/api/student",
        student,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const token = response.data.token;
      await AsyncStorage.setItem("token", token);
      console.log(token);
      setIsAuth(true);
      return token;
    } catch (e) {
      console.log(e);
    }

    console.log(isAuth);
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require("../../assets/logo.png")}
      />
      <View style={styles.navbar}>
        <TextInput
          placeholder={"ФИО"}
          style={styles.textInput}
          onChangeText={(value) => setName(value)}
        />
        <TextInput
          placeholder={"Номер телефона"}
          style={styles.textInput}
          onChangeText={(value) => setPhone(value)}
        />
        <TextInput
          placeholder={"E-mail"}
          style={styles.textInput}
          onChangeText={(value) => setMail(value)}
        />
        <TextInput
          placeholder={"Номер Книги"}
          style={styles.textInput}
          onChangeText={(value) => setBookCode(value)}
        />
        <TouchableOpacity style={styles.btn} onPress={regStudent}>
          <Text style={styles.textBtn}>Зарегистрироваться</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#122d64",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  tinyLogo: {
    color: "white",
    justifyContent: "center",
    width: 300,
    height: 300,
    bottom: -90,
  },
  navbar: {
    backgroundColor: "#f2f0fa",
    height: "65%",
    width: "100%",
    justifyContent: "flex-end",
    paddingBottom: 150,
    bottom: -100,
    alignItems: "center",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  textInput: {
    width: "70%",
    backgroundColor: "#dedede",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    fontSize: 20,
  },
  btn: {
    backgroundColor: "#122d64",
    width: "70%",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  textBtn: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

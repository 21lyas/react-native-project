import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Navbar from "./src/components/NavBar";
import { AuthBlock } from "./src/pages/AuthBlock";

export const AuthContext = React.createContext({
  isAuth: false,
  setIsAuth: (auth) => {},
});

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <View style={styles.container}>
        {!isAuth ? <AuthBlock /> : <Navbar independent={true} />}
      </View>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#122d64",
    width: "100%",
  },
  content: {
    width: "100%",
  },
});

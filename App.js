import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useState} from "react";

export default function App() {
  const [users, setUsers] = useState([
      {name: 'Ilyas', usename: '21lyas'},
      {name: 'Kairat', usename: 'kairow'},
  ])
  console.log(users)
  return (
    <View style={styles.container}>
      <Text>{users[0].name}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

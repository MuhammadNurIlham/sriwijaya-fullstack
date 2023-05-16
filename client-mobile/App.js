import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Text, Box } from "native-base";

export default function App() {
  return (
    <>
      <NativeBaseProvider>
        <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
          <Text>Open up App.js to start working on your app this using native base provider!</Text>
        </Box>
        <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
      </NativeBaseProvider>
    </>
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

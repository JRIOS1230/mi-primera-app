import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Main } from "./components/Main";
import { Logo } from "./components/Logo";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Main />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
});


{/* esto es propio de react native
      <Image
        source={icon}
        style={{
          width: 100,
          height: 100,
          resizeMode: "center",
        }}
      />
      <Text style={{ color: "white" }}>Mi primera aplicación</Text>{/*siempre deben estar asi*/}
      {/*<Button title="Pulsa Aqui" onPress={() => alert("Hola")} />
      <TouchableHighlight underlayColor={"#09f"} onPress={() => alert("Hola")}>
        <Text style={{ color: "white" }}>Presioname</Text>
      </TouchableHighlight>{/*Boton Personalizado, pero se recomienda utilizar el Pressable*/}
      {/*<Pressable
        onPress={() => {}}
        style={({ pressed }) => [
          { backgroundColor: pressed ? "rgb(210, 230, 255)" : "white" },
          styles.wrapperCustom,
        ]}
      >
        {({ pressed }) => (
          <Text style={{ fontSize: pressed ? 32 : 16 }}>
            {pressed ? "pressed!" : "press me"}
          </Text>
        )}
      </Pressable> */}

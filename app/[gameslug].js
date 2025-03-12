import { Link } from "expo-router";
import { Text, View, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Screen from "../components/Screen.jsx";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { getGameDetails } from "../lib/metacritic.js";
import { ActivityIndicator, ScrollView } from "react-native";
import { Score } from "../components/Score.jsx";

export default function Detail() {
  const { gameslug } = useLocalSearchParams();
  const [gameInfo, setGameInfo] = useState(null);

  useEffect(() => {
    if (gameslug) {
      getGameDetails(gameslug).then(setGameInfo);
    }
  }, [gameslug]);

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#ffee0" },
          headerTintColor: "black",
          headerLeft: () => {},
          headerTitle: "The legend of Zelda: Breath of the wild",
          headerRight: () => {},
        }}
      />
      <View>
        {gameInfo === null ? (
          <ActivityIndicator color={"#fff"} size={"large"} />
        ) : (
          <ScrollView>
            <View className="justify-center items-center text-center">
                <Image className="mb-4 rounded"
                source={{ uri: gameInfo.img }}
                style= {{ width: 214, height: 294 }}
                />
                <Score score={gameInfo.score} maxScore={100}/>
              <Text className="text-white text-center font-bold text-2xl">
                {gameInfo.title}
              </Text>
              <Text className="text-white/70 mt-4 text-left font-bold mb-8 text-base">
                {gameInfo.description}
              </Text>
            </View>
          </ScrollView>
        )}
      </View>
    </Screen>
  );
}

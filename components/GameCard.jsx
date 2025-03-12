// components/GameCard.jsx
import { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Animated,
  Pressable,
} from "react-native";
import { Score } from "./Score";
import { Link } from "expo-router";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

// Componente base para mostrar la información del juego
export function GameCard({ game }) {
  return (
    <Link href={`/${game.id}`} asChild>
      <StyledPressable className="active:opacity-70 border border-black active:border-white/50 mb-2 bg-gray-500/10 rounded-xl p-4">
        <View className="flex-row gap-4">
          <Image source={{ uri: game.image }} style={styles.image} />
          <View className="flex-shrink">
            <Text style={styles.title}>{game.title}</Text>
            <Score score={game.score} maxScore={100} />
            <Text style={styles.description}>
              {game.description.slice(0, 100)}...
            </Text>
          </View>
        </View>
      </StyledPressable>
    </Link>
  );
}

// Componente animado que envuelve a GameCard
// Se exporta por default para importarlo sin llaves en Main.jsx
function AnimatedGameCard({ game, index }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      delay: index * 250,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <GameCard game={game} />
    </Animated.View>
  );
}

export default AnimatedGameCard;

const styles = StyleSheet.create({
  image: {
    width: 107,
    height: 147,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#eee",
  },
});

import { Pressable } from "react-native";
import { ScrollView } from "react-native";
import { HomeIcon } from "../../components/Icons";
import Screen from "./../components/Screen";
import { Link } from "expo-router";
import { Text } from "react-native";

export default function About() {
    return (
        <Screen>
        <ScrollView>
            <Link asChild href="/">
                <Pressable>
                    {({ pressed }) => <HomeIcon style={{ opacity: pressed ? 0.5 : 1 }}/>}
                </Pressable>
            </Link>
            <Text className="text-white font-bold mb-8 text-2xl">Esto es la página de about</Text>
            <Text className="text-white text-white/90 mb-4">
                lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nunc eget nisl auctor, dictum mi nec, ultricies lacus.
                Sed non sapien nec justo ultricies scelerisque.
                Donec auctor, leo nec tincidunt vehicula, purus lacus
                fermentum nunc, ac ultrices nisi felis a libero.
            </Text>
            <Text className="text-white text-white/90 mb-4">
                lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nunc eget nisl auctor, dictum mi nec, ultricies lacus.
                Sed non sapien nec justo ultricies scelerisque.
                Donec auctor, leo nec tincidunt vehicula, purus lacus
                fermentum nunc, ac ultrices nisi felis a libero.
            </Text>
            <Text className="text-white text-white/90 mb-4">
                lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nunc eget nisl auctor, dictum mi nec, ultricies lacus.
                Sed non sapien nec justo ultricies scelerisque.
                Donec auctor, leo nec tincidunt vehicula, purus lacus
                fermentum nunc, ac ultrices nisi felis a libero.
            </Text>
            <Text className="text-white text-white/90 mb-4">
                lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nunc eget nisl auctor, dictum mi nec, ultricies lacus.
                Sed non sapien nec justo ultricies scelerisque.
                Donec auctor, leo nec tincidunt vehicula, purus lacus
                fermentum nunc, ac ultrices nisi felis a libero.
            </Text>
            <Text className="text-white text-white/90 mb-4">
                lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nunc eget nisl auctor, dictum mi nec, ultricies lacus.
                Sed non sapien nec justo ultricies scelerisque.
                Donec auctor, leo nec tincidunt vehicula, purus lacus
                fermentum nunc, ac ultrices nisi felis a libero.
            </Text>
        </ScrollView>
        </Screen>
    );
}

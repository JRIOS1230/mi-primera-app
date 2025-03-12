import { Link, Stack } from "expo-router";
import { View, Pressable  } from "react-native";
import Logo from "../components/Logo.jsx";
import { CircleInfoIcon } from "./Icons";

export default function Layout({}) { //este componente layout general envolverá toda la aplicación
    return (
        <View className="felx-1"> 
            <Stack
            screenOptions={{
                    headerStyle: { backgroundColor: "black" },
                    headerTintColor: "yellow",
                    headerTitle:"",
                    headerLeft: () => <Logo />,
                    headerRight: () => ( //aca se integro ya en el header quedando icono de detalle, logo y demas
                        <Link asChild href="/about">
                        <Pressable>
                            {({ pressed }) => (
                            <CircleInfoIcon style={{ opacity: pressed ? 0.5 : 1 }} />
                            )}
                        </Pressable>
                        </Link>
                    ),
            }} />{/*permite controlar tener mas control de las animaciones y estilos de algun de paginas web o aplicaciones*/}
        </View>
    );
}
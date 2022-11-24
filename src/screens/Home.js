import React from "react";
import TextInput  from "react-native";
import {
	Text,
	Link,
	HStack,
	Center,
	Heading,
	NativeBaseProvider,
	VStack,
	Box,
	Pressable,
	Button
} from "native-base";
import { useState } from "react";

const Home = ({ navigation }) => {
	const [text, setText] = useState("")

	return (
		<NativeBaseProvider>
			<Center
				_dark={{ bg: "blueGray.900" }}
				_light={{ bg: "blueGray.50" }}
				px={4}
				flex={1}
			>
				<VStack space={5} alignItems="center">
					<Heading size="lg">¡Bienvenido!</Heading>
					<HStack space={2} alignItems="center">
						<Text>Ingresa tu usuario</Text>
					</HStack>
					<TextInput
						onChangeText={onChangeText}
						value={text}
					/>
					

					<Button colorScheme="success" onPress={() => navigation.navigate('Demo')}>Ingresar</Button>
					
				</VStack>
			</Center>
		</NativeBaseProvider>
	);
}

export default Home;
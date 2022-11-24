import React from "react";
import axios from "axios";
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
	Button,
	Input
} from "native-base";
import { useState, useEffect } from "react";

const Home = ({ navigation }) => {
	const [user, setUser] = useState("")
	const [pass, setPass] = useState("")


	const auth = () => {		
		
		axios.post("http://127.0.0.1:3000/user/login" ,{
			email: user,
			contrasena: pass
		}).then( ({data}) => {
			console.log(data);
			if(data.login){
				console.log("bienvenido "+ data.nombre);
				navigation.navigate('Demo')
			}else{
				alert("Usuario no valido");
			}
		})
	}


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
					<Input mx="3" placeholder="Correo" w="100%" onChangeText={text => setUser(text)}/>
					
					<Input mx="3" placeholder="Contraseña" w="100%" onChangeText={text => setPass(text)}/>
					

					<Button colorScheme="success" onPress={() => auth() }>Ingresar</Button>
					
				</VStack>
			</Center>
		</NativeBaseProvider>
	);
}
//navigation.navigate('Demo')
export default Home;
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
	Input,
	Alert,
	IconButton,
	CloseIcon,
	Collapse
} from "native-base";
import { useState, useEffect } from "react";

const Login = ({ navigation }) => {
	const [user, setUser] = useState("")
	const [error, setError] = useState("")
	const [pass, setPass] = useState("")
	const [show, setShow] = useState(false)


	const auth = () => {		
		
		axios.post("http://127.0.0.1:3000/user/login" ,{
			email: user,
			contrasena: pass
		}).then( ({data}) => {
			console.log(data);
			if(data.login){
				console.log("bienvenido "+ data.nombre);
				navigation.navigate('Posts')
			}else{
				//alert("Usuario no valido");
				setShow(true)
				setError("Usuario inválido")
				setTimeout(() => {
					setShow(false)
					setError("")
				}, 5000);
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
				
				<Collapse isOpen={show}>
					<Alert w="100%" status="error">
						<VStack space={2} flexShrink={1} w="100%">
						<HStack flexShrink={1} space={2} justifyContent="space-between">
							<HStack space={2} flexShrink={1}>
							<Alert.Icon mt="1" />
							<Text fontSize="md" color="coolGray.800">
								{error}
							</Text>
							</HStack>
							<IconButton variant="unstyled" _focus={{
						borderWidth: 0
						}} icon={<CloseIcon size="3" />} _icon={{
						color: "coolGray.600"
						}} />
						</HStack>
						</VStack>
					</Alert>
				</Collapse>
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
export default Login;
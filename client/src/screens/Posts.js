import React from "react";
import axios from "axios";
import {
  Center,
  Heading,
  NativeBaseProvider,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  Box,
  FlatList,
  Spacer,
  Avatar,
  Alert,
	IconButton,
	CloseIcon,
	Collapse
} from "native-base";
import { useState, useEffect } from "react";

const Posts = () => {
    const [titulo, setTitulo] = useState("")
    const [desc, setDesc] = useState("")
    const [post, setPost] = useState([])
    const [error, setError] = useState("")
    const [show, setShow] = useState(false)

    const get_datos = () => {
        axios.get( "http://127.0.0.1:3000/news/get_news").then( ({data}) => {
          console.log(data)
          setPost(data.news)
        })
    }

    useEffect( () => {
      get_datos()
    }, [])

    const set_datos= () => {
      if(titulo == "" || desc == ""){
        //alert("datos vacios")
        setShow(true)
				setError("Datos vacíos")
				setTimeout(() => {
					setShow(false)
					setError("")
				}, 5000);
      }else{
        axios.post("http://127.0.0.1:3000/news/post_news" ,{
          titulo: titulo,
          descripcion: desc
        }).then( res => {
          console.log(res);
          get_datos()
          setTitulo("")
          setDesc("")
        })
      }
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
          <Heading size="lg">Publicaciones</Heading>
          <HStack space={2} alignItems="center">
						<Text>Nueva publicación</Text>
					</HStack>
          <Input value={titulo} mx="3" placeholder="Título" w="100%" onChangeText={text => setTitulo(text)}/>
          <Input  value={desc} mx="3" placeholder="Descripción" w="100%" onChangeText={text => setDesc(text)}/>

          <Button colorScheme="success" onPress={() => set_datos()}>Agregar</Button>

          <Heading size="lg">Lista de publicaciones</Heading>
          
        <FlatList data={post} renderItem={({
          item
        }) => <Box borderBottomWidth="1" _dark={{
          borderColor: "muted.50"
        }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
                <HStack space={[2, 3]} justifyContent="space-between">
                <Avatar size="48px" source={{
                  uri: "https://w7.pngwing.com/pngs/833/374/png-transparent-computer-icons-article-website-content-writer-publishing-search-engine-optimization-others-miscellaneous-angle-search-engine-optimization.png"
                }} />
                  <VStack>
                    <Text _dark={{
                color: "warmGray.50"
              }} color="coolGray.800" bold>
                      {item.titulo}
                    </Text>
                    <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
              }}>
                      {item.descripcion}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Text fontSize="xs" _dark={{
              color: "warmGray.50"
            }} color="coolGray.800" alignSelf="flex-start">
                    
                  </Text>
                </HStack>
              </Box>} keyExtractor={item => item.id} />
        
        </VStack>
      </Center>

    </NativeBaseProvider>
  );
}

export default Posts;
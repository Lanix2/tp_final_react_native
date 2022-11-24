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
  Box
} from "native-base";
import { useState, useEffect } from "react";

const Demo = () => {
    const [titulo, setTitulo] = useState("")
    const [desc, setDesc] = useState("")
    const [post, setPost] = useState([])

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
        alert("datos vacios")
      }else{
        axios.post("http://127.0.0.1:3000/news/post_news" ,{
          titulo: titulo,
          descripcion: desc
        }).then( res => {
          console.log(res);
          get_datos()
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
        <VStack space={5} alignItems="center">
          <Heading size="lg">Publicaciones</Heading>
          <HStack space={2} alignItems="center">
						<Text>Nueva publicación</Text>
					</HStack>
          <Input mx="3" placeholder="Título" w="100%" onChangeText={text => setTitulo(text)}/>
          <Input mx="3" placeholder="Descripción" w="100%" onChangeText={text => setDesc(text)}/>

          <Button colorScheme="success" onPress={() => set_datos()}>Agregar</Button>

          <Heading size="lg">Lista de publicaciones</Heading>
          <Box>
            {post.map( elem => 
            <>
              <Box alignSelf="center" // bg="primary.500"
            _text={{
              fontSize: "md",
              fontWeight: "medium",
              color: "black",
              letterSpacing: "lg"
            }}>
                Titulo: {elem.titulo}
              </Box>
              <Box>
                Descripción: {elem.descripcion}
              </Box>
            </>
            )}
            
        </Box>
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
}

export default Demo;
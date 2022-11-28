import React, { useEffect, useState } from "react"

import {
    Alert,
	IconButton,
	CloseIcon,
	Collapse
    ,VStack
    ,HStack
    ,Text
} from 'native-base'

const AlertCustom = ({msg, tipo} ) => {
    const [texto, setTexto] = useState("")
    const [clase, setClase] = useState("")
    const [show, setShow] = useState(false)

    console.log(tipo)
    useEffect( () => {
        if(msg !== ""){
            setShow(true)
            setTexto(msg)
            setClase(tipo ? tipo : "error")
            setTimeout(() => {
                setShow(false)
            }, 5000);
        }
        
    }, [msg])


    return(
        <Collapse isOpen={show}>
            <Alert w="100%" status={clase}>
                <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} justifyContent="space-between">
                    <HStack space={2} flexShrink={1}>
                    <Alert.Icon mt="1" />
                    <Text fontSize="md" color="coolGray.800">
                        {texto}
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
    )
}


export default AlertCustom
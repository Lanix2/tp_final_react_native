import {
    Text,
    HStack,
    Switch,
    useColorMode
} from "native-base";

const ToggleDarkMode = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const label = 'Cambiar al modo ' + (colorMode === 'light' ? 'oscuro' : 'claro');
    
    return (
      <HStack space={2} alignItems="center">
        <Text>Oscuro</Text>
        <Switch
          isChecked={ colorMode === 'light' }
          onToggle={ toggleColorMode }
          aria-label={ label }
        />
        <Text>Claro</Text>
      </HStack>
    );
}

export default ToggleDarkMode;
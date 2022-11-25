## Usuario de prueba

usuario: cali@gmail.com
Contraseña: 123

## Uso

Clonamos el repositorio:
```sh
git clone https://github.com/Lanix2/tp_final_react_native.git
```

Instalamos las librerías:
## Server
```sh
npm install
```

## Cliente

Debemos ingresar a la carpeta client
```sh
cd  .\client\
```

Luego instalamos las librerías correspondientes
```sh
npm install
```


Corremos el proyecto (en la carpeta principal, la del server):
```sh
npx run dev
```

Si quieres ejecutar la aplicación en tu dispositivo móvil (Con [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=es_AR&gl=US)) sin estar conectado a la misma red que tu ordenador necesitas instalar la siguiente librería:
```sh
npm install @expo/ngrok@^4.1.0
```

Por último:
```sh
expo start --tunnel
```
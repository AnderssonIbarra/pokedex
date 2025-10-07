# Pokedex

EL siguiente repositorio esta creado para la practica de Frontend simulando una Pokédex, la información es tomada de la api [PokéApi](https://pokeapi.co/).

## Tecnologias

- Framework principal Vue.js version 3 usando JavaScript.
- Axios para el manejo de la peticion a la Api.
- ESlint para detectar problemas en el código.

## Estructura del código

La estructura del código esta basada en componentes usando Composition API de vue, para hacer la página lo más reutilizable posible. Se utilizo la comunicacion entre componentes, para el flujo de la información en la página.

### Estructura de las carpetas

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── __test__
│   │   └── FullListPokemon.test.js
│   ├── assets
│   │   ├── styles
│   │   │  ├── AppLoading.style.css
│   │   │  ├── AppWelcome.style.css
│   │   │  ├── componentAlerts.style.css
│   │   │  ├── componentButtons.style.css
│   │   │  ├── componentEmptyList.style.css
│   │   │  ├── componentList.style.css
│   │   │  ├── componentModalDetails.style.css
│   │   │  ├── componentSearch.style.css
│   │   │  └── main.style.css
│   │   └── hero.png
│   ├── components
│   │   ├── ComponentsAppPrincipal
│   │   │  ├── ComponentAlerts.vue
│   │   │  ├── ComponentButtons.vue
│   │   │  ├── ComponentEmptyList.vue
│   │   │  ├── ComponentList.vue
│   │   │  ├── ComponentModalDetails.vue
│   │   │  └── ComponentSearch.vue
│   │   ├── icons
│   │   │  └── ...iconos utilizados en la aplicación
│   │   ├── AppLoading.vue
│   │   ├── AppPrincipal.vue
│   │   └── AppWelcome.vue
│   ├── mock-data
│   │   └── ... mock de ejemplos usados en el desarrollo
│   ├── scripts
│   │   ├── general.functions.js
│   │   └── pokemon.api.js
│   ├── App.vue
│   └── main.js
├── index.html
└── package.json
```

**La aplicación esta separada de las siguiente forma:**

- Carpeta **public**: Contiene imágenes y archivos públicos.
- Carpeta **src**: Contiene la lógica de la página.
  - Carpeta \***\*test\*\***: Contiene los test de la aplicación.
  - Carpeta **assets**: Contiene los estilos y imágenes usadas en la página.
  - Carpeta **components**: Contiene los componentes que conforma la página.
    - Carpeta **ComponentsAppPrincipal**: Contiene los componentes usados en el archivo _AppPrincipal_
    - Carpeta **icons**: Contiene los componentes de iconos usados en la página.
    - Archivo **AppLoading**: Archivo con la vista de el loading de la página.
    - Archivo **AppPrincipal**: Archivo de la vista principal de la página.
    - Archivo **AppWelcome**: Archivo de la vista de bienvenida de la página.
  - Carpeta **mock-data**: Contiene ejemplos de los resultados de la API, para hacer pruebas.
  - Carpeta **scripts**: Contiene lógica importante de la página, como funciones y el acceso a la API.
  - Archivo **App**: el componente raíz de la página, se encuentra el contenido de la página.
  - Archivo **main**: punto de entrada de la aplicación.
- Archivo **index.html**: es la página web principal de la aplicación, contenido raíz de el SPA.

El resto de archivos son de configuración, creadas automáticamente para el funcionamiento correcto de la aplicación y no deben ser modificados manualmente.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

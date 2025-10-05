# Pokedex

EL siguiente repositorio esta creado para la practica de Frontend simulando una Pokédex, la información es tomada de la api [PokéApi](https://pokeapi.co/).

## Tecnologias

- Framework principal Vue.js version 3 basado en JavaScript.
- Axios para el manejo de la peticion a la Api.
- Vitest para hacer Unit test.
- ESlint para detectar problemas en el código.

## Estructura del código

La estructura del código esta basada en componentes para hacer la página lo mas reutilizable posible, es una single page application SPA.

El componente principal es App.vue, donde se encuentran llamados otros 3 componentes.

- Welcome es la vista de la página principal, donde se da la bienvenida a la pagina
- Loading es la vista de carga de la aplicación.
- FullListPokemon es la vista principal en donde esta la funcionalidad de la página.
  - Los componentes que componen FullListPokemon se encuentran en la carpeta Pokemones.

Se utilizo la comunicacion entre componentes (Props y emit), para el flujo de la información en la página.

La carpeta mock-data esta creada para guardar mocks de la data recibida en la llamada de la Api.

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

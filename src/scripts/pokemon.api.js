// ARCHIVO PARA CONFIGURAR AXIOS CON LA API DE POKEMON

import axios from 'axios'

export const pokemonApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon',
})

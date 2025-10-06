<script setup>
import { defineProps, defineEmits, ref } from 'vue';

//Importación de estilos
import '@/assets/styles/listComponent.css';

// Importación de la API
import { pokemonApi } from '@/scripts/pokemon.api';

// Importación de componentes
import IconFavDisable from '../icons/IconFavDisabled.vue';
import IconFavActive from '../icons/IconFavActive.vue';

// Importación de funciones generales
import { capitalize } from '@/scripts/general.functions.js';

// PROPS
const props = defineProps({
  dataList: {
    type: Array,
    required: true
  }
});

// Definición de eventos emitidos
const emit = defineEmits(['data-pokemon-search', 'pokemon-not-found', 'data-pokemon-change-favorite']);

// VARIABLES DE ESTADO
const infoPokemonSearch = ref(null); //Variable para almacenar los datos del Pokemon buscado

// ===============================================================
//                         MÉTODOS
// ===============================================================

// 'searchPokemon': Método para buscar el Pokémon en la API y emitir los datos
const searchPokemon = async (name) => {
  try {
    // 1. Llamada a la API para obtener los detalles del Pokémon
    const response = await pokemonApi.get(`/${name}`);

    // 2. Mapeamos los datos recibidos para obtener solo la información necesaria
    infoPokemonSearch.value = {
      name: response.data.name,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types,
      image: response.data.sprites.other['official-artwork'].front_default
    };

    // 3. Emitimos los datos de búsqueda
    emit('data-pokemon-search', infoPokemonSearch.value);

  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Manejo para emitir un evento si el Pokemon no se encuentra
      emit('pokemon-not-found');
    } else {
      // Manejo de otros errores
      console.error("Error fetching Pokémon details:", error);
    }
  }
};

// 'changeFavorite': método para cambiar el estado de favorito
const changeFavorite = (name, status) => {
  const newStatus = !status;
  // Emitimos el nombre y el nuevo estado de favorito al padre
  emit('data-pokemon-change-favorite', { name, status: newStatus });
};
</script>

<template>
  <!-- Lista de Pokemones -->
  <section class="list-container">
    <div class="list-pokemones">
      <!-- Mapeo de la lista de Pokemones recibidas por props -->
      <div v-for="pokemon in props.dataList" :key="pokemon.name" class="pokemones-item">

        <!-- Botón para buscar el pokemon en la API y mostrar sus detalles -->
        <button class="btn-pokemon" @click="searchPokemon(pokemon.name)">
          {{ capitalize(pokemon.name) }}
        </button>

        <!-- Botón para cambiar el estado de favorito del Pokemon -->
        <button class="btn-fav" @click="changeFavorite(pokemon.name, pokemon.isFavorite)">
          <IconFavActive v-if="pokemon.isFavorite" />
          <IconFavDisable v-else />
        </button>
      </div>
    </div>
  </section>
</template>

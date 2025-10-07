<script setup>
import { ref, defineEmits } from 'vue'

// Importación de estilos
import '@/assets/styles/componentSearch.style.css'

// Importación de la API
import { pokemonApi } from '@/scripts/pokemon.api'

//Importación de iconos
import IconSearch from '../icons/IconSearch.vue'

// Definición de eventos emitidos
const emit = defineEmits(['data-pokemon-search', 'pokemon-not-found'])

// Variables reactivas
const query = ref('') // Variable para el input de búsqueda

// ===============================================================
//                          MÉTODOS
// ===============================================================

// 'getPokemonSearch': Método para buscar un Pokémon por nombre o ID
const getPokemonSearch = async () => {
  // 1. Obtener la consulta y limpiar el input inmediatamente
  const searchQuery = query.value.trim().toLowerCase()
  query.value = ''

  if (!searchQuery) return

  try {
    // 2. Llamada asíncrona a la API
    const response = await pokemonApi.get(`/${searchQuery}`)

    // 3. Mapear los datos de búsqueda necesarios
    const infoPokemonSearch = {
      name: response.data.name,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types,
      image: response.data.sprites.other['official-artwork'].front_default,
    }

    // 4. Emitir los datos del Pokemon encontrado
    emit('data-pokemon-search', infoPokemonSearch)
  } catch (error) {
    // 4. Manejo de errores 404
    if (error.response && error.response.status === 404) {
      emit('pokemon-not-found') // Emitir el evento de no encontrado
    } else {
      // Manejo de otros errores
      console.error('Error al buscar Pokémon:', error)
    }
  }
}
</script>

<template>
  <section class="search-container">
    <!-- Componente de búsqueda (box search) -->
    <div class="search-box">
      <span>
        <IconSearch class="icon-search" />
      </span>
      <!-- input de búsqueda -->
      <input type="text" v-model="query" placeholder="Search" class="search-input" @keydown.enter="getPokemonSearch" />
    </div>
  </section>
</template>

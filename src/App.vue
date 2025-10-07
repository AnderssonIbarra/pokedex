<template>
  <!-- Componente de bienvenida en la página principal -->
  <Welcome v-if="showWelcome" @get-started="getDataList" />

  <!-- Componente de carga mientras se obtienen los datos -->
  <Loading v-if="showLoading" />

  <!-- Componente que muestra la lista completa de pokemones -->
  <FullListPokemon v-if="showFullListPokemon" :dataList="dataList" />
</template>

<script setup>
import { ref } from 'vue'

// Importación del servicio API
import { pokemonApi } from './scripts/pokemon.api'

// Importación de componentes
import FullListPokemon from './components/AppPrincipal.vue'
import Loading from './components/AppLoading.vue'
import Welcome from './components/AppWelcome.vue'

// ESTADO REACTIVO (Variables reactivas)
const showWelcome = ref(true)
const showLoading = ref(false)
const showFullListPokemon = ref(false)
const dataList = ref([])

// ===============================================================
//                         MÉTODOS
// ===============================================================

// 'getDataList': Método para obtener la lista de pokemones desde la API
const getDataList = async () => {
  // Valores iniciales para la carga
  showWelcome.value = false
  showLoading.value = true
  showFullListPokemon.value = false

  try {
    // 1. Obtener la lista de pokemones desde la API
    const response = await pokemonApi.get()

    // 2. Mapear y obtener los datos agregando un estado 'isFavorite' inicial
    const mappedData = response.data.results.map((pokemon) => ({
      ...pokemon,
      isFavorite: false,
    }))

    // 3. Simulación de carga de 700ms con un delay explícito
    await new Promise((resolve) => setTimeout(resolve, 700))

    // 4. Finalizar la carga y mostrar la lista
    dataList.value = mappedData
    showLoading.value = false
    showFullListPokemon.value = true
  } catch (error) {
    // Manejo de errores
    console.error('Error fetching Pokémon list:', error)
    showLoading.value = false
    showWelcome.value = true
  }
}
</script>

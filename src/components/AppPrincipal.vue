<script setup>
import { ref, computed, watch } from 'vue'

// Importaciones de componentes
import ListComponent from './ComponentsAppPrincipal/ComponentList.vue'
import SearchComponent from './ComponentsAppPrincipal/ComponentSearch.vue'
import ButtonsComponent from './ComponentsAppPrincipal/ComponentButtons.vue'
import EmptyListComponent from './ComponentsAppPrincipal/ComponentEmptyList.vue'
import ModalDetails from './ComponentsAppPrincipal/ComponentModalDetails.vue'

// PROPS
const props = defineProps({
  dataList: {
    type: Array,
    required: true,
  },
})

// VARIABLES DE ESTADO
const dataFull = ref([]) // Lista base de Pokémones
const dataModal = ref(null) // Usamos null para indicar que el modal está cerrado
const typeList = ref('full') // 'full' o 'favorites'
const showNotFound = ref(false) // Visibilidad del componente "No encontrado"

// WATCHERS (Observador de cambios)
// Inicializa la lista mutable `dataFull` con la prop, permitiendo mutar isFavorite.
watch(
  () => props.dataList,
  (newVal) => {
    dataFull.value = JSON.parse(JSON.stringify(newVal))
  },
  {
    immediate: true, // Ejecuta el watcher inmediatamente al montar el componente
    deep: true, // Asegura que detecta cambios anidados si la prop se actualiza.
  },
)

// ESTADO DERIVADO CON COMPUTED (Propiedades computadas)

// `dataFavorites`: Se calcula cada vez que `dataFull` cambia.
const dataFavorites = computed(() => {
  return dataFull.value.filter((pokemon) => pokemon.isFavorite === true)
})

// `dataSend`: Se calcula basado en `typeList`.
const dataSend = computed(() => {
  return typeList.value === 'full' ? dataFull.value : dataFavorites.value
})

// ===============================================================
//                         MÉTODOS
// ===============================================================

// 'goBack': Maneja el evento para volver a la lista completa desde "No encontrado".
const goBack = () => {
  showNotFound.value = false // Lo ponemos en false para mostrar la lista completa
  typeList.value = 'full' // Cambiamos el tipo de lista a 'full'
}

// 'searchPokemonEvent': Maneja el evento de búsqueda de pokemon
const searchPokemonEvent = (dataSearch) => {
  // Buscamos el pokemon en la lista completa
  const pokemon = dataFull.value.find((p) => p.name === dataSearch.name)

  // Agregamos la propiedad 'isFavorite' al objeto de búsqueda si el Pokémon existe
  dataSearch.isFavorite = pokemon ? pokemon.isFavorite : false

  // Actualizamos el estado del modal y ocultamos 'No encontrado' si se usa para mostrar detalles
  dataModal.value = dataSearch
  showNotFound.value = false
}

// 'closeModal': Maneja el evento para cerrar el modal
const closeModal = () => {
  dataModal.value = null // Cerramos el modal
}

// 'changePokemonFavorite': Maneja el evento para cambiar el estado de favorito de un Pokémon
const changePokemonFavorite = (info) => {
  if (!info || !info.name) return // Validación básica

  // Buscamos el Pokémon en la lista completa
  const pokemon = dataFull.value.find((p) => p.name === info.name)

  if (pokemon) {
    // Si lo encuentra, actualiza el estado de favorito
    pokemon.isFavorite = info.status
  } else {
    // Si no lo encuentra, lo agrega a la lista completa
    dataFull.value.unshift({ name: info.name, isFavorite: info.status })
  }
}
</script>

<!-- Componentes de la página que muestra la lista completa de Pokémones, con búsqueda, filtrado y detalles en modal. -->
<template>
  <div class="full-list-pokemon-page">
    <!-- Componente Search -->
    <SearchComponent
      @data-pokemon-search="searchPokemonEvent"
      @pokemon-not-found="showNotFound = true"
    />

    <!-- Renderizado condicional basado en `showNotFound` -->
    <template v-if="!showNotFound">
      <ListComponent
        :dataList="dataSend"
        @data-pokemon-search="searchPokemonEvent"
        @data-pokemon-change-favorite="changePokemonFavorite"
      />
      <ButtonsComponent @type-list="typeList = $event" />
    </template>

    <!-- Renderizado del componente "No encontrado" -->
    <EmptyListComponent v-else @go-back-event="goBack" />

    <!-- Componente ModalDetails, renderizado condicionalmente -->
    <ModalDetails
      v-if="dataModal"
      :dataPokemon="dataModal"
      @close-modal="closeModal"
      @data-pokemon-change-favorite="changePokemonFavorite"
    />
  </div>
</template>

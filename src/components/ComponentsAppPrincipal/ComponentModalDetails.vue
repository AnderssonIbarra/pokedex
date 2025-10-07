<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

// Importación de estilos
import '@/assets/styles/componentModalDetails.style.css'

//Importación de iconos
import IconClose from '../icons/IconClose.vue'
import IconFavDisable from '../icons/IconFavDisabled.vue'
import IconFavActive from '../icons/IconFavActive.vue'

// Importación de funciones generales
import { capitalize, formatTypes } from '@/scripts/general.functions.js'

// Importación de componentes
import ComponentAlerts from './ComponentAlerts.vue'

// PROPS
const props = defineProps({
  dataPokemon: {
    type: Object,
    required: true,
  },
})

// Definición de eventos emitidos
const emit = defineEmits(['close-modal', 'data-pokemon-change-favorite'])

// Variables reactivas
const localPokemon = ref({ ...props.dataPokemon }) // Copia local para manejar cambios temporalmente
const alertType = ref(null) // Tipo de alerta para el componente de alertas

// WATCHERS
// Sincroniza localPokemon cuando dataPokemon cambia
watch(
  () => props.dataPokemon,
  (newVal) => {
    localPokemon.value = { ...newVal }
  },
  { immediate: true, deep: true },
)

// ===============================================================
//                          MÉTODOS
// ===============================================================

// 'closeModal': Método para emitir el evento de cerrar el modal
const closeModal = () => {
  emit('close-modal')
}

// 'changeFavorite': Método para emitir el evento de cambiar el estado de favorito
const changeFavorite = (name, status) => {
  const newStatus = !status
  emit('data-pokemon-change-favorite', { name, status: newStatus })
  localPokemon.value.isFavorite = newStatus // Solo cambia la copia local
}

// 'typeAlert': Método para actualizar el tipo de alerta
const typeAlert = (type) => {
  alertType.value = type
  setTimeout(() => {
    alertType.value = null
  }, 3000) // La alerta desaparece después de 3 segundos para poder llamar de nuevo - se debe tener en cuenta el tiempo de duración de la animación
}

// 'shareText': Método para copiar la información del Pokemon al portapapeles
const shareText = async () => {
  const p = localPokemon.value

  if (!p || !p.name) return //Validación básica

  // Formato del texto a copiar
  const textCopy = `Name: ${capitalize(p.name)}, Weight: ${p.weight}, Height: ${p.height}, Types: ${formatTypes(p.types)}`

  try {
    // Copiar al portapapeles
    await navigator.clipboard.writeText(textCopy)
    typeAlert('positive')
  } catch (error) {
    // Manejo de errores
    console.error('Error al copiar el texto: ', error)
    typeAlert('negative')
  }
}
</script>

<template>
  <!-- Modal Details -->
  <section class="modal-section">
    <div class="modal-div">
      <!-- Botón de cerrar el modal -->
      <button class="btn-close" @click="closeModal">
        <IconClose />
      </button>

      <!-- Sección de la imagen -->
      <div class="image-section">
        <img :src="localPokemon.image" :alt="'Image the ' + localPokemon.name" class="image-pokemon" />
      </div>

      <!-- Sección de la información del pokemon -->
      <div class="information-section">
        <p><strong>Name: </strong>{{ capitalize(localPokemon.name) }}</p>
        <p><strong>Weight: </strong>{{ localPokemon.weight }}</p>
        <p><strong>Height: </strong>{{ localPokemon.height }}</p>
        <p>
          <strong>Types: </strong>
          <span v-if="localPokemon.types && localPokemon.types.length">
            {{ formatTypes(localPokemon.types) }}
          </span>
        </p>
      </div>

      <!-- Sección de los botones -->
      <div class="btn-section">
        <button class="btn-share" @click="shareText">Share to my friends</button>
        <button class="btn-fav" @click="changeFavorite(localPokemon.name, localPokemon.isFavorite)">
          <IconFavActive v-if="localPokemon.isFavorite" />
          <IconFavDisable v-else />
        </button>
      </div>
    </div>
    <!-- Componente de alertas -->
    <ComponentAlerts v-if="alertType" :typeAlert="alertType" />
  </section>
</template>

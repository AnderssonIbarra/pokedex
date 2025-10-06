<script setup>
// Importación de estilos
import '@/assets/styles/emptyListComponent.css'

// Definición de eventos emitidos
const emit = defineEmits(['go-back-event']);

// ===============================================================
//                         MÉTODOS
// ===============================================================

// 'goBackEvent': Método para emitir el evento de volver a la página principal
const goBackEvent = () => {
  emit('go-back-event');
};
</script>

<template>
  <!-- Sección que se muestra cuando no se encuentra el Pokémon buscado -->
  <div class="empty-list-section">
    <h1 class="title">Uh-oh!</h1>
    <p class="subtitle">You look lost on your journey!</p>
    <button class="btn-back-home" @click="goBackEvent">Go back home</button>
  </div>
</template>

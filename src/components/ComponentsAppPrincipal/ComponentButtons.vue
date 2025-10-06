<script setup>
import { ref } from 'vue';

// Importación de estilos
import '@/assets/styles/buttonsComponent.css';

// Importación de iconos
import IconAll from '../icons/IconAll.vue';
import IconFavorites from '../icons/IconFavorites.vue';

// Definición de eventos emitidos
const emit = defineEmits(['type-list']);

// VARIABLES DE ESTADO
const typeList = ref('full')

// ===============================================================
//                         MÉTODOS
// ===============================================================

// 'sewFullList': Método para cambiar a la lista completa
const sewFullList = () => {
  typeList.value = 'full';
  emit('type-list', typeList.value);
};

// 'sewFavoriteList': Método para cambiar a la lista de favoritos
const sewFavoriteList = () => {
  typeList.value = 'favorites';
  emit('type-list', typeList.value);
};
</script>

<template>
  <!-- Botones para cambiar entre la lista completa y la de favoritos -->
  <section class="buttons-container">
    <button :class="(typeList === 'favorites') ? 'btn-active btn-all' : 'btn-all'" @click="sewFullList">
      <IconAll /> All
    </button>
    <button :class="(typeList === 'full') ? 'btn-active btn-favorites' : 'btn-favorites'" @click="sewFavoriteList">
      <IconFavorites /> Favorites
    </button>
  </section>
</template>

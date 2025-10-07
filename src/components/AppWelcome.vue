<script setup>
import '../assets/styles/AppWelcome.style.css'

// Importación de iconos
import IconPikachu from './icons/IconPikachu.vue'
import IconCircule from './icons/IconCircule.vue'

// Declaramos los eventos que emitirá este componente
const emit = defineEmits(['get-started'])

// ===============================================================
//                         MÉTODOS
// ===============================================================

// 'getStarted': Emite el evento para iniciar la aplicación
const getStarted = () => {
  emit('get-started')
}
</script>

<template>
  <section class="welcome-section">
    <div class="icons">
      <IconCircule class="icon-circule" />
      <IconPikachu class="icon-pikachu" />
    </div>
    <h1 class="title">Welcome to Pokédex</h1>
    <p class="description">
      The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the
      Pokémon world.
    </p>
    <button class="btn-get-started" @click="getStarted">Get started</button>
  </section>
</template>

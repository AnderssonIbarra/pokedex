<template>
  <section class="welcome-section">
    <div class="icons">
      <IconCircule class="icon-circule" />
      <IconPikachu class="icon-pikachu" />
    </div>
    <h1 class="title">Welcome to Pokédex</h1>
    <p class="description">The digital encyclopedia created by Professor Oak is an invaluable tool to
      Trainers in
      the Pokémon world.</p>
    <button class="btn-get-started" @click="getStarted">Get started</button>
  </section>
</template>

<script>
import IconPikachu from './icons/IconPikachu.vue';
import '../assets/styles/welcome.css';
import IconCircule from './icons/IconCircule.vue';

export default {
  name: 'WelcomePage',
  components: {
    IconPikachu,
    IconCircule
  },
  methods: {
    getStarted() {
      this.$emit('get-started');
    }
  }
}
</script>

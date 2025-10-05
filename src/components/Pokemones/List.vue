<template>
  <section class="list-container">
    <div class="list-pokemones">
      <div v-for="pokemon in pokemones" :key="pokemon.name" class="pokemones-item">
        <button class="btn-pokemon" @click="searchPokemon(pokemon.name)">{{ pokemon.name.charAt(0).toUpperCase() +
          pokemon.name.slice(1) }}</button>
        <button class="btn-fav" @click="changeFavorite(pokemon.name, pokemon.isFavorite)">
          <IconFavActive v-if="pokemon.isFavorite" />
          <IconFavDisable v-else />
        </button>
      </div>
    </div>
  </section>
</template>
<script>
import '@/assets/styles/listComponent.css';

import IconFavDisable from '../icons/IconFavDisabled.vue';
import { pokemonApi } from '@/api/pokemon.api';
import IconFavActive from '../icons/IconFavActive.vue';

export default {
  name: 'ListComponent',
  props: {
    dataList: {
      type: Array,
      required: true
    }
  },
  components: {
    IconFavDisable,
    IconFavActive
  },
  data() {
    return {
      pokemones: [],
      infoPokemonSearch: []
    }
  },
  watch: {
    dataList: {
      immediate: true,
      handler(newVal) {
        this.pokemones = newVal;
      }
    }
  },
  methods: {
    async searchPokemon(name) {
      try {
        const response = await pokemonApi.get(`/${name}`);
        this.infoPokemonSearch = { name: response.data.name, weight: response.data.weight, height: response.data.height, types: response.data.types, image: response.data.sprites.other['official-artwork'].front_default }
        this.$emit('data-pokemon-search', this.infoPokemonSearch)
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.$emit('pokemon-not-found');
        } else {
          console.log(error)
        }
      }
    },
    changeFavorite(name, status) {
      status = !status;
      this.$emit('data-pokemon-change-favorite', { name, status });
    }
  }
}
</script>

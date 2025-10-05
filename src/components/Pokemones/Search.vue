<template>
  <section class="search-container">
    <div class="search-box">
      <span>
        <IconSearch class="icon-search" />
      </span>
      <input type="text" v-model="query" placeholder="Search" class="search-input" @keydown="getPokemonSearch" />
    </div>
  </section>
</template>

<script>
import '@/assets/styles/searchComponent.css'
import IconSearch from '../icons/IconSearch.vue';
import { pokemonApi } from '@/api/pokemon.api';
export default {
  name: 'SearchComponent',
  components: {
    IconSearch,
  },
  data() {
    return {
      infoPokemonSearch: {},
      query: ''
    }
  },
  methods: {
    async getPokemonSearch(event) {
      if (event.key === "Enter") {
        try {
          const response = await pokemonApi.get(`/${this.query}`);
          this.infoPokemonSearch = { name: response.data.name, weight: response.data.weight, height: response.data.height, types: response.data.types, image: response.data.sprites.other['official-artwork'].front_default }
          this.$emit('data-pokemon-search', this.infoPokemonSearch)
        } catch (error) {
          if (error.response && error.response.status === 404) {
            this.$emit('pokemon-not-found');
          } else {
            console.log(error)
          }
        }
        this.query = ''
      }
    }
  }
}
</script>

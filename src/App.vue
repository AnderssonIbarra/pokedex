<template>
  <Welcome v-if="showWelcome" @get-started="getDataList" />
  <Loading v-if="showLoading" />
  <FullListPokemon v-if="showFullListPokemon" :dataList="dataList" />
</template>

<script>
import { pokemonApi } from './api/pokemon.api';
import FullListPokemon from './components/FullListPokemon.vue';
import Loading from './components/Loading.vue';
import Welcome from './components/Welcome.vue';

export default {
  name: 'App',
  components: {
    FullListPokemon,
    Loading,
    Welcome
  },
  data() {
    return {
      showWelcome: true,
      showLoading: false,
      showFullListPokemon: false,
      dataList: []
    }
  },
  methods: {
    async getDataList() {
      this.showWelcome = false;
      this.showLoading = true;
      this.showFullListPokemon = false;

      const response = await pokemonApi.get();

      setTimeout(() => {
        this.dataList = response.data.results.map(pokemon => ({ ...pokemon, isFavorite: false }));
        this.showLoading = false;
        this.showFullListPokemon = true;
      }, 700);
    }
  }
}
</script>

<template>
  <SearchComponent @data-pokemon-search="searchPokemonEvent($event)"
    @pokemon-not-found="showNotFound = !showNotFound" />
  <EmptyListComponent v-if="showNotFound" @go-back-event="goBack" />
  <ListComponent v-if="!showNotFound" :dataList="dataSend" @data-pokemon-search="searchPokemonEvent($event)"
    @data-pokemon-change-favorite="changePokemonFavorite($event)" />
  <ButtonsComponent v-if="!showNotFound" @type-list="typeList = $event" />
  <ModalDetails v-if="dataModal && Object.keys(dataModal).length > 0" :dataPokemon="dataModal" @close-modal="closeModal"
    @data-pokemon-change-favorite="changePokemonFavorite($event)" />
</template>

<script>
import ListComponent from './Pokemones/List.vue';
import SearchComponent from './Pokemones/Search.vue';
import ButtonsComponent from './Pokemones/Buttons.vue';
import EmptyListComponent from './Pokemones/EmptyList.vue';
import ModalDetails from './Pokemones/ModalDetails.vue';

export default {
  name: 'FullListPokemonPage',
  props: {
    dataList: {
      type: Array,
      required: true
    }
  },
  components: {
    ListComponent,
    SearchComponent,
    ButtonsComponent,
    EmptyListComponent,
    ModalDetails
  },
  data() {
    return {
      dataSend: [],
      dataFull: [],
      dataFavorites: [],
      dataModal: [],
      dataPokemon: [],
      typeList: 'full',
      showNotFound: false
    }
  },
  watch: {
    dataList: {
      immediate: true,
      handler(newVal) {
        newVal.map((pokemon) => {
          if (pokemon.isFavorite === true) {
            this.dataFavorites.push(pokemon)
          }
        })
        this.dataFull = newVal;
      }
    },
    typeList: {
      immediate: true,
      handler(newVal) {
        if (newVal === 'full') {
          this.dataSend = this.dataFull
        } else {
          this.dataSend = this.dataFavorites
        }
      }
    },
    dataModal: {
      immediate: true,
      handler(newVal) {
        this.dataModal = newVal;
      }
    }
  },
  methods: {
    goBack() {
      this.showNotFound = !this.showNotFound;
      this.typeList = 'full';
    },
    searchPokemonEvent(dataSearch) {
      const pokemon = this.dataFull.find(p => p.name === dataSearch.name)
      if (pokemon) {
        dataSearch.status = pokemon.isFavorite;
      } else {
        dataSearch.status = false;
      }
      this.dataModal = dataSearch
    },
    closeModal() {
      this.dataModal = []
    },
    changePokemonFavorite(info) {
      if (!info || !info.name) return;

      const pokemon = this.dataFull.find(p => p.name === info.name);
      if (pokemon) {
        pokemon.isFavorite = info.status;
      } else {
        this.dataFull.unshift({ name: info.name, isFavorite: info.status })
      }

      this.dataFavorites = this.dataFull.filter(p => p.isFavorite);



    }
  }
}
</script>

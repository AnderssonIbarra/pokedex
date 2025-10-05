<template>
  <section class="modal-section">
    <div class="modal-div">
      <button class="btn-close" @click="closeModal">
        <IconClose />
      </button>
      <div class="image-section">
        <img :src="pokemon.image" :alt="'Image the ' + pokemon.name" class="image-pokemon">
      </div>
      <div class="information-section">
        <p><strong>Name: </strong>{{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}</p>
        <p><strong>Weight: </strong>{{ pokemon.weight }}</p>
        <p><strong>Height: </strong>{{ pokemon.height }}</p>
        <p><strong>Types: </strong>
          <span v-if="pokemon.types && pokemon.types.length">
            {{pokemon.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)).join(', ')}}
          </span>
        </p>
      </div>
      <div class="btn-section">
        <button class="btn-share" @click="shareText">Share to my friends</button>
        <button class="btn-fav" @click="changeFavorite(pokemon.name, pokemon.status)">
          <IconFavActive v-if="pokemon.status" />
          <IconFavDisable v-else />
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import '@/assets/styles/modalDetails.css'
import IconClose from '../icons/IconClose.vue';
import IconFavDisable from '../icons/IconFavDisabled.vue';
import IconFavActive from '../icons/IconFavActive.vue';

export default {
  name: 'ModalDetailsComponent',
  components: {
    IconClose,
    IconFavDisable,
    IconFavActive
  },
  props: {
    dataPokemon: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      pokemon: {}
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    changeFavorite(name, status) {
      status = !status;
      this.$emit('data-pokemon-change-favorite', { name, status });
      this.pokemon.status = status;
    },
    async shareText() {
      if (!this.pokemon || !this.pokemon.name) return;
      const name = this.pokemon.name
        ? this.pokemon.name.charAt(0).toUpperCase() + this.pokemon.name.slice(1)
        : ''
      const types = this.pokemon.types
        ? this.pokemon.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)).join(', ')
        : '';
      const textCopy = `Name: ${name}, Weight: ${this.pokemon.weight}, Height: ${this.pokemon.height}, Types: ${types}`;
      try {
        await navigator.clipboard.writeText(textCopy);
        alert('¡Información copiada al portapapeles!');
      } catch (error) {
        console.error('Error al copiar el texto: ', error);
        alert('Hubo un error al copiar el texto.');
      }
    }
  },
  watch: {
    dataPokemon: {
      immediate: true,
      handler(newVal) {
        this.pokemon = newVal;
      }
    },
  }
}
</script>

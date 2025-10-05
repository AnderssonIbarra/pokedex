<template>
  <section class="buttons-container">
    <button :class="(typeList === 'favorites') ? 'btn-active btn-all' : 'btn-all'" @click="sewFullList">
      <IconAll /> All
    </button>
    <button :class="(typeList === 'full') ? 'btn-active btn-favorites' : 'btn-favorites'" @click="sewFavoriteList">
      <IconFavorites /> Favorites
    </button>
  </section>
</template>

<script>
import '@/assets/styles/buttonsComponent.css';

import IconAll from '../icons/IconAll.vue';
import IconFavorites from '../icons/IconFavorites.vue';

export default {
  name: "ButtonsComponent",
  components: {
    IconAll,
    IconFavorites
  },
  data() {
    return {
      typeList: 'full'
    }
  },
  methods: {
    sewFullList() {
      this.typeList = 'full'
      this.$emit('type-list', this.typeList)
    },
    sewFavoriteList() {
      this.typeList = 'favorites'
      this.$emit('type-list', this.typeList)
    }
  }
}
</script>

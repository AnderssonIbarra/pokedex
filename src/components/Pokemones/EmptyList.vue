<template>
  <div class="empty-list-section">
    <h1 class="title">Uh-oh!</h1>
    <p class="subtitle">You look lost on your journey!</p>
    <button class="btn-back-home" @click="goBackEvent">Go back home</button>
  </div>
</template>

<script>
import '@/assets/styles/emptyListComponent.css'

export default {
  name: 'EmptyListComponent',
  methods: {
    goBackEvent() {
      this.$emit('go-back-event');
    }
  }
}
</script>

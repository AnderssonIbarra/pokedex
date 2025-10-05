<template>
  <section class="loading-section">
    <IconLoading class="icon-loading" />
  </section>
</template>
<script>
import IconLoading from './icons/IconLoading.vue';
import '../assets/styles/loading.css';

export default {
  name: 'LoadingPage',
  components: {
    IconLoading
  },
}
</script>

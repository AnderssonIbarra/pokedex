<script setup>
// Importación de estilos
import '@/assets/styles/componentAlerts.css'

// PROPS
const props = defineProps({
  typeAlert: {
    type: String,
    required: true,
    validator: (value) => ['positive', 'negative'].includes(value),
  },
})
</script>

<template>
  <!-- Alerta positiva dependiendo de le prop typeAlert -->
  <div class="alert-positive" v-if="props.typeAlert === 'positive'">
    <p class="text">Información copiada al portapapeles!</p>
  </div>
  <!-- Alerta negativa dependiendo de le prop typeAlert -->
  <div class="alert-negative" v-else-if="props.typeAlert === 'negative'">
    <p class="text">Error al copiar la información!</p>
  </div>
</template>
|

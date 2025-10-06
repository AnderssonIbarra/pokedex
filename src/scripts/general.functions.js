// ARCHIVO PARA CREAR FUNCIONES GENERALES

// 'capitalize': Función para capitalizar la primera letra de un texto (colocar en mayúscula)
export const capitalize = (text) => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}

// 'formatTypes': Función para formatear los tipos de un Pokémon en una cadena legible
export const formatTypes = (types) => {
  return types.map((t) => capitalize(t.type.name)).join(', ')
}

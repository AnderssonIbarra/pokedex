import { describe, expect, test } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import FullListPokemon from '../components/AppPrincipal.vue'

describe('FullListPokemon', () => {
  test('Should render with default values', () => {
    const wrapper = shallowMount(FullListPokemon, {
      props: {
        dataList: [],
      },
    })

    expect(wrapper.vm.dataSend).toEqual([])
    expect(wrapper.vm.dataFull).toEqual([])
    expect(wrapper.vm.dataFavorites).toEqual([])
    expect(wrapper.vm.dataModal).toEqual([])
    expect(wrapper.vm.dataPokemon).toEqual([])
    expect(wrapper.vm.typeList).toBe('full')
    expect(wrapper.vm.showNotFound).toBe(false)
  })

  test('Should render pokemons in dataSend', async () => {
    const pokemons = [
      { name: 'pikachu', isFavorite: false },
      { name: 'bulbasaur', isFavorite: false },
    ]
    const wrapper = shallowMount(FullListPokemon, {
      props: {
        dataList: pokemons,
      },
    })

    await wrapper.setData({ dataSend: pokemons })

    const html = wrapper.html()
    console.log(html)
    expect(html).toContain('pikachu')
    expect(html).toContain('bulbasaur')
  })
})

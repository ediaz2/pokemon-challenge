import 'whatwg-fetch';
import { mount } from '@vue/test-utils';
import PokemonList from '@/components/pokemon/List.vue';
import { findPokemons } from '@/services/pokemon';

describe('PokemonList', () => {
  it('show a PokemonList', async () => {
    const { results } = await findPokemons({ page: 1, limit: 20 });
    const wrapper = mount(PokemonList, {
      propsData: { pokemons: results },
    });
    expect(wrapper.findAll('li').length).toBe(20);
  });
});

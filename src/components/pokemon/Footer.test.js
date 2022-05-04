import { mount } from '@vue/test-utils';
import PokemonFooter from '@/components/pokemon/Footer.vue';

describe('PokemonFooter', () => {
  it('click button filter all', async () => {
    const wrapper = mount(PokemonFooter, {
      propsData: { value: false },
    });

    await wrapper
      .findAll('button')
      .filter((node) => node.text().match(/All/i))
      .at(0)
      .trigger('click');

    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0][0]).toBeFalsy();
  });

  it('click button filter favorite', async () => {
    const wrapper = mount(PokemonFooter, {
      propsData: { value: false },
    });

    await wrapper
      .findAll('button')
      .filter((node) => node.text().match(/Favorites/i))
      .at(0)
      .trigger('click');

    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0][0]).toBe(true);
  });
});

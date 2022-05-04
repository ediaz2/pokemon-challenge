import { shallowMount } from '@vue/test-utils';
import FormSearch from '@/components/form/Search.vue';

describe('FormSearch', () => {
  it('show a FormSearch', () => {
    const wrapper = shallowMount(FormSearch, {
      propsData: { value: '' },
    });
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('show a FormSearch with value', () => {
    const wrapper = shallowMount(FormSearch, {
      propsData: { value: 'My value' },
    });
    expect(wrapper.find('input').element.value).toBe('My value');
  });

  it('emit search event', async () => {
    const onSearch = jest.fn();
    const wrapper = shallowMount(FormSearch, {
      propsData: { value: 'Hola' },
    });
    wrapper.vm.$on('search', onSearch);
    await wrapper.find('form').trigger('submit.prevent');
    expect(onSearch).toBeCalledTimes(1);
  });
});

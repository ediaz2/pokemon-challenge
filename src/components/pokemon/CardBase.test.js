import { mount } from '@vue/test-utils';
import CardBase from '@/components/pokemon/CardBase.vue';

describe('CardBase', () => {
  it('show a CardBase', () => {
    const wrapper = mount(CardBase, {
      propsData: {
        title: 'My title',
        message: 'My message',
        labelButton: 'My label button',
      },
    });
    expect(wrapper.find('h2').text()).toMatch(/My title/i);
    expect(wrapper.find('p').text()).toMatch(/My message/i);
    expect(wrapper.find('button').text()).toMatch(/My label button/i);
  });

  it('call action', async () => {
    const onAction = jest.fn();
    const wrapper = mount(CardBase, {
      propsData: {
        title: 'My title',
        message: 'My message',
        labelButton: 'My label button',
      },
    });
    wrapper.vm.$on('action', onAction);
    await wrapper.find('button').trigger('click');

    expect(onAction).toBeCalledTimes(1);
  });
});

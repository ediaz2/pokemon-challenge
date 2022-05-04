import { shallowMount } from '@vue/test-utils';
import BaseButtonIcon from '@/components/base/ButtonIcon.vue';

describe('BaseButtonIcon', () => {
  it('renders a button', () => {
    const wrapper = shallowMount(BaseButtonIcon);
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('renders a button with text', () => {
    const wrapper = shallowMount(BaseButtonIcon, {
      slots: { default: 'My Button' },
    });
    expect(wrapper.text()).toBe('My Button');
  });

  it('calls the click handler', async () => {
    const onClick = jest.fn();

    const wrapper = shallowMount(BaseButtonIcon, {
      slots: { default: 'My Button' },
      listeners: { click: onClick },
    });
    await wrapper.trigger('click');

    expect(onClick).toHaveBeenCalled();
  });
});

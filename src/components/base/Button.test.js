import { shallowMount } from '@vue/test-utils';
import BaseButton from '@/components/base/Button.vue';

const onClick = jest.fn();

describe('BaseButton', () => {
  beforeEach(() => {
    onClick.mockClear();
  });

  it('renders a button', () => {
    const wrapper = shallowMount(BaseButton);
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('renders a button with text', () => {
    const wrapper = shallowMount(BaseButton, {
      slots: { default: 'My Button' },
    });
    expect(wrapper.text()).toBe('My Button');
  });

  it('renders a button with a custom class', () => {
    const wrapper = shallowMount(BaseButton, {
      propsData: {
        class: 'my-custom-class',
      },
    });
    expect(wrapper.classes()).toContain('my-custom-class');
  });

  it('calls the click handler', async () => {
    const wrapper = shallowMount(BaseButton, {
      slots: { default: 'My Button' },
      listeners: { click: onClick },
    });
    await wrapper.trigger('click');

    expect(onClick).toBeCalledTimes(1);
  });

  it('does not call the click handler', () => {
    shallowMount(BaseButton, {
      slots: { default: 'My Button' },
      listeners: { click: onClick },
    });

    expect(onClick).not.toHaveBeenCalled();
  });
});

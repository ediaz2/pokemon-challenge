import { shallowMount } from '@vue/test-utils';
import BaseModal from '@/components/base/Modal.vue';

describe('BaseModal', () => {
  it('show a modal', () => {
    const wrapper = shallowMount(BaseModal, {
      propsData: { value: true },
    });
    expect(wrapper.find('div').isVisible()).toBe(true);
  });

  it('hide a modal', () => {
    const wrapper = shallowMount(BaseModal, {
      propsData: { value: false },
    });
    expect(wrapper.find('div').isVisible()).toBe(false);
  });

  it('render content', () => {
    const wrapper = shallowMount(BaseModal, {
      propsData: { value: true },
      slots: { default: '<p>Hello World</p>' },
    });
    expect(wrapper.find('p').exists()).toBe(true);
  });

  it('should emit "close modal"', async () => {
    const wrapper = shallowMount(BaseModal, {
      propsData: { value: false },
      slots: { default: '<p>Hello World</p>' },
    });

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('input').length).toBe(1);
  });

  it('should not emit "close modal"', () => {
    const wrapper = shallowMount(BaseModal, {
      propsData: { value: false },
      slots: { default: '<p>Hello World</p>' },
    });

    expect(wrapper.emitted('input')).toBeFalsy();
  });

  // not call emit close modal
});

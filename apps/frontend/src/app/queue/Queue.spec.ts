import { mount } from '@vue/test-utils';
import Queue from './Queue.vue';

describe('Queue', () => {
  it('renders properly', () => {
    const wrapper = mount(Queue, {});
    expect(wrapper.text()).toContain('Welcome to Queue');
  });
});

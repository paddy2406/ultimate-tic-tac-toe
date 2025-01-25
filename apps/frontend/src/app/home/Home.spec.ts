import { mount } from '@vue/test-utils';
import Home from './home.vue';

describe('Home', () => {
  it('renders properly', () => {
    const wrapper = mount(Home, {});
    expect(wrapper.text()).toContain('Welcome to Home');
  });
});

import { mount } from '@vue/test-utils';
import Game from './Game.vue';

describe('Home', () => {
  it('renders properly', () => {
    const wrapper = mount(Game, {});
    expect(wrapper.text()).toContain('Welcome to Home');
  });
});

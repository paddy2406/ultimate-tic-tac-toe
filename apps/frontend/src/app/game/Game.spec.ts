import { mount } from '@vue/test-utils';
import Game from './Game.vue';

describe('Game', () => {
  it('renders properly', () => {
    const wrapper = mount(Game, {});
    expect(wrapper.text()).toContain('Welcome to Game');
  });
});

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HomePage from '../../views/HomePage.vue'; 

describe('HomePage.vue', () => {
  it('renders the heading and description', () => {
    const wrapper = mount(HomePage);
    expect(wrapper.find('h1').text()).toContain('Geografisk have');
    expect(wrapper.find('p').text()).toContain('Geografisk Have er en 14 ha stor oplevelsespark');
  });

  it('checks if the image is rendered with the correct attributes', () => {
    const wrapper = mount(HomePage);
    const image = wrapper.find('img');
// Update the expected value in your test:
    expect(image.attributes('src')).toContain('/src/assets/images/hero-img.png');
    expect(image.attributes('alt')).toBe('Geografisk Have');
  });
});

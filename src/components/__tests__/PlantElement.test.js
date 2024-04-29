import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PlantElement from '@/components/PlantElement.vue';

// Mocking useRouter and useFirebaseStorage
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn() // Mock the push function of router
  })
}));

vi.mock('@/composables/useFirebaseStorage', () => ({
  useFirebaseStorage: () => ({
    imageUrl: 'mocked-url', // Mock the imageUrl returned by useFirebaseStorage
    loadImage: vi.fn() // Mock the loadImage function
  })
}));

describe('PlantElement.vue', () => {
  it('loads plant picture correctly', () => {
    const plant = { id: 1, name: 'Test Plant' };
    const wrapper = mount(PlantElement, { props: { plant } });

    // Assert that the plant image URL is correctly set
    expect(wrapper.find('.plantImage').attributes('src')).toEqual('mocked-url');
  });

  it('renders plant name correctly', () => {
    const plant = { id: 1, name: 'Test Plant' };
    const wrapper = mount(PlantElement, { props: { plant } });

    // Assert that the plant name is rendered correctly
    expect(wrapper.find('.plantText').text()).toEqual('Test Plant');
  });

  it('passes plant ID as prop', () => {
    const plant = { id: 1, name: 'Test Plant' };
    const wrapper = mount(PlantElement, { props: { plant } });

    // Assert that the plant ID is passed as a prop
    expect(wrapper.vm.plant.id).toEqual(1);
  });
});

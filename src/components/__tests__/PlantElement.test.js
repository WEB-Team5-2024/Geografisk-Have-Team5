import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import PlantElement from '@/components/PlantElement.vue';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

// Mock Firebase and Vue Router
vi.mock('@/firebase', () => ({
  db: {}
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn()
}));

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn()
}));

vi.mock('vue-router', () => {
  const push = vi.fn();
  return {
    useRouter: () => ({
      push
    }),
    useRoute: () => ({
      params: { id: '1' }
    })
  };
});

describe('PlantElement.vue', () => {
  const mockData = { name: 'Aloe Vera', imageURL: 'path/to/aloe.jpg' };

  beforeEach(() => {
    vi.mocked(initializeApp).mockReturnValue({ name: '[DEFAULT]' });
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => mockData
    });

    // Clear all previous calls to push for clean state in each test
    vi.mocked(useRouter().push).mockClear();
  });

  it('loads plant details successfully', async () => {
    const wrapper = mount(PlantElement, {
      props: { plant: { id: '1' } }
    });
    await flushPromises();
    expect(wrapper.find('.plantText').text()).toBe(mockData.name);
    expect(wrapper.find('.plantImage').attributes('src')).toBe(mockData.imageURL);
  });

  it('handles undefined plant ID', async () => {
    const consoleSpy = vi.spyOn(console, 'error');
    const wrapper = mount(PlantElement, {
      props: { plant: {} }
    });
    await flushPromises();
    expect(consoleSpy).toHaveBeenCalled();
    expect(wrapper.find('.plantText').text()).toBe('');
  });

  it('handles plant not found', async () => {
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => false
    });
    const wrapper = mount(PlantElement, {
      props: { plant: { id: '2' } }
    });
    await flushPromises();
    expect(console.error).toHaveBeenCalledWith('Plant not found');
    expect(wrapper.find('.plantImage').attributes('src')).toBe('/default-image.jpg');
    expect(wrapper.find('.plantText').text()).toBe('Unknown');
  });

  it('navigates to detailed plant page on click', async () => {
    const wrapper = mount(PlantElement, {
      props: { plant: { id: '1' } }
    });
    await flushPromises();
    wrapper.vm.navigateToPlant();
    await flushPromises(); // Ensure all async operations have completed
    expect(useRouter().push).toHaveBeenCalledWith({ name: 'PlantPage', params: { id: '1' } });
  });
});

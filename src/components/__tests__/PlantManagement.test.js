import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PlantManagement from '@/components/PlantManagement.vue';
import '@/firebase'; // Import the Firebase setup
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

// Mock Firebase methods
vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
  getDocs: vi.fn(),
  addDoc: vi.fn(),
  doc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn()
}));

vi.mock('firebase/storage', () => ({
  getStorage: vi.fn(),
  ref: vi.fn(),
  uploadBytes: vi.fn(),
  getDownloadURL: vi.fn()
}));

describe('PlantManagement.vue Tests', () => {
  beforeEach(() => {
    // Mock Firestore and Storage responses
    getFirestore.mockReturnValue({});
    collection.mockReturnValue({});
    getDocs.mockResolvedValue({
      docs: [{ id: '1', data: () => ({ name: 'Plant1', origin: 'Area1', description: 'Description1', imageURL: 'url1' }) }]
    });
    addDoc.mockResolvedValue({ id: '2' });
    doc.mockReturnValue({});
    updateDoc.mockResolvedValue({});
    deleteDoc.mockResolvedValue({});
    getStorage.mockReturnValue({});
    storageRef.mockReturnValue({});
    uploadBytes.mockResolvedValue({});
    getDownloadURL.mockResolvedValue('mock-url');
  });

  it('should mount the component and render initial content', async () => {
    const wrapper = mount(PlantManagement);
    await wrapper.vm.$nextTick(); // Wait for any async operations
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h2').text()).toBe('Add New Plant');
  });

  it('handles form submission for new plant', async () => {
    const wrapper = mount(PlantManagement);
    wrapper.vm.plantData.name = 'New Plant';
    wrapper.vm.plantData.origin = 'New Origin';
    wrapper.vm.plantData.description = 'New Description';
    wrapper.vm.plantData.imageURL = 'new-url';
    await wrapper.vm.$nextTick(); // Wait for DOM updates
    await wrapper.find('form').trigger('submit.prevent');
    expect(addDoc).toHaveBeenCalled();
  });

  it('handles editing a plant', async () => {
    const wrapper = mount(PlantManagement);
    await wrapper.vm.$nextTick(); // Wait for any async operations
    wrapper.vm.editPlant({ id: '1', name: 'Plant1', origin: 'Area1', description: 'Description1', imageURL: 'url1' });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isEditingPlant).toBe(true);
    expect(wrapper.find('h2').text()).toBe('Edit Plant');
  });

  it('handles updating a plant', async () => {
    const wrapper = mount(PlantManagement);
    wrapper.vm.plantData.id = '1';
    wrapper.vm.plantData.name = 'Updated Plant';
    wrapper.vm.plantData.origin = 'Updated Origin';
    wrapper.vm.plantData.description = 'Updated Description';
    wrapper.vm.plantData.imageURL = 'updated-url';
    wrapper.vm.isEditingPlant = true;
    await wrapper.vm.$nextTick(); // Wait for DOM updates
    await wrapper.find('form').trigger('submit.prevent');
    expect(updateDoc).toHaveBeenCalled();
  });

  it('handles deleting a plant', async () => {
    const wrapper = mount(PlantManagement);
    await wrapper.vm.$nextTick(); // Wait for any async operations
    wrapper.vm.deletePlant('1');
    await wrapper.vm.$nextTick();
    expect(deleteDoc).toHaveBeenCalledWith(doc(getFirestore(), 'plants', '1'));
  });
});

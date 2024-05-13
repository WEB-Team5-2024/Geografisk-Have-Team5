import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import EventManagement from '@/components/EventManagement.vue';
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

describe('EventManagement.vue Tests', () => {
  beforeEach(() => {
    // Mock Firestore and Storage responses
    getFirestore.mockReturnValue({});
    collection.mockReturnValue({});
    getDocs.mockResolvedValue({
      docs: [{ id: '1', data: () => ({ title: 'Event1', date: '2023-05-13', description: 'Description1', imageURL: 'url1', program: 'Program1' }) }]
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
    const wrapper = mount(EventManagement);
    await wrapper.vm.$nextTick(); // Wait for any async operations
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h2').text()).toBe('Add New Event');
  });

  it('handles form submission for new event', async () => {
    const wrapper = mount(EventManagement);
    wrapper.vm.eventData.title = 'New Event';
    wrapper.vm.eventData.date = '2024-05-13';
    wrapper.vm.eventData.description = 'New Description';
    wrapper.vm.eventData.imageURL = 'new-url';
    wrapper.vm.eventData.program = 'New Program';
    await wrapper.vm.$nextTick(); // Wait for DOM updates
    await wrapper.find('form').trigger('submit.prevent');
    expect(addDoc).toHaveBeenCalled();
  });

  it('handles editing an event', async () => {
    const wrapper = mount(EventManagement);
    await wrapper.vm.$nextTick(); // Wait for any async operations
    wrapper.vm.editEvent({ id: '1', title: 'Event1', date: '2023-05-13', description: 'Description1', imageURL: 'url1', program: 'Program1' });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isEditingEvent).toBe(true);
    expect(wrapper.find('h2').text()).toBe('Edit Event');
  });

  it('handles updating an event', async () => {
    const wrapper = mount(EventManagement);
    wrapper.vm.eventData.id = '1';
    wrapper.vm.eventData.title = 'Updated Event';
    wrapper.vm.eventData.date = '2024-05-14';
    wrapper.vm.eventData.description = 'Updated Description';
    wrapper.vm.eventData.imageURL = 'updated-url';
    wrapper.vm.eventData.program = 'Updated Program';
    wrapper.vm.isEditingEvent = true;
    await wrapper.vm.$nextTick(); // Wait for DOM updates
    await wrapper.find('form').trigger('submit.prevent');
    expect(updateDoc).toHaveBeenCalled();
  });

  it('handles deleting an event', async () => {
    const wrapper = mount(EventManagement);
    await wrapper.vm.$nextTick(); // Wait for any async operations
    wrapper.vm.deleteEvent('1');
    await wrapper.vm.$nextTick();
    expect(deleteDoc).toHaveBeenCalledWith(doc(getFirestore(), 'events', '1'));
  });
});

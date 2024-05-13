import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AudioUploader from '@/components/AudioUploader.vue';
import '@/firebase'; // Import the Firebase setup
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

// Mock Firebase methods
vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
  getDocs: vi.fn(),
  doc: vi.fn(),
  updateDoc: vi.fn(),
}));

vi.mock('firebase/storage', () => ({
  getStorage: vi.fn(),
  ref: vi.fn(),
  uploadBytes: vi.fn(),
  getDownloadURL: vi.fn(),
}));

describe('AudioUploader.vue Tests', () => {
  beforeEach(() => {
    // Mock Firestore and Storage responses
    getFirestore.mockReturnValue({});
    collection.mockReturnValue({});
    getDocs.mockResolvedValue({
      docs: [{ id: '1', data: () => ({ name: 'Area1' }) }]
    });
    doc.mockReturnValue({});
    updateDoc.mockResolvedValue({});
    getStorage.mockReturnValue({});
    storageRef.mockReturnValue({});
    uploadBytes.mockResolvedValue({});
    getDownloadURL.mockResolvedValue('mock-url');
  });

  it('should mount the component and render initial content', async () => {
    const wrapper = mount(AudioUploader);
    await wrapper.vm.$nextTick(); // Wait for any async operations
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h2').text()).toBe('Audio Management');
  });

  it('should select a file and update the file input', async () => {
    const wrapper = mount(AudioUploader);
    const file = new File(['audio content'], 'test.mp3', { type: 'audio/mp3' });

    // Simulate file selection
    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, 'files', {
      value: [file],
      writable: false,
    });

    await input.trigger('change');
    expect(wrapper.vm.fileInput).toBe(file);
  });

  it('should upload the audio file and save the URL to Firestore', async () => {
    const wrapper = mount(AudioUploader);
    wrapper.vm.selectedArea = '1';
    const file = new File(['audio content'], 'test.mp3', { type: 'audio/mp3' });

    // Simulate file selection
    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, 'files', {
      value: [file],
      writable: false,
    });

    await input.trigger('change');
    await wrapper.vm.uploadAudio();

    expect(uploadBytes).toHaveBeenCalled();
    expect(getDownloadURL).toHaveBeenCalled();
    expect(updateDoc).toHaveBeenCalled();
  });

  it('should not upload the audio file if no file or area is selected', async () => {
    const wrapper = mount(AudioUploader);
    const uploadSpy = vi.spyOn(wrapper.vm, 'uploadAudio');

    await wrapper.find('button.submit-btn').trigger('click');
    expect(uploadSpy).not.toHaveBeenCalled();
  });
});

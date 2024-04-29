import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import LoginView from '@/views/LoginView.vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Mocking Firebase Auth functions
vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({})),
  signInWithEmailAndPassword: vi.fn(() => Promise.resolve({ user: {} }))
}));

describe('LoginView.vue', () => {
  it('renders login form', () => {
    const wrapper = mount(LoginView);
    expect(wrapper.find('h2').text()).toEqual('Admin Login');
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
  });

  it('submits the form and calls signInWithEmailAndPassword', async () => {
    const wrapper = mount(LoginView);
    const emailInput = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[type="password"]');
    const form = wrapper.find('form');

    await emailInput.setValue('admin@example.com');
    await passwordInput.setValue('password');
    await form.trigger('submit.prevent');

    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });
});

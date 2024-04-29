import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import RegisterUsers from '@/views/RegisterUsers.vue';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Mocking Firebase Auth functions
vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({})),
  createUserWithEmailAndPassword: vi.fn(() => Promise.resolve({ user: {} }))
}));

describe('RegisterUsers.vue', () => {
  it('renders register form', () => {
    const wrapper = mount(RegisterUsers);
    expect(wrapper.find('h2').text()).toEqual('Admin Register');
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
  });

  it('submits the form and calls createUserWithEmailAndPassword', async () => {
    const wrapper = mount(RegisterUsers);
    const emailInput = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[type="password"]');
    const form = wrapper.find('form');

    await emailInput.setValue('newadmin@example.com');
    await passwordInput.setValue('newpassword');
    await form.trigger('submit.prevent');

    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });
});

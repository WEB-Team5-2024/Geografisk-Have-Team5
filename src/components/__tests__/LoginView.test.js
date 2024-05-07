import { mount, describe } from 'vitest';
import LoginView from '@/views/LoginView.vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { vitest } from 'vitest';

vitest.mock("firebase/auth", () => ({
  getAuth: vitest.fn(),
  signInWithEmailAndPassword: vitest.fn(),
}));

describe('LoginView.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(LoginView);
  });

  it('renders a form', () => {
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('renders email and password input fields', () => {
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
  });

  it('calls signInWithEmailAndPassword when form is submitted', async () => {
    const emailInput = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[type="password"]');
    const form = wrapper.find('form');

    emailInput.setValue('test@example.com');
    passwordInput.setValue('password');

    await form.trigger('submit.prevent');

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(), // because we don't know what getAuth() will return
      'test@example.com',
      'password'
    );
  });

  afterEach(() => {
    vitest.resetAllMocks();
  });
});

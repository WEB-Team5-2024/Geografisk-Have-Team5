import { shallowMount } from '@vue/test-utils';
import LoginView from '@/views/LoginView.vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

describe('LoginView.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(LoginView);
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
    jest.resetAllMocks();
  });
});

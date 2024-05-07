import { createPinia } from 'pinia'
import { createApp } from 'vue'
import LoginView from '@/views/LoginView.vue'
import { test as it } from 'vitest'

it('renders a form', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  const pinia = createPinia();
  createApp(LoginView).mount(div)

  expect(document.querySelector('form')).not.toBeNull()
})

it('renders email and password input fields', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  const pinia = createPinia();
  createApp(LoginView).mount(div)

  expect(document.querySelector('input[type="email"]')).not.toBeNull()
  expect(document.querySelector('input[type="password"]')).not.toBeNull()
})
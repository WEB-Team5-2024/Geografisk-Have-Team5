import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import LoginView from '@/views/LoginView.vue'
import { test as it } from 'vitest'
import { renderToString } from '@vue/server-renderer'

it('renders a form', async () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  const pinia = createPinia()
  const app = createApp(LoginView).use(pinia)
  div.innerHTML = await renderToString(app)

  expect(document.querySelector('form')).not.toBeNull()
})

it('renders email and password input fields', async () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  const pinia = createPinia()
  const app = createApp(LoginView).use(pinia)
  div.innerHTML = await renderToString(app)

  expect(document.querySelector('input[type="email"]')).not.toBeNull()
  expect(document.querySelector('input[type="password"]')).not.toBeNull()
})
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import LoginView from '@/views/LoginView.vue'
import { test as it } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import assert from 'assert'

it('renders a form', async () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  const pinia = createPinia()
  const app = createApp(LoginView).use(pinia)
  div.innerHTML = await renderToString(app)

  assert(document.querySelector('form') !== null, 'Form is not rendered')
})

it('renders email and password input fields', async () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  const pinia = createPinia()
  const app = createApp(LoginView).use(pinia)
  div.innerHTML = await renderToString(app)

  assert(document.querySelector('input[type="email"]') !== null, 'Email input field is not rendered')
  assert(document.querySelector('input[type="password"]') !== null, 'Password input field is not rendered')
})
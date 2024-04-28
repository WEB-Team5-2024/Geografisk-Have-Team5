import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BottomNav from '@/components/bottomNav.vue';
import { RouterLinkStub } from '@vue/test-utils'

describe('BottomNav.vue', () => {
  it('has router links to expected paths', () => {
    const wrapper = mount(BottomNav, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })

    const links = wrapper.findAllComponents(RouterLinkStub)

    // Check if there are three links
    expect(links).toHaveLength(3)

    // Check if the paths are correct
    const expectedPaths = ['/calender', '/', '/map']
    links.forEach((link, index) => {
      expect(link.props().to).toEqual(expectedPaths[index])
    })
  })
})

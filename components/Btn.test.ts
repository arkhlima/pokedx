import { it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Btn from './Btn.vue'

it('should emit correctly', async () => {
	const wrapper = shallowMount(Btn)

	wrapper.vm.$emit('click')
	await wrapper.vm.$nextTick()

	expect(wrapper.emitted().click).toBeTruthy()
})

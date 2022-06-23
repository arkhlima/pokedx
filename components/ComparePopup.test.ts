import { it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ComparePopup from './ComparePopup.vue'

let wrapper
const buildWrapper = (config = {}) => {
	return shallowMount(ComparePopup, {
		props: config.props,
	})
}

it.each([
	[
		['charizard', 'chikorita'],
		['charizard', 'chikorita'],
	],
	[['charizard'], ['charizard', '???']],
])('should render correctly', (givenProps, expectedDisplay) => {
	wrapper = buildWrapper({
		props: {
			comparison: givenProps,
		},
	})

	expect(wrapper.find('.comparison__first-comparator').text()).toBe(
		expectedDisplay[0]
	)
	expect(wrapper.find('.comparison__second-comparator').text()).toBe(
		expectedDisplay[1]
	)
})

it.each([
	[['charizard', 'chikorita'], 'false'],
	[['charizard'], 'true'],
])(
	'should disable button if comparator !== 2',
	(givenProps, isCompareButtonDisabled) => {
		wrapper = buildWrapper({
			props: {
				comparison: givenProps,
			},
		})

		expect(wrapper.find('.comparison__btn').attributes().disabled).toBe(
			isCompareButtonDisabled
		)
	}
)

import { describe, expect, it } from 'vitest'
import padNumber from './padNumber'

describe('padNumber', () => {
	it.each([
		[5, '#005'],
		[55, '#055'],
		[555, '#555'],
		[5555, '#5555'],
	])('Should return value correctly', (input, output) => {
		expect(padNumber(input)).toEqual(output)
	})
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
// e.g. 5 -> #005
export default function (val: number) {
	return `#${String(val).padStart(3, '0')}`
}

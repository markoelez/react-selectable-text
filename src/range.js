/**
 * Class representing a range of text
 * @property {number} start: start index of selection
 * @property {number} end: end index of selection
 * @property {string} text: the actual text selection
 * @property {number} docX: position X on viewport
 * @property {number} docY: position Y on viewport
 */
export default class Range {
	constructor(start, end, text, docX, docY) {
		this.start = start
		this.end = end
		this.text = text
		this.docX = docX
		this.docY = docY
	}
}

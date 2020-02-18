import React from 'react'
import PropTypes from 'prop-types'
import { Component } from 'react'
import Node from './node'
import Range from './range'
import { debounce } from './helpers'

export default class SelectableText extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentSelection: {}
		}
	}

	shouldComponentUpdate(newProps, newState) {
		// if new provided selections are different, re-render component
		return (
			newProps.ranges?.length != this.props.ranges?.length ||
			newProps.text != this.props.text ||
			newState.currentSelection != this.state.currentSelection
		)
	}

	getRange(idx) {
		// check if this index is in current range
		if (
			this.props.storeSelect &&
			idx >= this.state.currentSelection.start &&
			idx <= this.state.currentSelection.end
		) {
			return this.state.currentSelection
		}
		// return range containing this index
		return (
			this.props.ranges &&
			this.props.ranges.find(range => idx >= range.start && idx <= range.end)
		)
	}

	onMouseOverSelection(range, visible) {
		if (visible && this.props.onMouseOverSelection) {
			this.props.onMouseOverSelection(range)
		}
	}

	getNode(idx, range) {
		return (
			<Node
				id={this.props.id}
				range={range}
				idx={idx}
				selectStyle={this.props.selectStyle}
			>
				{this.props.text[idx]}
			</Node>
		)
	}

	mouseEvent(e) {
		let selectionText = ''
		if (window.getSelection()) {
			selectionText = window.getSelection().toString()
		}
		if (!selectionText || !selectionText.length) {
			this.setState({ currentSelection: '' })
			return false
		}
		const range = window.getSelection().getRangeAt(0)

		const startContainerPos = parseInt(
			range.startContainer.parentNode.dataset.position
		)
		const endContainerPos = parseInt(
			range.endContainer.parentNode.dataset.position
		)

		const startSelect =
			startContainerPos < endContainerPos ? startContainerPos : endContainerPos

		const endSelect =
			startContainerPos < endContainerPos ? endContainerPos : startContainerPos

		const x =
			e.pageX || e.pageY
				? e.pageX
				: e.clientX +
				  document.body.scrollLeft +
				  document.documentElement.scrollLeft

		const y =
			e.pageX || e.pageY
				? e.pageY
				: e.clientY +
				  document.body.scrollTop +
				  document.documentElement.scrollTop

		const rangeObj = new Range(startSelect, endSelect, selectionText, x, y)

		if (this.props.storeSelect) {
			this.setState({ currentSelection: rangeObj })
			window.getSelection().removeAllRanges()
		}
		this.props.onSelect(rangeObj)
	}

	onMouseUp(event) {
		this.mouseEvent.bind(this)(event)
		// debounce(function() {
		// 	this.mouseEvent.bind(this)(event)
		// }, 200).bind(this)()
	}

	getSelections() {
		let textNodes = []
		let last

		for (let i = 0; i < this.props.text.length; ++i) {
			const range = this.getRange(i)
			const node = this.getNode(i, range)

			if (!range) {
				textNodes.push(node)
				continue
			}

			last = range
			const word = [node]
			let rangeIdx = i + 1
			for (; rangeIdx < parseInt(range.end) + 1; ++rangeIdx) {
				word.push(this.getNode(rangeIdx, range))
				i = rangeIdx
			}
			textNodes.push(word)
		}

		if (last) {
			this.onMouseOverSelection(last, true)
		}

		return textNodes
	}

	render() {
		// get all provided ranges
		const text = this.getSelections()
		return (
			<div
				style={this.props.style}
				onMouseUp={this.onMouseUp.bind(this)}
				className={this.props.className}
			>
				{text}
			</div>
		)
	}
}

Selectable.propTypes = {
	ranges: PropTypes.array,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	text: PropTypes.string,
	onMouseOverSelection: PropTypes.func,
	onSelect: PropTypes.func,
	selectStyle: PropTypes.object,
	style: PropTypes.object,
	className: PropTypes.string,
	storeSelect: PropTypes.bool
}

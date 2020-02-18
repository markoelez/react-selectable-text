import React from 'react'
import PropTypes from 'prop-types'
/**
 * Node representing a text character
 * @param {Object} selectStyle: style for a selected node
 * @param {Object} style: default style
 * @param {string} id: node component id
 * @param {number} idx: index of character within text
 * @param {Object} range: range this character belongs to
 */
const Node = props => {
	// check whether node is selected or not
	const getStyle = range => (range ? props.selectStyle : props.style)

	return (
		// store index of node in data-position attribute
		<span data-position={props.idx} style={getStyle(props.range)}>
			{props.children}
		</span>
	)
}

Node.propTypes = {
	selectStyle: PropTypes.object,
	style: PropTypes.object,
	id: PropTypes.string,
	idx: PropTypes.number,
	range: PropTypes.object,
	children: PropTypes.node
}

export default Node

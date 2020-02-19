# react-selectable-text

## Install

`npm install react-selectable-text`

## Usage

```javascript
const handleSelect = selection => {
	// deal with selection here
}

<SelectableText
	ranges={[
		{ start: 0, end: 50 },
		{ start: 80, end: 120 }
	]}
	selectStyle={{ backgroundColor: '#ffcc80' }}
	text={TEXT_STRING}
	onSelect={handleSelect}
	storeSelect={true}
/>
```

## Props

- `ranges`: ranges of text to mark
- `text`: text to mark
- `onMouseOverSelection`: callback when mouse is over a selection
- `onSelect`: callback when a selection is made
- `selectStyle`: style for selected text
- `storeSelect`: whether to store current selection until new selection is made
- `onEmptySelect`: callback for empty click (no text selected)

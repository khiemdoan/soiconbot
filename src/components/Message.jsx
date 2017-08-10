import React from 'react'
import { Grid } from 'semantic-ui-react'

export default class Message extends React.Component {

	render() {
		let color = this.props.fromMe ? '#fff' : '#4b4f56'
		let bgColor = this.props.fromMe ? '#4080ff' : '#f1f0f0'
		let align = this.props.fromMe ? 'right' : 'left'
		let float = this.props.fromMe ? 'right' : 'left'
		let style = {
			color: color,
			backgroundColor: bgColor,
			textAlign: align,
			margin: 5,
			padding: 10,
		}
		return (
			<div style={style}>
				{ this.props.message }
			</div>
		)
	}
}

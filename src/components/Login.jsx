import React from 'react'
import { Input, Button, Icon } from 'semantic-ui-react'

export default class Login extends React.Component {

	constructor(props) {
		super(props)
		this.state = {username: ''}
		this.onClick = this.onClick.bind(this)
	}

	onChange(event) {
		this.setState({username: event.target.value})
	}

	onClick() {
		if (this.state.username.length > 0) {
			this.props.login(this.state.username)
		} else {
			alert('Bạn cần nhập tên để bắt đầu!')
		}
	}

	render() {
		return (
			<Input disabled={this.props.disabled} fluid size='large' placeholder='Tên của bạn'>
				<input onChange={e => this.onChange(e)} />
				<Button onClick={this.onClick} color='blue'>Login</Button>
			</Input>
		)
	}
}

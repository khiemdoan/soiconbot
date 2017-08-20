import React from 'react'
import { Form, Input, Button, Icon } from 'semantic-ui-react'

export default class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = { username: this.props.username }
    this.onClick = this.onClick.bind(this)
  }

  onChange(event) {
    this.setState({ username: event.target.value })
  }

  onClick() {
    if (this.props.logined) {
      this.props.logout()
    } else {
      if (this.state.username.length > 0) {
        this.props.loadData(this.state.username)
      } else {
        alert('Bạn cần nhập tên để bắt đầu!')
      }
    }
  }

  render() {
    let buttonContent = this.props.logined ? 'Logout' : 'Login'
    return (

      <Form>
        <Form.Group style={{ margin: '0' }}>
          <Form.Field width={13}>
            <Input disabled={this.props.logined} fluid size='large' placeholder='Tên của bạn' style={{ width: '100%', height: '100%' }}>
              <input onChange={e => this.onChange(e)} value={this.props.username} />
            </Input>
          </Form.Field>
          <Form.Field width={3}>
            <Button
              onClick={this.onClick}
              style={{ width: '100%', height: '100%' }}
              color='blue'>
              {buttonContent}
            </Button>
          </Form.Field>
        </Form.Group>
      </Form>


    )
  }
}

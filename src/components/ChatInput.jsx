import React from 'react'
import { Input, Form, Button, TextArea } from 'semantic-ui-react'

export default class ChatInput extends React.Component {

  constructor(props) {
    super(props)
    this.state = { content: '' }
    this.onChange = this.onChange.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onChange(event, data) {
    this.setState({ content: data.value })
  }

  onKeyUp(event) {
    if (event.key === 'Enter' && this.state.content.length > 0) {
      this.props.sendMessage(this.state.content)
      this.setState({ content: '' })
    }
  }

  onClick(event, data) {
    if (this.state.content.length > 0) {
      this.props.sendMessage(this.state.content)
      this.setState({ content: '' })
    }
  }

  render() {
    return (
      <Form>
        <label>Chat with me:</label>
        <Form.Group>
          <Form.Field width={13}>
            <TextArea
              label='Chat with me...'
              value={this.state.content}
              onChange={this.onChange}
              onKeyUp={this.onKeyUp} />
          </Form.Field>
          <Form.Field width={3}>
            <Button
              onClick={this.onClick}
              style={{ width: '100%', height: '100%' }}
              color='green'>
              Send
            </Button>
          </Form.Field>
        </Form.Group>
      </Form>
    )
  }
}

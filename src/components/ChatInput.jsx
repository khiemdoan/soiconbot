import React from 'react'
import { Input, Form, Button, TextArea } from 'semantic-ui-react'

export default class ChatInput extends React.Component {

  constructor(props) {
    super(props)
    this.state = { content: '' }
    this.onChange = this.onChange.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
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

  render() {
    return (
      <Form>
        <Form.Field>
          <label>Chat with me:</label>
          <TextArea
            label='Chat with me...'
            value={this.state.content}
            onChange={this.onChange}
            onKeyUp={this.onKeyUp} />
        </Form.Field>
      </Form>
    )
  }
}

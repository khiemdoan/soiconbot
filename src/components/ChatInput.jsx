import React from 'react'
import { Input, Button, Container } from 'semantic-ui-react'

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

  onClick() {
    if (this.state.content.length > 0) {
      this.props.sendMessage(this.state.content)
      this.setState({ content: '' })
    }
  }

  render() {
    return (
      <Input onChange={this.onChange} fluid size='large' style={{ bottom: '0px', width: '100%', position: 'absolute' }} >
        <input value={this.state.content} onKeyUp={this.onKeyUp} placeholder='Nội dung tin nhắn' />
        <Button onClick={this.onClick} color='blue'>Send</Button>
      </Input>
    )
  }
}

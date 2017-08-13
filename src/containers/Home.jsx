import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import Login from '../components/Login'
import ChatInput from '../components/ChatInput'
import Conversation from '../components/Conversation'

const host = 'http://35.186.152.205:3010'

export default class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      logined: false,
      messages: [],
    }
    this.login = this.login.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.report = this.report.bind(this)
  }

  login(username) {
    const self = this
    let loadData = false
    let request = new Request(`${host}/check_user?username=${username}`)
    fetch(request).then(response => {
      return response.text()
    }).then(status => {
      if (status === 'false') {
        return fetch(`${host}/create_user?username=${username}`)
      } else if (status === 'true') {
        loadData = true
        return fetch(`${host}/load_data?username=${username}`)
      }
    }).then(response => {
      if (loadData) {
        return response.json()
      } else {
        return response.text()
      }
    }).then(data => {
      if (loadData) {
        let messages = data.chatData
        messages = messages.map(message => {
          message.canSendReport = false
          return message
        })
        self.setState({ messages: messages })
      } else {
        self.setState({ message: [] })
        console.log(data)
      }
    }).catch(err => {
      console.log(err)
      alert('Không kết nối được tới máy chủ!')
    })

    this.setState({ username: username })
  }

  sendMessage(message) {
    if (this.state.username.length <= 0) {
      alert('Bạn cần nhập tên để bắt đầu!')
      return
    }

    const self = this
    let request = new Request(`${host}/chat?username=${this.state.username}&message=${message}`)
    fetch(request).then(response => {
      return response.text()
    }).then(botMessage => {
      let messages = this.state.messages
      messages.push({ isUser: true, message: message, canSendReport: true })
      messages.push({ isUser: false, message: botMessage, canSendReport: true })
      this.setState({ messages: messages })
    }).catch(err => alert('Không kết nối được tới máy chủ!'))
  }

  report(userMessage, botMessage) {
    let request = new Request(`${host}/report`, {
      method: 'post',
      body: JSON.stringify({
        username: this.state.username,
        messageuser: userMessage,
        messagebot: botMessage,
      })
    })
    fetch(request).then(response => {
      return response.text()
    }).then(text => {
      // console.log(text)
    }).catch(err => {
      console.log(err)
      alert('Không kết nối được tới máy chủ!')
    })
  }

  render() {
    return (
      <Container text style={{ height: '100%', position: 'relative' }}>
        <Header as='h1'>SoiCon bot</Header>
        <Login login={this.login} disabled={this.state.logined} />
        <Conversation messages={this.state.messages} report={this.report} username={this.state.username} />
        <ChatInput sendMessage={this.sendMessage} />
      </Container>
    )
  }
}

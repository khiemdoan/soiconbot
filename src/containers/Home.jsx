import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import Login from '../components/Login'
import ChatInput from '../components/ChatInput'
import Conversation from '../components/Conversation'

// const host = 'http://35.186.152.205'
const host = ''

export default class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      logined: false,
      messages: [],
    }
    this.loadData = this.loadData.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.report = this.report.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    this.loadData('')
  }

  loadData(username) {
    const self = this

    let request = new Request(`${host}/loaddata`, {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify({
        username: username,
      })
    })
    fetch(request).then(response => {
      return response.json()
    }).then(data => {
      let logined = false
      if (data.errorCode === 1) {
        logined = true
      }
      self.setState({
        username: data.username,
        messages: data.messages,
        logined: logined
      })
    }).catch(err => {
      console.log(err)
      alert('Không kết nối được tới máy chủ!')
    })
  }

  logout() {
    let request = new Request(`${host}/logout`, {
      credentials: 'include',
    })
    fetch(request).then(response => {
      return reponse.text()
    }).catch(err => console.log(err))
    this.setState({
      username: '',
      messages: [],
      logined: false
    })
  }

  sendMessage(message) {
    if (this.state.username.length <= 0) {
      alert('Bạn cần nhập tên để bắt đầu!')
      return
    }

    const self = this

    let request = new Request(`${host}/chat`, {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify({
        message: message,
      })
    })
    fetch(request).then(response => {
      return response.json()
    }).then(botMessage => {
      let messages = this.state.messages
      messages.push({ bUser: true, message: message })
      messages.push({ bUser: false, message: botMessage.message })
      this.setState({ messages: messages })
    }).catch(err => alert('Không kết nối được tới máy chủ!'))
  }

  report(userMessage, botMessage) {
    let request = new Request(`${host}/report`, {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify({
        userMessage: userMessage,
        botMessage: botMessage,
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
        <Login
          username={this.state.username}
          loadData={this.loadData}
          logout={this.logout}
          logined={this.state.logined} />
        <Conversation messages={this.state.messages} report={this.report} username={this.state.username} />
        <ChatInput sendMessage={this.sendMessage} />
      </Container>
    )
  }
}

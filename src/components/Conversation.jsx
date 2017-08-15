import React from 'react'
import ReactDOM from 'react-dom'
import { Container } from 'semantic-ui-react'
import QuestionAnswer from './QuestionAnswer'

export default class Conversation extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps, prevState) {
    let div = this.refs.box
    div.scrollTop = div.scrollHeight
  }

  render() {
    let messages = this.props.messages
    let qaList = []

    for (let i = 0; i < messages.length; i += 2) {
      qaList.push({
        userMessage: messages[i].message,
        botMessage: messages[i + 1].message,
        canSendReport: messages[i].canSendReport && messages[i + 1].canSendReport
      })
    }

    qaList = qaList.map((qa, key) => {
      return (
        <QuestionAnswer
          key={key}
          username={this.props.username}
          userMessage={qa.userMessage}
          botMessage={qa.botMessage}
          disableReport={!qa.canSendReport}
          report={this.props.report} />
      )
    })

    let style = {
      overflowX: 'hidden',
      overflowY: 'scroll',
      height: '450px',
      position: 'relative',
      margin: '20px 0px',
    }

    return (
      <div style={style} ref='box'>
        {qaList}
      </div>
    )
  }
}

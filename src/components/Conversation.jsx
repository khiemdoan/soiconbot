import React from 'react'
import ReactDOM from 'react-dom'
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
      if (!messages[i].bUser || messages[i + 1].bUser) {
        i--;
        continue;
      }
      qaList.push({
        userMessage: messages[i].message,
        botMessage: messages[i + 1].message,
      })
    }

    qaList = qaList.map((qa, key) => {
      return (
        <QuestionAnswer
          key={key}
          username={this.props.username}
          userMessage={qa.userMessage}
          botMessage={qa.botMessage}
          report={this.props.report} />
      )
    })

    let style = {
      overflowX: 'hidden',
      overflowY: 'scroll',
      height: '450px',
      position: 'relative',
      margin: '20px 0px 0px 0px',
      borderStyle: 'dotted',
      borderWidth: '2px',
    }

    return (
      <div className='ui container' style={style} ref='box'>
        {qaList}
      </div>
    )
  }
}

import React from 'react'
import { Container } from 'semantic-ui-react'
import QuestionAnswer from './QuestionAnswer'

export default class Conversation extends React.Component {

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

		return (
			<Container fluid style={{overflowY: 'scroll', h}}>
				{qaList}
			</Container>
		)
	}
}

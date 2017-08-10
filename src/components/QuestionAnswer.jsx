import React from 'react'
import Message from './Message'
import { Grid, Button } from 'semantic-ui-react'

export default class QuestionAnswer extends React.Component {

	constructor(props) {
		super(props)
		this.state = {disableReport: this.props.disableReport}
		this.report = this.report.bind(this)
	}

	report() {
		this.props.report(this.props.userMessage, this.props.botMessage)
		this.setState({disableReport: true})
	}

	render() {
		return (
			<Grid columns={2}>
				<Grid.Column width={13}>
					<Message fromMe={true} message={this.props.userMessage} username={this.props.username} />
					<Message fromMe={false} message={this.props.botMessage} username="Sói Con" />
				</Grid.Column>
				<Grid.Column width={3} textAlign='center' verticalAlign='middle'>
					<Button onClick={this.report} disabled={this.state.disableReport} color='yellow'>
						Report
					</Button>
				</Grid.Column>
			</Grid>
		)
	}
}

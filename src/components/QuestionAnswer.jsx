import React from 'react'
import Message from './Message'
import { Grid, Button } from 'semantic-ui-react'

export default class QuestionAnswer extends React.Component {

  constructor(props) {
    super(props)
    this.report = this.report.bind(this)
  }

  report() {
    this.props.report(this.props.userMessage, this.props.botMessage)
  }

  render() {
    return (
      <Grid columns={2} style={{margin: '0'}}>
        <Grid.Row>
          <Grid.Column width={13} style={{padding: '5px'}}>
            <Message fromMe={true} message={this.props.userMessage} username={this.props.username} />
            <Message fromMe={false} message={this.props.botMessage} username='Sói Con' />
          </Grid.Column>
          <Grid.Column width={3} textAlign='center' verticalAlign='middle'>
            <Button onClick={this.report} color='yellow'>
              Report
						</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

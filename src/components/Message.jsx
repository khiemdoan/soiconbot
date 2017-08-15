import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'

export default class Message extends React.Component {

  render() {
    let color = this.props.fromMe ? 'blue' : 'grey'
    let bgColor = this.props.fromMe ? '#4080ff' : '#f1f0f0'
    let align = this.props.fromMe ? 'right' : 'left'
    let float = this.props.fromMe ? 'right' : 'left'
    let style = {
      color: color,
      backgroundColor: bgColor,
      textAlign: align,
      margin: 5,
      padding: 10,
    }

    let mesage = this.props.message.trim()

    let messages = mesage.split('\n')
    messages = messages.map((value, index) => {
      return (
        <Grid.Row key={index}>
          <Grid.Column>
            <Segment inverted color={color} floated={float} textAlign={align} size='mini'>
              {value}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      )
    })

    return (
      <Grid columns={1}>
        {messages}
      </Grid>
    )
  }
}

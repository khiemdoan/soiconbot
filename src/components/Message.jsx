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
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Segment inverted color={color} floated={float} textAlign={align} size='mini'>
              {this.props.message}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

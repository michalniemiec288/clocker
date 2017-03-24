import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import moment from 'moment'

class Counter extends Component {
  constructor() {
    super()
    this.state = {
      now: moment().format()
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => this.setState({now: moment().format()}), 1000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    const {fetchTimers, stopTimer, activeTimer, activeTid} = this.props
    return (
      <span>
        <Button
          onClick={() => { stopTimer(activeTid); fetchTimers(); }}
          style={{marginBottom: 20, marginTop: 20}}>
          Stop
        </Button>
        &nbsp;Started:&nbsp;
        {moment.utc(moment(this.state.now).diff(moment(activeTimer.start), 'milliseconds', true)).format('HH:mm:ss')}
      </span>
    )
  }
}

export default Counter
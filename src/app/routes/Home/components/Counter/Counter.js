import React, {Component} from 'react'
import {Button, Image} from 'react-bootstrap'
import moment from 'moment'
import playBtn from '../../../../assets/play-btn.png'
import stopBtn from '../../../../assets/stop-btn.png'

class Counter extends Component {
  constructor() {
    super()
    this.state = {
      now: moment().format(),
      start: null
    }
  }
  componentWillMount() {
    this.interval = setInterval(() => this.setState({now: moment().format()}), 1000)

  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    const {pid, uid, addTimer} = this.props
    const {now, start} = this.state
    return (
      <span>
        {start
          ? <span>
              <Image
                onClick={() => {
                  addTimer({uid, pid, start, end: moment().format()})
                  this.setState({start: null})
                }}
                src={stopBtn}
                style={{height: 30, marginLeft: 30, marginRight: 10}} />
              {moment.utc(moment(now).diff(moment(start), 'milliseconds', true)).format('HH:mm:ss')}
            </span>
          : <span>
              <Image
                onClick={() => this.setState({start: moment().format()})}
                src={playBtn}
                style={{height: 30, marginLeft: 30, marginRight: 10}} />
            </span>
        }
      </span>
    )
  }
}

export default Counter
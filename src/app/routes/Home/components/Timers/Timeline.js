import React, {Component} from 'react'
import TimelineComponent from 'react-visjs-timeline'

const options = {
  width: '100%',
  height: '100px',
  stack: false,
  showMajorLabels: true,
  showCurrentTime: true,
  type: 'background',
  zoomMin: 1000000,
  zoomMax: 100000000,
  rollingMode: true,
  format: {
    minorLabels: {
      minute: 'h:mm',
      hour: 'ha'
    }
  }
}

class Timeline extends Component {
  componentWillMount() {
    this.props.fetchTimeline()
  }
  render() {
    const {timelines, pid} = this.props
    return (
      <TimelineComponent
        options={options}
        items={Object(timelines).hasOwnProperty(`${pid}`) ? timelines[pid] : []} />
    )
  }
}

export default Timeline

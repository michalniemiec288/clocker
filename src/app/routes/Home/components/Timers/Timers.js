import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import moment from 'moment'
import Statistics from '../Statistics/Statistics'
import Timeline from './Timeline'

class Timers extends Component {
  componentWillMount() {
    const {fetchTimers, fetchTimeline, project} = this.props
    fetchTimers()
    fetchTimeline(project)
  }
  render() {
    const {project, timelines, fetchTimeline} = this.props

    return (
      <div>
        <Timeline
          pid={project.pid}
          timeline={timelines[project.pid]}
          fetchTimeline={fetchTimeline}
        />
        Your timers:
        Other timers:
        Statistics:
        {/*<Statistics
          pid={pid}
          uid={uid}
          projectTids={projectTids}
          userTids={userTids}
          timers={timers}
        />*/}
      </div>
    )
  }
}

export default Timers
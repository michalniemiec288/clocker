import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import moment from 'moment'
import Timeline from 'react-calendar-timeline'
import Statistics from '../Statistics/Statistics'

class Timers extends Component {
  componentWillReceiveProps(next) {
    const {timers, fetchTimeline, fetchTimers, project} = this.props
    timers !== next.timers && fetchTimeline(project) 
  }
  render() {
    const {timelines, project, displayName} = this.props

    return (
      <div>
        {timelines && timelines[project.pid] &&
          <Timeline
            groups={[
              {id: 1, title: displayName}
            ]}
            items={timelines[project.pid]}
            defaultTimeStart={moment().add(-6, 'hour')}
            defaultTimeEnd={moment().add(6, 'hour')}
            sidebarWidth={0}
          />
        }
        
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
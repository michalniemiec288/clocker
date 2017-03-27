import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import moment from 'moment'
import Counter from './Counter'
import Statistics from '../Statistics/Statistics'
import Timeline from './Timeline'

class Timers extends Component {
  componentWillMount() {
    this.props.fetchTimers()
  }
  render() {
    const {project, timelines, fetchTimeline} = this.props

    return (
      <div>
        <Timeline
          pid={project.pid}
          timelines={timelines}
          fetchTimeline={fetchTimeline} />

        {/*<div>
          {activeTimer
            ? <Counter
                stopTimer={stopTimer}
                fetchTimers={fetchTimers}
                activeTimer={activeTimer}
                activeTid={activeTid}
                uid={uid}
              />
            : <Button
                onClick={() => { newTimer(uid, pid) }}
                style={{marginBottom: 20, marginTop: 20}}>
                Start counting
              </Button>
          }
        </div>
        Your timers:
        Other timers:
        Statistics:
        <Statistics
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
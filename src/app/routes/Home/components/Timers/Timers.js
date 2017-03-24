import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import moment from 'moment'
import Timeline from 'react-visjs-timeline'
import Counter from './Counter'
import Statistics from '../Statistics/Statistics'

const Timers = ({projectTids, userTids, pid,
      uid, activeTid, displayName, timers, activeTimer,
      newTimer, fetchTimers, stopTimer}) => {

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

  const timersArray = []

  projectTids && timers && Object.keys(projectTids).map((tid, id) =>
    timers[tid] &&
      timersArray.push({
        id,
        start: moment(timers[tid].start),
        end: moment(timers[tid].stop),
        content: displayName
      })
  )

  return (
    <div>
      Timeline:
      <Timeline options={options} items={timersArray} />
      <div>
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
      />
    </div>
  )
}

export default Timers
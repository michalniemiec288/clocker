import React, {Component} from 'react'
import moment from 'moment'

const Statistics = ({pid, uid, projectTids, userTids, timers}) => {
  let totalProjectTime = 0
  projectTids && timers && Object.keys(projectTids).map((tid, i) => {
    if (Object(timers[tid]).hasOwnProperty('stop'))
      totalProjectTime += moment(timers[tid].stop).diff(moment(timers[tid].start), 'milliseconds', true)
  })

  let totalUserInProjectTime = 0
  userTids && timers && Object.keys(userTids).map((tid, i) => {
    if (Object(timers[tid]).hasOwnProperty('stop'))
      totalUserInProjectTime += moment(timers[tid].stop).diff(moment(timers[tid].start), 'milliseconds', true)
  })

  return (
    <div>
      <div>Total time spent on project: {moment.utc(totalProjectTime).format('HH:mm:ss')}</div>
      <div>Your time spent on project: {moment.utc(totalUserInProjectTime).format('HH:mm:ss')}</div>
    </div>
  )
}

export default Statistics
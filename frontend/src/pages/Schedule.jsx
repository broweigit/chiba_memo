import React from 'react'
import { Container } from 'react-bootstrap'
import DailySchedule from '../components/dailyschedule/DailySchedule'
import WeeklySchedule from '../components/weeklyschedule/WeeklySchedule'
import Calendar from '../components/calender/Calendar'

const Schedule = () => {
  return (
    <Container fluid>
      <section>
        <DailySchedule/>
      </section>
      <section>
        <WeeklySchedule/>
      </section>
      <section>
        <Calendar/>
      </section>
    </Container>
  )
}

export default Schedule
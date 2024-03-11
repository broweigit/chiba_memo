import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import DailySchedule from '../components/dailyschedule/DailySchedule'
import WeeklySchedule from '../components/weeklyschedule/WeeklySchedule'
import Calendar from '../components/calender/Calendar'
import { testApi } from '../services/TestApi'

const Schedule = () => {

  const testAuth = async () => { try {await testApi("/schedule")} catch (error) {}};
  testAuth();

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
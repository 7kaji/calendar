import React from 'react';
import dayjs from 'dayjs';

const CalendarContext = React.createContext({
  currentDate: dayjs(),
});

export default CalendarContext;

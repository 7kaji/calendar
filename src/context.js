import React from 'react';

const CalendarContext = React.createContext({
  currentDate: new Date(),
});

export default CalendarContext;

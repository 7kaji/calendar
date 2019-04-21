import React, { useEffect, useContext, useReducer } from 'react';
import { Card, CardContent, GridList, GridListTile, Typography } from '@material-ui/core';
import styled, { css } from 'styled-components';
import dateFns from "date-fns"
// import jaLocale from 'date-fns/locale/ja'
import holidayJp from '@holiday-jp/holiday_jp';
import CalendarContext from '../context';
import calendarReducer from '../reducer';
import CalendarMenu from './CalendarMenu';

// Colors
const dayOfTheWeekNames = ['日', '月', '火', '水', '木', '金', '土'];
const dayOfTheWeekColors = [
  '#dd2c00',
  '#000000',
  '#000000',
  '#000000',
  '#000000',
  '#000000',
  '#0091ea',
];
const dayColors = ['#f8f8f8', '#FFFFFF'];
const todayColor = '#f1f8e9';

const DayCard = styled(Card)`
  margin: 1px;
`;

const DayCardContent = styled(CardContent)(props => css`
  background: ${props.today ? todayColor : dayColors[props.currentmonth]};
`);

const DayTypography = styled(Typography)`
  color: ${props => (props.holiday ? '#dd2c00' : dayOfTheWeekColors[props.dayindex])} !important;
`;

const Calendar = () => {
  const initialState = useContext(CalendarContext);
  const [state, dispatch] = useReducer(calendarReducer, initialState);

  useEffect(() => {
    document.title = `${dateFns.format(state.currentDate, 'YYYY年MM月')}`;
  }, [state.currentDate]);

  const now = new Date();
  const monthStart = dateFns.startOfMonth(state.currentDate);
  const monthEnd = dateFns.endOfMonth(state.currentDate);
  const startDate = dateFns.startOfWeek(monthStart);
  const endDate = dateFns.endOfWeek(monthEnd);
  // const dateFormat = "D";
  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      // formattedDate = dateFns.format(day, dateFormat);
      days.push(
        <GridListTile key={`day-${day.getDate()}`}>
          <DayCard>
            <DayCardContent
              today={(state.currentDate.getFullYear() === now.getFullYear()
                      && state.currentDate.getMonth() === now.getMonth()
                      && day.getDate() === now.getDate()) ? 1 : 0}
              currentmonth={(dateFns.isSameMonth(day, monthStart)) ? 1 : 0}
            >
              <DayTypography
                dayindex={day.getDay()}
                holiday={(holidayJp.isHoliday(day)) ? 1 : 0}
              >
                {day.getDate()}
              </DayTypography>
            </DayCardContent>
          </DayCard>
        </GridListTile>
      );
      day = dateFns.addDays(day, 1);
    }
    rows.push(days);
    days = [];
  }

  return (
    <CalendarContext.Provider value={{ state, dispatch }}>
      <CalendarMenu />
      <GridList cols={7} cellHeight="auto">
        { dayOfTheWeekNames.map((w, i) => {
          const gridList = (
            <GridListTile key={w}>
              <DayCard>
                <DayCardContent
                  today={0}
                  currentmonth={1}
                >
                  <DayTypography
                    dayindex={i}
                    holiday={0}
                  >
                    {w}
                  </DayTypography>
                </DayCardContent>
              </DayCard>
            </GridListTile>
          );
          return gridList;
        })}
        { rows }
      </GridList>
    </CalendarContext.Provider>
  );
};

export default Calendar;

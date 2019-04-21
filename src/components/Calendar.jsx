import React, { useEffect, useContext, useReducer } from 'react';
import { Card, CardContent, GridList, GridListTile, Typography } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { addMonths, lastDayOfMonth } from 'date-fns';
import format from 'date-fns/format';
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
const dayColors = ['#eceff1', '#FFFFFF'];
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
    document.title = `${format(state.currentDate, 'YYYY年MM月')}`;
  }, [state.currentDate]);

  const now = new Date();
  const beginning = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), 1);
  const ending = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), lastDayOfMonth(state.currentDate).getDate());

  const prevMonth = addMonths(state.currentDate, -1);
  const prevMonthEnding = lastDayOfMonth(prevMonth).getDate();
  const nextMonth = addMonths(state.currentDate, 1);

  // TODO: Util
  const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
  const prevMonthRemainders = range((prevMonthEnding - beginning.getDay() + 1), prevMonthEnding, 1);
  const nextMonthRemainders = range(1, 6 - ending.getDay(), 1);

  // TODO: Component
  const prevMonthDays = prevMonthRemainders.map((n) => {
    const day = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), n);
    const gridListTile = (
      <GridListTile key={`prevMonthSpaceDay-${n}`}>
        <DayCard>
          <DayCardContent
            today={0}
            currentmonth={0}
          >
            <DayTypography
              dayindex={day.getDay()}
              holiday={(holidayJp.isHoliday(day)) ? 1 : 0}
            >
              {n}
            </DayTypography>
          </DayCardContent>
        </DayCard>
      </GridListTile>
    );
    return gridListTile;
  });

  // TODO: Component
  const nextMonthDays = nextMonthRemainders.map((n) => {
    const day = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), n);
    const gridListTile = (
      <GridListTile key={`nextMonthSpaceDay-${n}`}>
        <DayCard>
          <DayCardContent
            today={0}
            currentmonth={0}
          >
            <DayTypography
              dayindex={day.getDay()}
              holiday={(holidayJp.isHoliday(day)) ? 1 : 0}
            >
              {n}
            </DayTypography>
          </DayCardContent>
        </DayCard>
      </GridListTile>
    );
    return gridListTile;
  });

  const days = Array.from(Array(lastDayOfMonth(state.currentDate).getDate()).keys()).map(n => n + 1);
  const calendars = days.map((n) => {
    const day = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), n);
    return (
      <GridListTile key={`day-${n}`}>
        <DayCard>
          <DayCardContent
            today={(state.currentDate.getFullYear() === now.getFullYear()
                    && state.currentDate.getMonth() === now.getMonth()
                    && n === now.getDate()) ? 1 : 0}
            currentmonth={1}
          >
            <DayTypography
              dayindex={day.getDay()}
              holiday={(holidayJp.isHoliday(day)) ? 1 : 0}
            >
              {n}
            </DayTypography>
          </DayCardContent>
        </DayCard>
      </GridListTile>
    );
  });

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
        {[...prevMonthDays, ...calendars, ...nextMonthDays]}
      </GridList>
    </CalendarContext.Provider>
  );
};

export default Calendar;

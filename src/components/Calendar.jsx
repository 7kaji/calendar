import React, { useEffect, useContext, useReducer } from 'react';
// eslint-disable-next-line object-curly-newline
import { Card, CardContent, GridList, GridListTile, Typography } from '@material-ui/core';
import styled, { css } from 'styled-components';
import dateFns from 'date-fns';
// import jaLocale from 'date-fns/locale/ja'
import holidayJp from '@holiday-jp/holiday_jp';
import CalendarContext from '../context';
import calendarReducer from '../reducer';
import CalendarMenu from './CalendarMenu';

// Colors
const dayOfTheWeekNames = ['日', '月', '火', '水', '木', '金', '土'];
const dayOfTheWeekColors = [
  '#dd2c00', // red
  '#000000', // black
  '#000000',
  '#000000',
  '#000000',
  '#000000',
  '#0091ea', // blue
];
const dayColors = [
  '#f8f8f8', // thin gray
  '#FFFFFF', // white
];
const todayColor = '#f1f8e9'; // ligth green

const DayCard = styled(Card)`
  margin: 1px;
`;

const DayCardContent = styled(CardContent)(props => css`
  background: ${props.today ? todayColor : dayColors[props.currentmonth]};
`);

const DayTypography = styled(Typography)`
  color: ${props => (props.holiday ? dayOfTheWeekColors[0] : dayOfTheWeekColors[props.dayindex])} !important;
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

  let day = startDate;
  const monthDays = [];
  while (day <= endDate) {
    monthDays.push(day);
    day = dateFns.addDays(day, 1);
  }

  const days = monthDays.map((d) => {
    const gridListTile = (
      <GridListTile key={`day-${dateFns.format(d, 'YYYYMMDD')}`}>
        <DayCard>
          <DayCardContent
            today={(state.currentDate.getFullYear() === now.getFullYear()
                    && state.currentDate.getMonth() === now.getMonth()
                    && d.getDate() === now.getDate()) ? 1 : 0}
            currentmonth={(dateFns.isSameMonth(d, monthStart)) ? 1 : 0}
          >
            <DayTypography
              dayindex={d.getDay()}
              holiday={(holidayJp.isHoliday(d)) ? 1 : 0}
            >
              {d.getDate()}
            </DayTypography>
          </DayCardContent>
        </DayCard>
      </GridListTile>
    );
    return gridListTile;
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
        { days }
      </GridList>
    </CalendarContext.Provider>
  );
};

export default Calendar;

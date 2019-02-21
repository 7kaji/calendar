import React, { useEffect, useContext, useReducer } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import dayjs from 'dayjs';
import holidayJp from '@holiday-jp/holiday_jp';
import CalendarContext from '../context';
import calendarReducer from '../reducer';
import CalendarMenu from './CalendarMenu';

const dayOfTheWeekNames = ['日', '月', '火', '水', '木', '金', '土'];

const DayCard = styled(Card)`
  margin: 1px;
`;

const DayCardContent = styled(CardContent)`
  background: ${props => (props.today ? '#f1f8e9' : '#FFFFFF')};
`;

const dayOfTheWeekColors = [
  '#dd2c00',
  '#000000',
  '#000000',
  '#000000',
  '#000000',
  '#000000',
  '#0091ea',
];

const DayTypography = styled(Typography)`
  color: ${props => (props.holiday ? '#dd2c00' : dayOfTheWeekColors[props.dayindex])} !important;
`;

const Calendar = () => {
  const initialState = useContext(CalendarContext);
  const [state, dispatch] = useReducer(calendarReducer, initialState);

  useEffect(() => {
    document.title = `${state.currentDate.format('YYYY年MM月')}`;
  }, [state.currentDate]);

  const now = new Date();
  const beginning = new Date(state.currentDate.year(), state.currentDate.month(), 1);
  const ending = dayjs(state.currentDate).daysInMonth();

  const calendarSpaces = Object.keys([...Array(beginning.getDay())]).map((n) => {
    const gridListTile = (
      <GridListTile key={`spaceDay-${n}`}>
        <DayCard />
      </GridListTile>
    );
    return gridListTile;
  });

  const days = Array.from(Array(ending).keys()).map(n => n + 1);
  const calendars = days.map((n) => {
    const day = new Date(state.currentDate.year(), state.currentDate.month(), n);
    return (
      <GridListTile key={`day-${n}`}>
        <DayCard>
          <DayCardContent
            today={(state.currentDate.year() === now.getFullYear()
                    && state.currentDate.month() === now.getMonth()
                    && n === now.getDate()) ? 1 : 0}
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
                <DayCardContent>
                  <DayTypography dayindex={i}>{w}</DayTypography>
                </DayCardContent>
              </DayCard>
            </GridListTile>
          );
          return gridList;
        })}
        {[...calendarSpaces, ...calendars]}
      </GridList>
    </CalendarContext.Provider>
  );
};

export default Calendar;

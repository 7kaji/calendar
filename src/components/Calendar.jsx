import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import dayjs from 'dayjs';
import holidayJp from '@holiday-jp/holiday_jp';

const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

const DayCard = styled(Card)`
  margin: 1px;
`;

const DayCardContent = styled(CardContent)`
  background: ${props => (props.today ? '#f1f8e9' : '#FFFFFF')};
`;

const weekDayColors = [
  '#dd2c00',
  '#000000',
  '#000000',
  '#000000',
  '#000000',
  '#000000',
  '#0091ea',
];

const DayTypography = styled(Typography)`
  color: ${props => (props.holiday ? '#dd2c00' : weekDayColors[props.weekday])} !important;
`;

const Calendar = () => {
  const now = new Date();
  const beginning = new Date(now.getFullYear(), now.getMonth(), 1);
  const ending = dayjs(Number(now)).daysInMonth();

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
    const day = new Date(now.getFullYear(), now.getMonth(), n);
    return (
      <GridListTile key={`day-${n}`}>
        <DayCard>
          <DayCardContent today={(day.getDate() === new Date().getDate()) ? 1 : 0}>
            <DayTypography
              weekday={day.getDay()}
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
    <>
      <h2>
        { now.getMonth() + 1 }
        月
      </h2>
      <GridList cols={7} cellHeight="auto">
        {weekdays.map((w, i) => {
          const gridList = (
            <GridListTile key={w}>
              <DayCard>
                <DayCardContent>
                  <DayTypography weekday={i}>{w}</DayTypography>
                </DayCardContent>
              </DayCard>
            </GridListTile>
          );
          return gridList;
        })}
        {[...calendarSpaces, ...calendars]}
      </GridList>
    </>
  );
};

export default Calendar;

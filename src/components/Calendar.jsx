import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import dayjs from 'dayjs';
import holidayJp from '@holiday-jp/holiday_jp';

const dayOfTheWeekNames = ['日', '月', '火', '水', '木', '金', '土'];

const CalendarHeader = styled(Grid)`
  padding-bottom: 5px;
`;

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
  const now = new Date();
  const [currentDate, setCurrentDate] = useState(dayjs());
  useEffect(() => {
    document.title = `${currentDate.format('YYYY年MM月')}`;
  }, [currentDate]);

  const beginning = new Date(currentDate.year(), currentDate.month(), 1);
  const ending = dayjs(currentDate).daysInMonth();

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
    const day = new Date(currentDate.year(), currentDate.month(), n);
    return (
      <GridListTile key={`day-${n}`}>
        <DayCard>
          <DayCardContent
            today={(currentDate.year() === now.getFullYear()
                    && currentDate.month() === now.getMonth()
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
    <>
      <CalendarHeader
        container
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => setCurrentDate(currentDate.subtract(1, 'month'))}
          >
            <span role="img" aria-label="prev">👈</span>
          </Button>
          <Button variant="outlined" color="primary">
            { currentDate.year() }
            年
            { currentDate.month() + 1 }
            月
          </Button>
          <Button
            variant="outlined"
            onClick={() => setCurrentDate(currentDate.add(1, 'month'))}
          >
            <span role="img" aria-label="next">👉</span>
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => setCurrentDate(dayjs())}
          >
            今日
          </Button>
        </Grid>
      </CalendarHeader>

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
    </>
  );
};

export default Calendar;

import React from "react";
import ReactDOM from "react-dom";
// import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styled from 'styled-components';
import dayjs from "dayjs";
import holiday_jp from "@holiday-jp/holiday_jp";
import uuid from "uuid";
const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

const Container = styled.div`
  font-family: sans-serif;
  text-align: center;
`;

const DayCard = styled(Card)`
  margin: 1px;
`

const DayCardContent = styled(CardContent)`
  background: ${props => props.today ? '#f1f8e9' : '#FFFFFF'};
`;

const weekDayColors = [
  "#dd2c00",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#0091ea",
]

const DayTypography = styled(Typography)`
  color: ${props => props.holiday ? '#dd2c00' : weekDayColors[props.weekday]} !important;
`;

function App() {
  const now = new Date();
  const beginning = new Date(now.getFullYear(), now.getMonth(), 1);
  const ending = dayjs(Number(now)).daysInMonth();

  const calendarSpaces = [...Array(beginning.getDay())].map(i => {
    return (
      <GridListTile key={uuid()}>
        <DayCard />
      </GridListTile>
    );
  });

  const days = Array.from(Array(ending).keys()).map(n => n + 1);
  const calendars = days.map(n => {
    const day = new Date(now.getFullYear(), now.getMonth(), n);
    return (
      <GridListTile>
        <DayCard>
          <DayCardContent today={day.getDate() === new Date().getDate()}>
            <DayTypography weekday={day.getDay()} holiday={holiday_jp.isHoliday(day)}>{n}</DayTypography>
          </DayCardContent>
        </DayCard>
      </GridListTile>
    );
  });

  return (
    <Container>
      <Paper>
        <h2>{now.getMonth() + 1}月</h2>
        <GridList cols={7} cellHeight="auto">
          {weekdays.map((w, i) => {
            return (
              <GridListTile key={w}>
                <DayCard>
                  <DayCardContent>
                    <DayTypography weekday={i}>{w}</DayTypography>
                  </DayCardContent>
                </DayCard>
              </GridListTile>
            );
          })}
          {[...calendarSpaces,...calendars]}
        </GridList>
      </Paper>
    </Container>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

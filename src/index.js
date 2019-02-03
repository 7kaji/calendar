import React from "react";
import ReactDOM from "react-dom";
// import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import uuid from "uuid";
import "./styles.css";
import dayjs from "dayjs";
import holiday_jp from "@holiday-jp/holiday_jp";
const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
const cardStyle = { margin: 1 };

function App() {
  const now = new Date();
  const beginning = new Date(now.getFullYear(), now.getMonth(), 1);
  const ending = dayjs(Number(now)).daysInMonth();

  const calendar = [...Array(beginning.getDay())].map(() => {
    return (
      <GridListTile key={uuid()}>
        <Card />
      </GridListTile>
    );
  });

  const days = Array.from(Array(ending).keys()).map(n => n + 1);
  calendar.push(
    days.map(n => {
      const day = new Date(now.getFullYear(), now.getMonth(), n);
      const CardContentStyles = {};
      const TypographyStyles = {};

      if (day.getDay() === 6) {
        TypographyStyles.color = "#0091ea";
      }
      if (day.getDay() === 0 || holiday_jp.isHoliday(day)) {
        TypographyStyles.color = "#dd2c00";
      }
      if (Number(day.getDate()) === Number(new Date().getDate())) {
        CardContentStyles.background = "#f1f8e9";
      }
      return (
        <GridListTile>
          <Card style={cardStyle}>
            <CardContent style={CardContentStyles}>
              <Typography style={TypographyStyles}>{n}</Typography>
            </CardContent>
          </Card>
        </GridListTile>
      );
    })
  );

  return (
    <div className="App">
      <Paper>
        <h2>{now.getMonth() + 1}月</h2>
        <GridList cols={7} cellHeight="auto">
          {weekdays.map((w, i) => {
            const TypographyStyles = {};
            console.log(i);
            if (i === 6) {
              TypographyStyles.color = "#0091ea";
            }
            if (i === 0) {
              TypographyStyles.color = "#dd2c00";
            }
            return (
              <GridListTile key={w}>
                <Card style={cardStyle}>
                  <CardContent>
                    <Typography style={TypographyStyles}>{w}</Typography>
                  </CardContent>
                </Card>
              </GridListTile>
            );
          })}
          {calendar}
        </GridList>
      </Paper>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

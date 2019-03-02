import React, { useContext } from 'react';
import { Button, Grid } from '@material-ui/core';
import styled from 'styled-components';
import CalendarContext from '../context';

const CalendarHeader = styled(Grid)`
  padding-bottom: 5px;
`;

const CalendarMenu = () => {
  const { state, dispatch } = useContext(CalendarContext);

  return (
    <CalendarHeader
      container
      justify="space-between"
      alignItems="flex-start"
    >
      <Grid item>
        <Button
          variant="outlined"
          onClick={() => dispatch({ type: 'PREV_MONTH', payload: state })}
        >
          <span role="img" aria-label="prev-month">👈</span>
        </Button>
        <Button variant="outlined" color="primary">
          { state.currentDate.year() }
          年
          { state.currentDate.month() + 1 }
          月
        </Button>
        <Button
          variant="outlined"
          onClick={() => dispatch({ type: 'NEXT_MONTH', payload: state })}
        >
          <span role="img" aria-label="next-month">👉</span>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          onClick={() => dispatch({ type: 'CURRENT_MONTH', payload: state })}
        >
          今日
        </Button>
      </Grid>
    </CalendarHeader>
  );
};

export default CalendarMenu;

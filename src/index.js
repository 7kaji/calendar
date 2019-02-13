import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./components/Calendar";

import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

const Container = styled.div`
  font-family: sans-serif;
  text-align: center;
`;

function App() {
  return (
    <Container>
      <Paper>
        <Calendar />
      </Paper>
    </Container>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

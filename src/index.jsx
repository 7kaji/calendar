import React from 'react';
import ReactDOM from 'react-dom';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import Calendar from './components/Calendar';

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

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

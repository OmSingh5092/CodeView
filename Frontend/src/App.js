import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@material-ui/core';
import {appTheme} from './app/res/themes'

import Main from './app/Main';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
          <Main/>
    </ThemeProvider>
  );
}

export default App;

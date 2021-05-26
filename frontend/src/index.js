import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
	palette: {
	  type: 'dark',
	},
  typography: {
    fontFamily: [
      'Poppins',
    ].join(','),
  }
  
});
const routing = (
    <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
      <App></App>
      </ThemeProvider>
    </React.StrictMode>
);

ReactDOM.render(routing, document.getElementById('root'));
import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import TrendingHashtags from './components/trendinghashtags';
import FlightDetails from './components/FlightDetails';
import ToDo from './components/ToDo';
import Weather from './components/Weather';
import RideServices from './components/RideServices';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0078d2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
    },
    textPrimary: {
      main: '#ffffff'
    }
  },
});

class SimpleAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    // Get user
    fetch('https://aa-hacktx.herokuapp.com/user?email=jimenez.gustavo41%40gmail.com')
      .then((response) => {
        return response.json();
      }).then((response) => {
        console.log(response);
        this.setState({ name: response.firstName })
      });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className='Root'>
          <AppBar color="primary" position="static">
            <Toolbar>
              <Typography variant="h6" color='secondary'>
                Welcome, {this.state.name}
              </Typography>
            </Toolbar>
          </AppBar>
          <FlightDetails></FlightDetails>
          <Weather></Weather>
          <RideServices></RideServices>
          <TrendingHashtags />
          <ToDo></ToDo>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default SimpleAppBar;

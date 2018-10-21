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
        fetch('https://aa-hacktx.herokuapp.com/reservation?userId=' + response._id) // Get flights
          .then((response) => {
            console.log(response);
            return response.json()
          })
          .then((res) => {
            console.log(res)
            const flight = res.flights[0];
            this.setState({
              origin: flight.origin,
              destination: flight.destination,
              departureTime: flight.departureTime,
              arrivalTime: flight.arrivalTime,
              flightStatus: flight.flightStatus,
              flightNumber: flight.flightNumber,
              cost: flight.cost
            })
          })
      })
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
          <FlightDetails departureTime={this.state.departureTime} flightNumber={this.state.flightNumber} origin={this.state.origin} destination={this.state.destination} />
          <ToDo></ToDo>
          <Weather></Weather>
          <TrendingHashtags />
          <RideServices></RideServices>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default SimpleAppBar;

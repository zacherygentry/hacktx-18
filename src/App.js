import React from 'react';
//Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import TrendingHashtags from './components/trendinghashtags';
import FlightDetails from './components/FlightDetails';
import ToDo from './components/ToDo';
import Weather from './components/Weather';
import RideServices from './components/RideServices';

const theme = createMuiTheme({
  shadows: ["none"],
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
    this.state = {
      isLoggedIn: false,
      email: '',
      errorLoggingIn: false,
    }
  }

  componentDidMount() {
    // this.getInfo();
  }

  getInfo(email) {
    // Get user
    console.log(email);
    fetch('https://aa-hacktx.herokuapp.com/user?email=' + email)
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        }
        else {
          this.setState({ errorLoggingIn: true })
          return null;
        }
      }).then((response) => {
        console.log(response);
        if (response != null) {
          this.setState({ name: response.firstName })
        }
        const id = response != null ? response._id : '';
        fetch('https://aa-hacktx.herokuapp.com/reservation?userId=' + id) // Get flights
          .then((response) => {
            console.log(response);
            if (response.status == 200) {
              return response.json()
            }
            else {
              this.setState({ errorLoggingIn: true })
              return null;
            }
          })
          .then((res) => {
            console.log(res)
            if (res != null) {
              const flight = res.flights[0];
              this.setState({
                origin: flight.origin,
                destination: flight.destination,
                departureTime: flight.departureTime,
                arrivalTime: flight.arrivalTime,
                flightStatus: flight.flightStatus,
                flightNumber: flight.flightNumber,
                cost: flight.cost,
                isLoggedIn: true
              })
            }
          })
      })
  }

  onSubmit(email) {
    this.getInfo(email);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const styles = {
      loginPage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 800
      },
      userInformation: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
      }
    }


    return (
      <MuiThemeProvider theme={theme}>

        <div className='Root'>

          {this.state.isLoggedIn &&
            <div>
              <AppBar color="primary" position="static">
                <Toolbar>
                  <Typography variant="h6" color='secondary'>
                    Welcome, {this.state.name}
                  </Typography>
                </Toolbar>
              </AppBar>
              <FlightDetails departureTime={this.state.departureTime} flightNumber={this.state.flightNumber} origin={this.state.origin} destination={this.state.destination} />
              <Weather></Weather>
              <RideServices></RideServices>
              <TrendingHashtags />
              <ToDo></ToDo>
            </div>
          }
          {!this.state.isLoggedIn &&
            <div style={styles.loginPage}>
              <div style={styles.userInformation}>
                <TextField
                  error={this.state.errorLoggingIn == true ? true : false}
                  id="standard-with-placeholder"
                  label="Email"
                  placeholder="email"
                  margin="normal"
                  onChange={this.handleChange('email')}
                />
                <TextField
                  id="standard-password-input"
                  type="password"
                  label="Password"
                  placeholder="password"
                  margin="normal"
                />
              </div>
              <Button variant="contained" color="primary" onClick={() => { this.onSubmit(this.state.email) }}>
                Submit
            </Button>
            </div>
          }

        </div>
      </MuiThemeProvider>


    );
  }
}

export default SimpleAppBar;

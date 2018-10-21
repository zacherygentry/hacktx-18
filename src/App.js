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
import airplane from './airplane.png'


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

const steps = [
  {
    id: '0',
    message: 'Welcome to react chatbot!',
    trigger: '1',
  },
  {
    id: '1',
    message: 'Bye!',
    end: true,
  },
];

const airports = [
  { airport: "DFW", lat: 32.9222, lon: -97.0409 },
  { airport: "LAX", lat: 33.9456, lon: -118.391 },
  { airport: "MIA", lat: 25.7953, lon: -80.2727 },
  { airport: "PHL", lat: 39.8744, lon: -75.247245 },
  { airport: "ORD", lat: 41.9742, lon: -87.9073 },
  { airport: "JFK", lat: 40.6413, lon: -73.7781 },
  { airport: "LHR", lat: 51.4700, lon: -0.4543 },
  { airport: "HKG", lat: 22.3080, lon: 113.9185 },
  { airport: "DCA", lat: 38.8512, lon: -77.0402 },
  { airport: "LGA", lat: 40.7769, lon: -73.8740 },
]


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
        if (response.status === 200) {
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
            if (response.status === 200) {
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
              });
            }
          })
          .then(() => {
            let airport = airports.filter((item) => item.airport === this.state.destination);
            console.log(airport);
            if (airport) {
              fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${airport[0].lat}&lon=${airport[0].lon}&cnt=5&APPID=3015d1a66cab25c92dd4eb00b40302b5&units=imperial`)
                .then(res => res.json())
                .then(res => { this.setState({ forecasts: res.list }, () => console.log(this.state.forecasts)) })
                .catch(err => console.error("Something went wrong: " + err))
            }
          }
          )
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
        height: 800,
      },
      userInformation: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
      },
      TextFieldContent: {
        MarginTop: '10%',
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
                  <img src={airplane} style={{ width: 55, height: 55 }} alt="airplane" />
                </Toolbar>
              </AppBar>
              {/* <FlightDetails departureTime={this.state.departureTime} flightNumber={this.state.flightNumber} flightStatus={this.state.flightStatus} origin={this.state.origin} destination={this.state.destination} /> */}
              <Weather forecasts={this.state.forecasts} destination={this.state.destination} />
              <ToDo />
              <TrendingHashtags />
            </div>

          }
          {!this.state.isLoggedIn &&
            <div className="Login-Page" style={styles.loginPage}>
              <div style={styles.userInformation}>
                <TextField
                  error={this.state.errorLoggingIn}
                  id="standard-with-placeholder"
                  label="Email"
                  placeholder="email"
                  margin="normal"
                  style={styles.TextFieldContent}
                  onChange={this.handleChange('email')}
                />
                <TextField
                  id="standard-password-input"
                  type="password"
                  label="Password"
                  placeholder="password"
                  margin="normal"
                />
                <Button variant="contained" color="primary" onClick={() => { this.onSubmit(this.state.email) }}>
                  Submit
                </Button>
              </div>
              
            </div>
          }

        </div>
      </MuiThemeProvider>


    );
  }
}

export default SimpleAppBar;

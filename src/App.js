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
    }
  }

  componentDidMount() {
    // this.getInfo();
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

  onSubmit() {
    this.getInfo();
    this.setState({isLoggedIn: true});
  }

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

        { this.state.isLoggedIn &&
          <div>
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
        }
        { !this.state.isLoggedIn &&
          <div style={styles.loginPage}>
            <div style={styles.userInformation}>
              <TextField
                id="standard-with-placeholder"
                label="Email"
                placeholder="email"
                margin="normal"
              />
              <TextField
                id="standard-password-input"
                type="password"
                label="Password"
                placeholder="password"
                margin="normal"
              />
            </div>
            <Button variant="contained" color="primary" onClick={() => {this.onSubmit()}}>
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

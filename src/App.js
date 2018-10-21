import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TrendingHashtags from './components/trendinghashtags';
import FlightDetails from './components/FlightDetails';
import ToDo from './components/ToDo';
import Weather from './components/Weather';
import RideServices from './components/RideServices';

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
      <div className='Root'>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Welcome, {this.state.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <FlightDetails></FlightDetails>
        <ToDo></ToDo>
        <Weather></Weather>
        <TrendingHashtags />
        <RideServices></RideServices>
      </div>
    );
  }
}

export default SimpleAppBar;

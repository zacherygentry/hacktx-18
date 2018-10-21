import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FlightDetails from './components/FlightDetails';
import ToDo from './components/ToDo';
import RideServices from './components/RideServices';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function SimpleAppBar(props) {
  
  const { classes } = props;
  

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Welcome Zach!
          </Typography>
        </Toolbar>
      </AppBar>
      <FlightDetails></FlightDetails>
      <ToDo></ToDo>
      <RideServices></RideServices>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);

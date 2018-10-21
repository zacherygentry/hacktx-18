import React, {Component} from 'react';
import PropTypes, { nominalTypeHack } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// Material UI
import Card from '@material-ui/core/Card';
import { CardContent, Icon } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { WbCloudy, WbSunny, BeachAccess } from '@material-ui/icons';

// CSS
import '../App.css';


const styles = {
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    forecastItem: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
    },
    forecastList: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: '3%',
      justifyContent: 'center',

    },
    card: {
      shadow: 'none',

    },
};


class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      forecasts: null
    };
  }

  componentDidMount () {
    //this.getForcasts(30.267153,-97.743057);
  }

  getForcasts = (lat, long) => {
    
    this.setState({loading: true, giphs: null})
    
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&cnt=5&APPID=3015d1a66cab25c92dd4eb00b40302b5`)
    .then(res => res.json())
    .then(res => {this.setState({forecasts: res.list})})
    .catch(err => console.error("Something went wrong: " + err))
    
  }
  
  render() {
    const {forecasts} = this.props

    let forcastsContent = forecasts && forecasts.map( (forecast, key ) => {
      let forecastTemp = forecast.main.temp.toFixed(1);
      
      return (
        <div style={styles.forecastItem} key={forecast.dt}>
          {forecast.weather[0].main === "Clear" && <Icon> <WbSunny/> </Icon>}
          {forecast.weather[0].main === "Clouds" && <Icon> <WbCloudy/></Icon>}
          {forecast.weather[0].main === "Rain" && <Icon> <BeachAccess/></Icon>}
          <p>{forecastTemp}</p>
        </div>  
      );
    });

    return (
      <Card className='Card'>
        <CardContent>
          <Typography variant="h6" component="h5">
            5-Day Weather Forecast For {this.props.destination}
          </Typography>
          <div style={styles.forecastList}>
            {forcastsContent}
          </div>
            
        </CardContent>
      </Card>
    );
  }
}

Weather.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Weather);
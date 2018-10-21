import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// Material UI
import Card from '@material-ui/core/Card';
import { CardContent, Icon } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Flight } from '@material-ui/icons';
// CSS
import '../App.css';


const styles = {
    header: {
        display: 'flex',
        flexDirection: 'row',
    },
    headerTitle: {
        marginLeft: '2%'
    },
    body: {
        marginTop: '4%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    detail: {
        display: 'flex',
        flexDirection: 'column',
    },

    centerChild: {
        margin: 'auto'
    },
};


function FlightDetails(props) {
    const { classes } = props;
    let hour = new Date(props.departureTime).getHours() + 5;
    let month = new Date(props.departureTime).getMonth();
    let day = new Date(props.departureTime).getDate();
    const am_pm = hour >= 12 ? 'pm' : 'am';
    hour %= 12;
    let minutes = new Date(props.departureTime).getMinutes();
    if(minutes < 10){
        minutes = '0' + minutes;
    }

    return (
        <Card className='Card'>
            <CardContent>
                <div className={classes.header}>
                    <Icon> <Flight /> </Icon>
                    <Typography variant="h6" component="h5" className={classes.headerTitle}>
                        Flight Details
                        <Typography>{props.origin} -> {props.destination}</Typography>
                        <Typography>Status: {props.flightStatus}</Typography>
                    </Typography>
                </div>

                <div className={classes.body}>
                    <Detail title="Flight" content={props.flightNumber}></Detail>
                    <Detail title="Date" content={month + '/' + day}></Detail>
                    <Detail title="Departure Time" content={hour + ':' + minutes + am_pm}></Detail>
                </div>

            </CardContent>
        </Card >
    );
}

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div style={styles.detail}>
                <Typography style={styles.centerChild} component='h2'>
                    {this.props.title}
                </Typography>
                <Typography style={styles.centerChild} variant='h6' component='h2'>
                    {this.props.content}
                </Typography>
            </div>
        );
    }
}

FlightDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlightDetails);

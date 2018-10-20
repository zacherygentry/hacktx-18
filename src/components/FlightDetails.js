import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// Material UI
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
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
};


function FlightDetails(props) {
    const { classes } = props;

    return (
        <Card className='Card'>
            <CardContent>
                <Typography variant="h6" component="h5">
                    Flight Details
                </Typography>
            </CardContent>
        </Card>
    );
}

FlightDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlightDetails);

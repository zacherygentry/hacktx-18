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
    service: {
        display: 'flex',
        flexDirection: 'column',
    },

    centerChild: {
        margin: 'auto'
    }
};

function RideServices(props) {

    const { classes } = props;
    return (
        <Card className='Card'>
            <CardContent>
                <Typography component="h2" className={classes.headerTitle}>
                    Ride Service Prices
                </Typography>

                <div className={classes.body}>
                    <Service service={'Uber'} price='10'></Service>
                    <Service service={'Lyft'} price='10'></Service>
                    <Service service={'Bird'} price='5'></Service>
                </div>

            </CardContent>
        </Card >
    );
}

class Service extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div style={styles.service}>
                <Typography style={styles.centerChild} component='h2' variant='h6'>
                    {this.props.service + ': $' + this.props.price}
                </Typography>
            </div>
        );
    }
}

RideServices.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RideServices);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// Material UI
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
// import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MessengerCustomerChat from 'react-messenger-customer-chat';



// CSS
import '../App.css';


const styles = theme => ({
  root: {
    width: '100%',
  },

});

let newDoArr = [
  "Have passport/documentation and government issued ID", 
  "Grab phone & laptop chargers",
  "Pack weather appropriate clothes. Check out our weather 5-day weather forecast for help!",
  "Pack travel sized toiletries, stored in resealable plastic bags",
  "Pack medication",
  "Check online to make sure your luggage fits the constraints",
  "Put everything you'll need for the plane ride in your carry on."]


class ToDo extends React.Component {
  state = {
    checked: [0],
    toDoArr: newDoArr,
    inputValue: ''
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];


    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value
    })
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      let myNewArr = [];
      myNewArr = this.state.toDoArr.push(this.state.inputValue)
      this.setState({
        toDoArr: this.state.toDoArr
      })
      console.log(myNewArr)
    }
  }

  handleAddItem = () => {
    let myNewArr = [];
    myNewArr = this.state.toDoArr.push(this.state.inputValue)
    this.setState({
      toDoArr: this.state.toDoArr,
      inputValue: ''
    })
    console.log(myNewArr)
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>

        <Card className='Card'>
          <CardContent>
            <Typography variant="h6" component="h5">
              To Do Before Flight
            </Typography>

            <List>
            <MessengerCustomerChat
      pageId="2025835257495217"
      appId="290859664860684"
    />
              {this.state.toDoArr.map(value => (
                <ListItem
                  key={value}
                  role={undefined}

                  button
                  onClick={this.handleToggle(value)}
                  className={classes.listItem}
                >
                  <Checkbox
                    checked={this.state.checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    color="primary"
                  />
                  <ListItem>{`${value}`}</ListItem>
                </ListItem>
              ))}
              <ListItem>
                <TextField
                  id="outlined-email-input"
                  label="Add Item to list"
                  className={classes.textField}
                  value={this.state.inputValue}
                  onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress}
                  type="text"
                  name="email"
                  margin="normal"
                />
                <Button color="primary" type="submit" onClick={this.handleAddItem} className={classes.button}>
                  Add
                </Button>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </div>
    );
  }
}

ToDo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToDo);
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


// CSS
import '../App.css';


const styles = theme => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    
  });

  let newDoArr = ["Research your trip, Ask our AI Chat bot about things to do!", "Have your passport/documentation", "Purchase travel insurance"]

  
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

    handleChange = (event) =>{
        console.log(this.state.inputValue)
        this.setState({
            inputValue: event.target.value
        })
    }

    handleKeyPress = (event) => {
      if(event.key === 'Enter'){
        let myNewArr = [];
        myNewArr = this.state.toDoArr.push(this.state.inputValue)
        console.log("addaitme")
        this.setState({
            toDoArr: this.state.toDoArr
        })
        console.log(myNewArr)
        console.log(this.state.toDoArr)
      }
    }

    handleAddItem = () =>{
        let myNewArr = [];
        myNewArr = this.state.toDoArr.push(this.state.inputValue)
        console.log("addaitme")
        this.setState({
            toDoArr: this.state.toDoArr
        })
        console.log(myNewArr)
        console.log(this.state.toDoArr)
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
                />
                <ListItem>{`${value}`}</ListItem>
                </ListItem>
              ))}
              <ListItem>
                <TextField
                  id="outlined-email-input"
                  label="Add Item to list"
                  className={classes.textField}
                  value= {this.state.inputValue}
                  onChange ={this.handleChange}
                  onKeyPress={this.handleKeyPress}
                  type="text"
                  name="email"
                  margin="normal"
                />
                <Button color="primary" type="submit" onClick = {this.handleAddItem} className={classes.button}>
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
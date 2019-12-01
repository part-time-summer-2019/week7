import React from 'react';
import './App.css';
import Box from './components/box';

class AppStyles extends React.Component {
  state = {
    time: new Date().toLocaleDateString(),
    msg: "Byte Part time",
    showBoxes: true
  }

  constructor(props) {
    super(props);

    this.handleAppClick = this.handleAppClick.bind(this);
  }


  handleAppClick() {
    this.setState({
      msg: "You Clicked me",
      showBoxes: !this.state.showBoxes
    });
  }


  render() {
    console.log("Render called");

    const style = "App";

    return (
      <div className={style} onClick={() => this.handleAppClick()}>

        <Box size='small' style={{ backgroundColor: 'lightblue' }}>
          Small Box
          </Box>



        <Box size='medium' style={{ marginLeft: '5px', backgroundColor: 'orange' }}>
          Medium Box
          </Box>



        <Box size='large' style={{ marginRight: '8px', backgroundColor: 'yellow' }}>
          Large Box
          </Box>

      </div>
    );
  }
}

export default AppStyles;

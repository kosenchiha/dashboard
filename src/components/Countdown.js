import React, { Component } from "react";

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      diffInDays: 0,
      diffInHours: 0,
      diffInMins: 0,
      diffInSecs: 0,
      finished: false
    };
  }

  componentDidMount() {
    console.log("CountdownDidmount");
    let intervalId = setInterval(this.getTimeLeft, 1000);
    // store intervalId in the state so it can be accessed later:
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  getTimeLeft = props => {
    //console.log("in getTimeLeft", this.props.endTime, "state", this.state);
    if (this.props.endTime !== null) {
      let endTime = this.props.endTime;
      console.log("new Date() >= endTime", new Date() >= endTime);
      console.log("new Date()", new Date());
      console.log("endTime", endTime);
      if (new Date() >= endTime) {
        if (this.state.finished === true) {
          console.log("break in ");
          return;
        }

        this.setState({
          diffInDays: 0,
          diffInHours: 0,
          diffInMins: 0,
          diffInSecs: 0
        });

        this.setState({ finished: true });

        return;
      }

      this.setState({ finished: false });

      let i = endTime.getTime() - new Date().getTime();
      console.log("let i=", i);
      let delta = Math.abs(i) / 1000;

      let days = Math.floor(delta / 86400);
      delta -= days * 86400;
      let hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;
      let minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;
      let seconds = Math.round(delta % 60);

      this.setState({
        diffInDays: days,
        diffInHours: hours,
        diffInMins: minutes,
        diffInSecs: seconds
      });
    }
  };

  render() {
    console.log(this.props.endTime);
    return (
      <div>
        <p>
          {this.state.diffInDays}d:{this.state.diffInHours}h:
          {this.state.diffInMins}m:
          {this.state.diffInSecs}s
        </p>
      </div>
    );
  }
}

export default Countdown;

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
    let intervalId = setInterval(this.getTimeLeft, 1000);
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  getTimeLeft = props => {
    if (this.props.endTime !== null) {
      let endTime = this.props.endTime;
      if (new Date() >= endTime) {
        if (this.state.finished === true) {
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
      let delta = Math.abs(i) / 1000;

      let hours = Math.floor(delta / 3600);
      delta -= hours * 3600;
      let minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;
      let seconds = Math.round(delta % 60);

      this.setState({
        diffInHours: hours,
        diffInMins: ("0" + minutes).slice(-2),
        diffInSecs: ("0" + seconds).slice(-2)
      });
    }
  };

  render() {
    return (
      <div>
        <p>
          {this.state.diffInHours}h:
          {this.state.diffInMins}m:
          {this.state.diffInSecs}s
        </p>
      </div>
    );
  }
}

export default Countdown;

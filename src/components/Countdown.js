import React, { Component } from "react";
import "./countdown.css";

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
        diffInHours: ("0" + hours).slice(-2),
        diffInMins: ("0" + minutes).slice(-2),
        diffInSecs: ("0" + seconds).slice(-2)
      });
    }
  };

  render() {
    return (
      <div class="parent">
        <div class="div1"> Auction Ends In</div>
        <div class="div2"> {this.state.diffInHours}</div>
        <div class="div3">: </div>
        <div class="div4"> {this.state.diffInMins}</div>
        <div class="div5"> :</div>
        <div class="div6"> {this.state.diffInSecs} </div>
        <div class="div7">Hours </div>
        <div class="div8">Mins </div>
        <div class="div9">Secs </div>
      </div>
    );
  }
}

export default Countdown;

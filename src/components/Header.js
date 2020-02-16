import React, { Component } from "react";
import logoScotishWater from "../images/logoName.png";

import Countdown from "./Countdown";
import { getAuctionEndDate } from "../dao/AuctionInfo";

let getDateFromSeconds = date =>
  date !== null && date !== undefined ? new Date(date.seconds * 1000) : null;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      endTime: 0,
      ready: false
    };
  }

  componentDidMount() {
    console.log("header did mount");
    this.setState({ ready: false });
    this.getEndDate();
  }

  getEndDate = () => {
    getAuctionEndDate().onSnapshot(snapshot => {
      let date;
      if (snapshot.data() === undefined) {
        date = null;
      } else {
        date = snapshot.data().endTime;
      }

      this.setState({
        endTime: getDateFromSeconds(date),
        ready: true
      });
    });
  };

  render() {
    return (
      <div className="header-container">
        <img
          className="water-aid-logo"
          src={logoScotishWater}
          alt="WaterAid - Scottish Water Collab"
        />
        <h1 className="title">Silent Auction Dashboard</h1>
        {!this.state.ready ? (
          <p>Loading</p>
        ) : (
          <Countdown endTime={this.state.endTime} />
        )}
      </div>
    );
  }
}

export default Header;

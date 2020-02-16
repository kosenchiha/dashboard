import React from "react";
import LotRetrievalComponent from "../../../lotProcessor/LotRetrievalComponent.js";

class ThirdSlidePlaceholder extends LotRetrievalComponent {
  loopArray = () => {
    let newArray = [];

    this.state.lots.forEach(el => {
      return newArray.push([
        el.data().currentBidderTable,
        el.data().currentBid
      ]);
    });
    return newArray;
  };
  render() {
    this.loopArray();
    return (
      <div>
        <h1>Slide Three</h1>
      </div>
    );
  }
}

export default ThirdSlidePlaceholder;

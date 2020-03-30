import React, { Component } from "react";
import Interval from "./components/interval";
import IotChart from "./components/iotChart";
import "./App.css";

export default class App extends Component {
  state = {
    activeIdx: 0,
    intervals: ["Day", "Month", "Year"]
  };

  handleInterval = (id, event) => {
    event.preventDefault();
    console.log("handleInterval id =", id);
    const activeIdx = this.state.intervals.indexOf(id);
    console.log("handleInterval activeIdx =", activeIdx);
    this.setState({ activeIdx });
  };

  render() {
    return (
      <div className="App">
        <Interval
          activeIdx={this.state.activeIdx}
          intervals={this.state.intervals}
          onClick={this.handleInterval}
        />
        <IotChart
          activeIdx={this.state.activeIdx}
          intervals={this.state.intervals}
        />
      </div>
    );
  }
}

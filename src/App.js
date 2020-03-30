import React, { Component } from "react";
import Interval from "./components/interval";
import IotChart from "./components/iotChart";
import "./App.css";

export default class App extends Component {
  state = {
    intervalIdx: 0,
    intervals: ["Day", "Month", "Year"]
  };

  handleInterval = (id, event) => {
    event.preventDefault();
    console.log("handleInterval id =", id);
    const intervalIdx = this.state.intervals.indexOf(id);
    console.log("handleInterval", intervalIdx);
    this.setState({ intervalIdx });
  };

  render() {
    return (
      <div className="App">
        <Interval
          intervalIdx={this.state.intervalIdx}
          intervals={this.state.intervals}
          onClick={this.handleInterval}
        />
        <IotChart
          intervalIdx={this.state.intervalIdx}
          intervals={this.state.intervals}
        />
      </div>
    );
  }
}

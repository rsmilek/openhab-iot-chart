import React, { Component } from "react";
import Interval from "./components/interval";
import IotChart from "./components/iotChart";
import "./App.css";

export default class App extends Component {
  state = {
    intervalIdx: 0,
    intervals: ["Day", "Week", "Month"]
  };

  handleInterval = intervalIdx => {
    this.setState({ intervalIdx });
  };

  render() {
    return (
      <div className="App">
        <Interval
          intervalIdx={this.state.intervalIdx}
          intervals={this.state.intervals}
          onChange={this.handleInterval}
        />
        <IotChart
          intervalIdx={this.state.intervalIdx}
          intervals={this.state.intervals}
        />
      </div>
    );
  }
}

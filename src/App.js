import React, { Component } from "react";
import Interval from "./components/interval";
import IotChart from "./components/iotChart";
import "./App.css";
const Influx = require("influx");

export default class App extends Component {
  constructor(props) {
    console.log("App", "constructor");
    super(props);

    this.state = {
      intervalIdx: 0,
      intervals: ["Day", "Week", "Month"]
    };

    this.sqlQueries = [
      "SELECT time AS t, Value AS y FROM rp_day.Temperature LIMIT 288",
      "SELECT time AS t, Value AS y FROM rp_week.Temperature LIMIT 168",
      "SELECT time AS t, Value AS y FROM rp_month.Temperature LIMIT 180"
    ];

    this.influx = new Influx.InfluxDB({
      host: "192.168.0.10",
      username: "admin",
      password: "Kolovrat73",
      database: "openweather_db",
      schema: [
        {
          measurement: "Temperature",
          fields: { y: Influx.FieldType.FLOAT },
          tags: []
        }
      ]
    });
  }

  componentDidMount() {
    console.log("App", "componentDidMount");
    this.fetchData(this.state.intervalIdx);
  }

  componentDidUpdate() {
    console.log("App", "componentDidMount");
  }

  fetchData = i => {
    console.log("fetchData");
    this.influx
      .query(this.sqlQueries[i])
      .then(response => {
        console.log("App", "response", response);
        this.setState({ intervalIdx: this.state.intervalIdx }); // Force update IotChart component
      })
      .catch(error => console.log(error));
    console.log("fetchData", "done");
  };

  handleIntervalChange = intervalIdx => {
    this.setState({ intervalIdx });
  };

  render() {
    console.log("App", "render");
    return (
      <div className="App">
        <Interval
          intervalIdx={this.state.intervalIdx}
          intervals={this.state.intervals}
          onChange={this.handleIntervalChange}
        />
        <IotChart
          intervalIdx={this.state.intervalIdx}
          intervals={this.state.intervals}
        />
      </div>
    );
  }
}

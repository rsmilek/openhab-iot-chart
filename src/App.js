import React, { Component } from "react";
import Interval from "./components/interval";
import IotChart from "./components/iotChart";
import "./App.css";
import { INFLUXDB } from "./utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
const Influx = require("influx");
const moment = require("moment");

export default class App extends Component {
  constructor(props) {
    console.log("App", "constructor");
    super(props);

    this.state = {
      intervalIdx: 0,
      intervals: ["Day", "Week", "Month"],
      response: [],
      offset: 0
    };

    this.sqlQueries = [
      "SELECT time AS t, Value AS y FROM rp_day.Temperature LIMIT 288",
      "SELECT time AS t, Value AS y FROM rp_week.Temperature LIMIT 168",
      "SELECT time AS t, Value AS y FROM rp_month.Temperature LIMIT 180"
    ];

    this.influx = new Influx.InfluxDB({
      host: INFLUXDB.host,
      username: INFLUXDB.userName,
      password: INFLUXDB.password,
      database: INFLUXDB.database,
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
    this.fetchData(this.state.intervalIdx, this.state.offset); // Serves to get data for first run
  }

  componentDidUpdate() {
    console.log("App", "componentDidMount");
  }

  fetchData = (intervalIdx, offset = 0) => {
    console.log("App", "fetchData");

    ////
    const aFrom = moment()
      .hours(0)
      .minutes(0)
      .seconds(0);
    const aTo = moment()
      .hours(23)
      .minutes(59)
      .seconds(59);
    console.log("--- ", offset);
    aFrom.add(offset, "d");
    aTo.add(offset, "d");
    console.log("---", aFrom.format(), aTo.format());
    let q =
      "SELECT time AS t, Value AS y FROM rp_day.Temperature WHERE time >= '" +
      aFrom.format() +
      "'" +
      " AND time <= '" +
      aTo.format() +
      "'";
    this.sqlQueries[0] = q;
    ////

    this.influx
      .query(this.sqlQueries[intervalIdx])
      .then(response => {
        console.log("App", "fetchData", "response", response);
        this.setState({ offset: offset, response: response }); // Force update IotChart component
      })
      .catch(error => console.log(error));
    console.log("App", "fetchData", "done");
  };

  handleIntervalChange = intervalIdx => {
    this.setState({ intervalIdx }); // Not perfect solution, but working well (because of async query) 
    this.fetchData(intervalIdx);
  };

  handleSpanPrev = () => {
    let offset = this.state.offset;
    offset--;
    this.fetchData(this.state.intervalIdx, offset);
  };

  handleSpanNext = () => {
    let offset = this.state.offset;
    if (offset < 0) {
      offset++;
      this.fetchData(this.state.intervalIdx, offset);
    }
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

        <button
          className="btn btn-outline-primary btn-sm"
          onClick={this.handleSpanPrev}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <span>&nbsp;{this.state.offset}&nbsp;</span>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={this.handleSpanNext}
          // disabled
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>

        <IotChart
          intervalIdx={this.state.intervalIdx}
          intervals={this.state.intervals}
          response={this.state.response}
        />
      </div>
    );
  }
}

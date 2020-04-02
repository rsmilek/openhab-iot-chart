import React, { Component } from "react";
import Interval from "./components/interval";
import IotChart from "./components/iotChart";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { INTERVALS, INTERVAL_IDX_DAY, INFLUXDB, INFLUX_MEASUREMENTS, SPAN_FROM, SPAN_OFFSET } from "./utils";
const Influx = require("influx");
const moment = require("moment");
const util = require("util");

export default class App extends Component {
  constructor(props) {
    console.log("App", "constructor");
    super(props);
    this.state = {
      intervalIdx: INTERVAL_IDX_DAY, // Index of interval Day/Week/Month
      sqlResponse: [], // SQL response fetched from Influx DB for measurement
      offset: 0 // Offset of chart's time min/max span for interval
    };
    this.influx = new Influx.InfluxDB({
      host: INFLUXDB.host,
      username: INFLUXDB.userName,
      password: INFLUXDB.password,
      database: INFLUXDB.database
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
    console.log("App", "fetchData", "intervalIdx", intervalIdx, "offset", offset);
    // Calc chart's min/max (span) for given interval
    const initMoment = moment();
    const aFrom = moment(initMoment)
      .hours(0)
      .minutes(0)
      .seconds(0);
    aFrom.add(-SPAN_FROM[intervalIdx], "d");
    const aTo = moment(initMoment)
      .hours(23)
      .minutes(59)
      .seconds(59);
    // Move chart's min/max (span) about given offset
    const offsetDays = offset * SPAN_OFFSET[intervalIdx];
    aFrom.add(offsetDays, "d");
    aTo.add(offsetDays, "d");
    console.log("App", "fetchData", "from", aFrom.format(), "to", aTo.format());
    // Query SQL data with given span from measurement for corresponding interval
    const sqlQuery = util.format(
      "SELECT time AS t, Value AS y FROM %s WHERE time >= '%s' AND time <= '%s'",
      INFLUX_MEASUREMENTS[intervalIdx],
      aFrom.format(),
      aTo.format()
    );
    this.influx
      .query(sqlQuery)
      .then(response => {
        console.log("App", "fetchData", "response", response);
        this.setState({ offset: offset, sqlResponse: response }); // Force update React components
      })
      .catch(error => console.log(error));
    console.log("App", "fetchData", "done");
  };

  handleIntervalChange = intervalIdx => {
    this.setState({ intervalIdx }); // Not perfect solution, but working well (because of async SQL query)
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
          intervals={INTERVALS}
          intervalIdx={this.state.intervalIdx}
          onChange={this.handleIntervalChange}
        />

        <button className="btn btn-outline-primary btn-sm" onClick={this.handleSpanPrev}>
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

        <IotChart intervalIdx={this.state.intervalIdx} sqlResponse={this.state.sqlResponse} />
      </div>
    );
  }
}

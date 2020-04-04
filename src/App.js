import React, { Component } from "react";
import Interval from "./components/interval";
import IotChartSpan from "./components/IotChartSpan";
import IotChart from "./components/iotChart";
import "./App.css";
import {
  STATUS_INVALID,
  STATUS_FETCH_MEASUREMENT,
  STATUS_GET_MEASUREMENT_MIN_TIME,
  STATUS_VALID,
  INTERVALS,
  INTERVAL_IDX_DAY
} from "./share";

const moment = require("moment");
const database = require("./database");
const chartSpan = require("./chartSpan");

export default class App extends Component {
  constructor(props) {
    console.log("App", "constructor");
    super(props);
    this.state = {
      status: STATUS_INVALID, // Status of app state machine
      minTime: moment(), // Minimal time value of measurement
      intervalIdx: INTERVAL_IDX_DAY, // Index of interval - Day/Week/Month
      sqlResponse: [], // SQL response fetched from Influx database for measurement
      offset: 0 // Offset of chart's time min/max (span)  for interval
    };
  }

  componentDidMount() {
    console.log("App", "componentDidMount");
    this.setState({ status: STATUS_FETCH_MEASUREMENT });
  }

  componentDidUpdate() {
    console.log("App", "componentDidMount");
    switch (this.state.status) {
      case STATUS_FETCH_MEASUREMENT:
        let span = chartSpan.init(this.state.intervalIdx); // Calc chart's min/max (span) for given interval
        span = chartSpan.move(span, this.state.intervalIdx, this.state.offset); // Move chart's min/max (span) about given offset
        // Query SQL data with given span from measurement for corresponding interval
        database.fetchMeasurement(this.state.intervalIdx, span).then(response => {
          this.setState({ status: STATUS_GET_MEASUREMENT_MIN_TIME, sqlResponse: response });
        });
        break;
      case STATUS_GET_MEASUREMENT_MIN_TIME:
        database.getMeasurementMinTime().then(response => {
          const minTime = moment(response);
          this.setState({ status: STATUS_VALID, minTime: minTime });
        });
        break;
      default:
        break;
    }
  }

  handleIntervalChange = intervalIdx => {
    this.setState({ status: STATUS_FETCH_MEASUREMENT, intervalIdx: intervalIdx, offset: 0, sqlResponse: {} });
  };

  handleSpanChange = offset => {
    this.setState({ status: STATUS_FETCH_MEASUREMENT, offset: offset });
  };

  render() {
    console.log("App", "render");
    if (this.state.status === STATUS_INVALID) return null;
    else {
      return (
        <div className="App">
          <Interval
            intervals={INTERVALS}
            intervalIdx={this.state.intervalIdx}
            onChange={this.handleIntervalChange}
          />
          <IotChartSpan
            offset={this.state.offset}
            minTime={this.state.minTime}
            onChange={this.handleSpanChange}
          />
          <IotChart intervalIdx={this.state.intervalIdx} sqlResponse={this.state.sqlResponse} />
        </div>
      );
    }
  }
}

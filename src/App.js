import React, { Component } from "react";
import Interval from "./components/interval";
import IotChartSpan from "./components/iotChartSpan";
import IotChart from "./components/iotChart";
import IotTable from "./components/iotTable";
import "./App.css";
import {
  STATUS_INVALID,
  STATUS_FETCH_MEASUREMENT,
  STATUS_GET_MEASUREMENT_MIN_TIME,
  STATUS_GET_MEASUREMENT_AGGREGATES,
  STATUS_VALID,
  INTERVALS,
  INTERVAL_IDX_DAY,
  OFFSET_DEFAULT
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
      spanFrom: moment(),
      spanTo: moment(),
      intervalIdx: INTERVAL_IDX_DAY, // Index of interval - Day/Week/Month
      sqlResponse: [], // SQL response fetched from Influx database for measurement
      offset: OFFSET_DEFAULT, // Offset of chart's time min/max (span) for interval
      sqlAggregates: []
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
          this.setState({
            status: STATUS_GET_MEASUREMENT_MIN_TIME,
            spanFrom: span.aFrom,
            spanTo: span.aTo,
            sqlResponse: response
          });
        });
        break;
      case STATUS_GET_MEASUREMENT_MIN_TIME:
        database.getMeasurementMinTime(this.state.intervalIdx).then(response => {
          const minTime = moment(response);
          this.setState({ status: STATUS_GET_MEASUREMENT_AGGREGATES, minTime: minTime });
        });
        break;
      case STATUS_GET_MEASUREMENT_AGGREGATES:
        database
          .fetchMeasurementAggregates(this.state.intervalIdx, {
            aFrom: this.state.spanFrom,
            aTo: this.state.spanTo
          })
          .then(response => {
            this.setState({ status: STATUS_VALID, sqlAggregates: response });
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
            intervalIdx={this.state.intervalIdx}
            offset={this.state.offset}
            minTime={this.state.minTime}
            spanFrom={this.state.spanFrom}
            spanTo={this.state.spanTo}
            onChange={this.handleSpanChange}
          />
          <IotChart intervalIdx={this.state.intervalIdx} sqlResponse={this.state.sqlResponse} />
          <IotTable sqlAggregates={this.state.sqlAggregates} />
        </div>
      );
    }
  }
}

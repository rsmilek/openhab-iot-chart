import React, { Component } from "react";
import Interval from "./components/interval";
import IotChartSpan from "./components/IotChartSpan";
import IotChart from "./components/iotChart";
import "./App.css";
import { INTERVALS, INTERVAL_IDX_DAY, SPAN_FROM, SPAN_OFFSET } from "./utils";
const database = require("./database");
const moment = require("moment");

export default class App extends Component {
  constructor(props) {
    console.log("App", "constructor");
    super(props);
    this.state = {
      intervalIdx: INTERVAL_IDX_DAY, // Index of interval - Day/Week/Month
      sqlResponse: [], // SQL response fetched from Influx database for measurement
      offset: 0 // Offset of chart's time min/max (span)  for interval
    };
  }

  componentDidMount() {
    console.log("App", "componentDidMount");
    this.fetchData(this.state.intervalIdx, this.state.offset); // Serves to get data for first run
  }

  componentDidUpdate() {
    console.log("App", "componentDidMount");
  }

  // Calc chart's min/max (span) for given interval
  calcSpanInit(intervalIdx) {
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
    return { aFrom, aTo };
  }

  // Move chart's min/max (span) about given offset
  moveSpan(span, intervalIdx, offset) {
    const offsetDays = offset * SPAN_OFFSET[intervalIdx];
    span.aFrom.add(offsetDays, "d");
    span.aTo.add(offsetDays, "d");
    return span;
  }

  fetchData = (intervalIdx, offset = 0) => {
    console.log("App", "fetchData", "intervalIdx", intervalIdx, "offset", offset);
    let span = this.calcSpanInit(intervalIdx); // Calc chart's min/max (span) for given interval
    span = this.moveSpan(span, intervalIdx, offset); // Move chart's min/max (span) about given offset
    console.log("App", "fetchData", "from", span.aFrom.format(), "to", span.aTo.format());
    // Query SQL data with given span from measurement for corresponding interval
    database.fetchMeasurement(intervalIdx, span).then(response => {
      this.setState({ offset: offset, sqlResponse: response }); // Force update React components
    });
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
        <IotChartSpan
          offset={this.state.offset}
          onSpanPrev={this.handleSpanPrev}
          onSpanNext={this.handleSpanNext}
        />
        <IotChart intervalIdx={this.state.intervalIdx} sqlResponse={this.state.sqlResponse} />
      </div>
    );
  }
}

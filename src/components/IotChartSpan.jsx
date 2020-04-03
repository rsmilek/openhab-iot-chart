import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const database = require("../database");
const moment = require("moment");

export default class IotChartSpan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minTime: moment()
    };
  }

  componentDidMount() {
    console.log("IotChartSpan", "componentDidMount");
    database.getMeasurementMinTime().then(response => {
      const minTime = moment(response);
      console.log("IotChartSpan", "componentDidMount", "getMeasurementMinTime", minTime);
      this.setState({ minTime: minTime });
    });
  }

  render() {
    console.log("IotChartSpan", "render");
    return (
      <React.Fragment>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={this.props.onSpanPrev}
          // disabled
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <span>&nbsp;{this.props.offset}&nbsp;</span>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={this.props.onSpanNext}
          // disabled
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <span>{this.state.minTime.format()}</span>
      </React.Fragment>
    );
  }
}

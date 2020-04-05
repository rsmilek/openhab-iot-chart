import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const chartSpan = require("../chartSpan");
const moment = require("moment");

export default class IotChartSpan extends Component {
  render() {
    console.log("IotChartSpan", "render");
    return (
      <React.Fragment>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={this.handleSpanPrev}
          //disabled
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <span>&nbsp;{this.props.offset}&nbsp;</span>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={this.handleSpanNext}
          // disabled
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <div>
          <span>{this.props.minTime.format()}</span>
        </div>
        <div>
          <span>{this.props.spanFrom.format()}</span>
        </div>
        <div>
          <span>{this.props.spanTo.format()}</span>
        </div>
      </React.Fragment>
    );
  }

  handleSpanPrev = () => {
    let offset = this.props.offset;
    offset--;
    const { intervalIdx, spanFrom, spanTo, minTime } = this.props;
    // Check if offset of chart's time min/max (span) for interval should be moved backward
    const span = { aFrom: moment(spanFrom), aTo: moment(spanTo) };
    const spanNew = chartSpan.move(span, intervalIdx, -1);
    const diffHours = minTime.diff(spanNew.aTo, "hours");
    if (diffHours <= 0) {
      this.props.onChange(offset); // Fire event to parent component to change state
    }
  };

  handleSpanNext = () => {
    let offset = this.props.offset;
    offset++;
    // Check if offset of chart's time min/max (span) for interval should be moved forward
    if (offset <= 0) {
      this.props.onChange(offset); // Fire event to parent component to change state
    }
  };
}

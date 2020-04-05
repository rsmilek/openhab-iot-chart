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
        <span>{this.getSpanStr()}</span>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={this.handleSpanPrev}
          disabled={!this.checkMovePrev().canMove}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        {/* <span>&nbsp;{this.props.offset}&nbsp;</span> */}
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={this.handleSpanNext}
          disabled={!this.checkMoveNext().canMove}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </React.Fragment>
    );
  }

  getSpanStr = () => {
    const { spanFrom, spanTo } = this.props;
    const fromDay = spanFrom.day();
    const fromMonth = spanFrom.month();
    const fromYear = spanFrom.year();
    const toDay = spanTo.day();
    const toMonth = spanTo.month();
    const toYear = spanTo.year();
    if (fromDay === toDay && fromMonth === toMonth) {
      return spanFrom.format("ddd, MMMM Do YYYY");
    } else {
      if (fromYear === toYear) {
        return (
          spanFrom.format("ddd, MMMM Do") +
          " - " +
          spanTo.format("ddd, MMMM Do") +
          " " +
          spanTo.format("YYYY")
        );
      } else {
        return spanFrom.format("ddd, MMMM Do YYYY") + " - " + spanTo.format("ddd, MMMM Do YYYY");
      }
    }
  };

  // Check if offset of chart's time min/max (span) for interval should be moved backward
  checkMovePrev = () => {
    const { intervalIdx, offset, spanFrom, spanTo, minTime } = this.props;
    const result = { canMove: false, offset: offset };
    result.offset--;
    const span = { aFrom: moment(spanFrom), aTo: moment(spanTo) };
    const spanNew = chartSpan.move(span, intervalIdx, -1);
    const diffHours = minTime.diff(spanNew.aTo, "hours");
    result.canMove = diffHours <= 0;
    return result;
  };

  handleSpanPrev = () => {
    const check = this.checkMovePrev();
    if (check.canMove) this.props.onChange(check.offset); // Fire event to parent component to change state
  };

  // Check if offset of chart's time min/max (span) for interval should be moved forward
  checkMoveNext = () => {
    const result = { canMove: false, offset: this.props.offset };
    result.offset++;
    result.canMove = result.offset <= 0;
    return result;
  };

  handleSpanNext = () => {
    const check = this.checkMoveNext();
    if (check.canMove) this.props.onChange(check.offset); // Fire event to parent component to change state
  };
}

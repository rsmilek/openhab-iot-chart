import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const util = require("util");
const moment = require("moment");
const chartSpan = require("../chartSpan");

export default class IotChartSpan extends Component {
  render() {
    console.log("IotChartSpan", "render");
    return (
      <div className="container">
        <div>
          <div className="float-left ml-4">
            <span className="align-baseline h4  mr-4">
              <strong>Temperature</strong>
            </span>
          </div>
          <div className="float-right mr-4">
            <span className="align-baseline mr-3">{this.getSpanStr()}</span>
            <button
              className="btn btn-link btn-outline-primary btn-sm align-baseline mr-1"
              onClick={this.handleSpanPrev}
              disabled={!this.checkMovePrev().canMove}
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            {/* <span>&nbsp;{this.props.offset}&nbsp;</span> */}
            <button
              className="btn btn-link btn-outline-primary align-baseline btn-sm"
              onClick={this.handleSpanNext}
              disabled={!this.checkMoveNext().canMove}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        </div>
      </div>
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
    } else if (fromYear === toYear) {
      return util.format(
        "%s - %s %s",
        spanFrom.format("ddd, MMMM Do"),
        spanTo.format("ddd, MMMM Do"),
        spanTo.format("YYYY")
      );
    } else
      return util.format("%s - %s", spanFrom.format("ddd, MMMM Do YYYY"), spanTo.format("ddd, MMMM Do YYYY"));
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

import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

// const moment = require("moment");

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
        <span>{this.props.minTime.format()}</span>
      </React.Fragment>
    );
  }

  handleSpanPrev = () => {
    let offset = this.props.offset;
    offset--;
    this.props.onChange(offset); // Fire event to parent component to change state
  };

  handleSpanNext = () => {
    let offset = this.props.offset;
    if (offset < 0) {
      offset++;
      this.props.onChange(offset); // Fire event to parent component to change state
    }
  };
}

import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const moment = require("moment");

export default class IotChartSpan extends Component {

  render() {
    console.log("IotChartSpan", "render");
    return (
      <React.Fragment>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={this.props.onSpanPrev}
          //disabled
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
        <span>{this.props.minTime.format()}</span>
      </React.Fragment>
    );
  }
}

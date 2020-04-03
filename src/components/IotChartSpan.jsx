import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default class IotChartSpan extends Component {
  render() {
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
      </React.Fragment>
    );
  }
}

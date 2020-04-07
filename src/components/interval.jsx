/* eslint-disable jsx-a11y/anchor-is-valid */ // Because of 'href="#"'
import React, { Component } from "react";

export default class Interval extends Component {
  render() {
    return (
      <div className="container">
        <nav aria-label="Interval pagination">
          <ul className="pagination justify-content-center mt-3 mb-4">
            {this.props.intervals.map(i => (
              <li className={this.getPageItemClasses(i)} key={i}>
                <a className="page-link" href="#" onClick={event => this.handleInterval(i, event)}>
                  {i}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }

  handleInterval = (id, event) => {
    event.preventDefault();
    console.log("Interval", "handleInterval", "id", id);
    const intervalIdx = this.props.intervals.indexOf(id);
    console.log("Interval", "handleInterval", "intervalIdx", intervalIdx);
    this.props.onChange(intervalIdx); // Fire event to parent component to change state
  };

  getPageItemClasses(id) {
    const idx = this.props.intervals.indexOf(id);
    let classes = "page-item";
    if (idx === this.props.intervalIdx) classes += " active";
    return classes;
  }
}

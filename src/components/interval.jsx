/* eslint-disable jsx-a11y/anchor-is-valid */ // Because of 'href="#"'
import React, { Component } from "react";

export default class Interval extends Component {
  render() {
    return (
      <React.Fragment>
        <nav aria-label="Interval pagination">
          <ul className="pagination justify-content-center m-2">
            {this.props.intervals.map(i => (
              <li className={this.getPageItemClasses(i)} key={i}>
                <a
                  className="page-link"
                  href="#"
                  onClick={event => this.props.onClick(i, event)}
                >
                  {i}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </React.Fragment>
    );
  }

  getPageItemClasses(id) {
    const idx = this.props.intervals.indexOf(id);
    let classes = "page-item";
    if (idx === this.props.activeIdx) classes += " active";
    return classes;
  }
}

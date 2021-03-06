import React, { Component } from "react";

export default class IotTable extends Component {
  constructor(props) {
    console.log("IotTable", "constructor");
    super(props);
  }

  render() {
    console.log("IotTable", "render", "intervalIdx", this.props.intervalIdx);
    const [sqlAggregate] = this.props.sqlAggregates; // Destruction of first element of array
    // Undefined value of 'sqlAggregate' evaluates false
    if (!sqlAggregate) return null;
    else {
      return (
        <div className="container">
          <div className="container-iottable">
            <table className="table table-bordered table-sm text-sm-left">
              <thead className="thead-light">
                <tr>
                  <th scope="col" style={{ width: "40%" }}></th>
                  <th className="text-right" scope="col" style={{ width: "20%" }}>
                    Avg
                  </th>
                  <th className="text-right" scope="col" style={{ width: "20%" }}>
                    Min
                  </th>
                  <th className="text-right" scope="col" style={{ width: "20%" }}>
                    Max
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Outdoor</th>
                  <td className="text-right">{sqlAggregate.avg.toFixed(2)}</td>
                  <td className="text-right">{sqlAggregate.min.toFixed(2)}</td>
                  <td className="text-right">{sqlAggregate.max.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

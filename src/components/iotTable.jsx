import React, { Component } from "react";

export default class IotTable extends Component {
  constructor(props) {
    console.log("IotTable", "constructor");
    super(props);
  }

  render() {
    console.log("IotTable", "render", "intervalIdx", this.props.intervalIdx);
    const { sqlAggregates } = this.props;
    if (sqlAggregates.length <= 0) return null;
    else {
      return (
        <div className="container">
          <table className="table table-borderless mt-4">
            <thead>
              <tr>
                <th style={{ width: "10%" }}></th>
                <th style={{ width: "80%" }}>
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
                        <td className="text-right">{sqlAggregates[0].avg.toFixed(2)}</td>
                        <td className="text-right">{sqlAggregates[0].min.toFixed(2)}</td>
                        <td className="text-right">{sqlAggregates[0].max.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </th>
                <th style={{ width: "10%" }}></th>
              </tr>
            </thead>
          </table>
        </div>
      );
    }
  }
}

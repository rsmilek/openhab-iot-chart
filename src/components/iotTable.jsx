import React, { Component } from "react";

export default class IotTable extends Component {
  constructor(props) {
    console.log("IotTable", "constructor");
    super(props);
  }

  //   static getDerivedStateFromProps(props, state) {
  //       return { temperatureData: props.sqlResponse };
  //   }

  componentDidMount() {
    // console.log("IotTable", "componentDidMount");
  }

  componentDidUpdate() {
    // console.log("IotTable", "componentDidUpdate");
  }

  render() {
    console.log("IotTable", "render", "intervalIdx", this.props.intervalIdx);
    const { sqlAggregates } = this.props;
    if (sqlAggregates.length <= 0) return null;
    else {
      return (
        <div>
          <div className="container">
            <table className="table text-sm-left table-hover mt-5">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th className="text-right" scope="col">
                    Avg
                  </th>
                  <th className="text-right" scope="col">
                    Min
                  </th>
                  <th className="text-right" scope="col">
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
          </div>
        </div>
      );
    }
  }
}

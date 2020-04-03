import React, { Component } from "react";
import Chart from "chart.js";
import { XAXES_DAY, XAXES_WEEK, XAXES_MONTH } from "../share";

export default class IotChart extends Component {
  data = {
    datasets: [
      {
        label: "Outdoor",
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        pointRadius: 0,
        data: []
      }
    ]
  };

  options = {
    responsive: true,
    scales: {
      xAxes: [],
      yAxis: []
    },
    title: {
      display: true,
      text: "Temperature",
      position: "top",
      fontSize: 16
    },
    legend: {
      display: true,
      position: "bottom"
    },
    animation: {
      duration: 0
    }
  };

  constructor(props) {
    console.log("Chart", "constructor");
    super(props);
    // Create refs to React components using the React.createRef API, which will give us access to the instance methods of such component.
    // NOTE: The actual reference is stored in the current attribute of the ref.
    this.chartRef = React.createRef();
    this.state = {
      temperatureData: []
    };
    this.myChart = {};
    this.xAxesData = [XAXES_DAY, XAXES_WEEK, XAXES_MONTH];
  }

  static getDerivedStateFromProps(props, state) {
    return { temperatureData: props.sqlResponse };
  }

  componentDidMount() {
    console.log("Chart", "componentDidMount");
    // We get context trough current attribute of reference to React component
    this.ctx = this.chartRef.current.getContext("2d");
    this.createChart();
  }

  componentDidUpdate() {
    console.log("Chart", "componentDidUpdate");
    this.createChart();
  }

  resolveChartData() {
    const { intervalIdx } = this.props;
    this.data.datasets[0].data = this.state.temperatureData;
    this.options.scales.xAxes[0] = this.xAxesData[intervalIdx];
  }

  createChart() {
    console.log("Chart", "createChart");
    this.resolveChartData();
    // NOTE: Destroy & Create of Chart.js is the only way how to refresh chart with new data
    // Destroy existing chart if not empty & assigned
    if (Object.keys(this.myChart).length !== 0 && typeof this.myChart) this.myChart.destroy();
    // Create new instance of chart
    this.myChart = new Chart(this.ctx, {
      type: "line",
      data: this.data,
      options: this.options
    });
  }

  render() {
    console.log("Chart", "render", "intervalIdx", this.props.intervalIdx);
    return (
      <React.Fragment>
        <div>
          {/* Adding component reference to chart's canvas */}
          <canvas ref={this.chartRef} />
        </div>
      </React.Fragment>
    );
  }
}

import React, { Component } from "react";
import Chart from "chart.js";
import { DATA_DAY } from "../data/seriesDay";
import { DATA_WEEK } from "../data/seriesWeek";
import { DATA_MONTH } from "../data/seriesMonth";
const Influx = require("influx");

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
      xAxes: []
    },
    title: {
      display: true,
      text: "Temperature",
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

  ctx = {};
  myChart = {};
  influx = {};

  constructor(props) {
    console.log("Chart", "constructor");
    super(props);
    // Create refs to React components using the React.createRef API, which will give us access to the instance methods of such component.
    // NOTE: The actual reference is stored in the current attribute of the ref.
    this.chartRef = React.createRef();

    this.influx = new Influx.InfluxDB({
      host: "192.168.0.10",
      username: "admin",
      password: "Kolovrat73",
      database: "openweather_db",
      schema: [
        {
          measurement: "Temperature",
          fields: { y: Influx.FieldType.FLOAT },
          tags: []
        }
      ]
    });

    this.state = {
      influxData: []
    };
  }

  componentDidMount() {
    console.log("Chart", "componentDidMount");

    this.influx
      .query("SELECT time AS t, Value AS y FROM Temperature LIMIT 288")
      .then(response => {
        console.log("Chart", "response", response);
        this.setState({ influxData: response });
      })
      .catch(error => console.log(error));

    // We get context trough current attribute of reference to React component
    this.ctx = this.chartRef.current.getContext("2d");
    this.createChart();
  }

  componentDidUpdate() {
    console.log("Chart", "componentDidUpdate");
    this.createChart();
  }

  // Assign chart's data depending on flag
  resolveChartData() {
    switch (this.props.activeIdx) {
      case 1:
        this.data.datasets[0].data = DATA_WEEK.series;
        this.options.scales.xAxes[0] = DATA_WEEK.xAxes;
        break;
      case 2:
        this.data.datasets[0].data = DATA_MONTH.series;
        this.options.scales.xAxes[0] = DATA_MONTH.xAxes;
        break;
      default:
        console.log("Chart", "this.state.influxData", this.state.influxData);
        this.data.datasets[0].data = this.state.influxData;

        // this.data.datasets[0].data = DATA_DAY.series;

        this.options.scales.xAxes[0] = DATA_DAY.xAxes;
        break;
    }
  }

  createChart() {
    console.log("Chart", "createChart");
    this.resolveChartData();
    // NOTE: Destroy & Create of Chart.js is the only way how to refresh chart with new data
    // Destroy existing chart if not empty & assigned
    if (Object.keys(this.myChart).length !== 0 && typeof this.myChart)
      this.myChart.destroy();
    // Create new instance of chart
    this.myChart = new Chart(this.ctx, {
      type: "line",
      data: this.data,
      options: this.options
    });
  }

  render() {
    console.log("Chart", "render", "activeIdx", this.props.activeIdx);
    return (
      <React.Fragment>
        <div>
          {/* Adding component reference to chart's canvas */}
          <canvas ref={this.chartRef} />{" "}
        </div>
      </React.Fragment>
    );
  }
}

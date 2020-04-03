const Influx = require("influx");
const util = require("util");

// Defines array interval names
export const INTERVALS = ["Day", "Week", "Month"];

// Interval index - Day
export const INTERVAL_IDX_DAY = 0;
// Interval index - Week
export const INTERVAL_IDX_WEEK = 1;
// Interval index - Month
export const INTERVAL_IDX_MONTH = 2;

// Number of days of chart's from for each interval
export const SPAN_FROM = [0, 6, 29];

// Number of days to move chart's from/to for each interval
export const SPAN_OFFSET = [1, 7, 30];

// Influx DB credentials
export const INFLUXDB = {
  host: "192.168.0.10",
  userName: "admin",
  password: "Kolovrat73",
  database: "openweather_db"
};

// Influx measurements for each interval
export const INFLUX_MEASUREMENTS = ["rp_day.Temperature", "rp_week.Temperature", "rp_month.Temperature"];

export const XAXES_DAY = {
  type: "time",
  time: {
    unit: "hour",
    stepSize: 2,
    displayFormats: {
      hour: "HH:mm"
    }
  },
  bounds: "ticks"
};

export const XAXES_WEEK = {
  type: "time",
  time: {
    unit: "day",
    stepSize: 1,
    displayFormats: {
      day: "DD.MM"
    }
  },
  bounds: "ticks"
};

export const XAXES_MONTH = {
  type: "time",
  time: {
    unit: "day",
    stepSize: 3,
    displayFormats: {
      day: "DD.MM"
    }
  },
  bounds: "ticks"
};

export class Db {
  constructor() {
    this.influx = new Influx.InfluxDB({
      host: INFLUXDB.host,
      username: INFLUXDB.userName,
      password: INFLUXDB.password,
      database: INFLUXDB.database
    });
  }

  // Query SQL data with given span from measurement for corresponding interval
  fetchMeasurement(intervalIdx, span) {
    const sqlQuery = util.format(
      "SELECT time AS t, Value AS y FROM %s WHERE time >= '%s' AND time <= '%s'",
      INFLUX_MEASUREMENTS[intervalIdx],
      span.aFrom.format(),
      span.aTo.format()
    );
    return this.influx
      .query(sqlQuery)
      .then(response => {
        console.log("Db", "fetchMeasurement", "response", response);
        // // this.setState({ offset: offset, sqlResponse: response }); // Force update React components
        return response;
      })
      .catch(error => console.log("Db", "fetchMeasurement", error));
  }
}

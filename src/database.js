const Influx = require("influx");
const util = require("util");

// Influx DB credentials
const INFLUXDB = {
  host: "192.168.0.10",
  userName: "admin",
  password: "Kolovrat73",
  database: "openweather_db"
};

// Influx measurements for each interval
const INFLUX_MEASUREMENTS = ["rp_day.Temperature", "rp_week.Temperature", "rp_month.Temperature"];

const influx = new Influx.InfluxDB({
  host: INFLUXDB.host,
  username: INFLUXDB.userName,
  password: INFLUXDB.password,
  database: INFLUXDB.database
});

// Query SQL data with given span from measurement for corresponding interval
const fetchMeasurement = (intervalIdx, span) => {
  const sqlQuery = util.format(
    "SELECT time AS t, Value AS y FROM %s WHERE time >= '%s' AND time <= '%s'",
    INFLUX_MEASUREMENTS[intervalIdx],
    span.aFrom.format(),
    span.aTo.format()
  );
  return influx
    .query(sqlQuery)
    .then(response => {
      console.log("Db", "fetchMeasurement", "response", response);
      // // this.setState({ offset: offset, sqlResponse: response }); // Force update React components
      return response;
    })
    .catch(error => console.log("Db", "fetchMeasurement", error));
};

exports.fetchMeasurement = fetchMeasurement;

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

// Instance of Influx DB object for further use
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
      console.log("database", "fetchMeasurement", "response", response);
      return response;
    })
    .catch(error => console.log("database", "fetchMeasurement", error));
};

// Query measurement for date-time of first value for given measurement
const getMeasurementMinTime = intervalIdx => {
  return influx
    .query("SELECT first(Value) FROM " + INFLUX_MEASUREMENTS[intervalIdx])
    .then(response => {
      const minTime = response[0].time;
      console.log("database", "getMeasurementMinTime", minTime);
      return minTime;
    })
    .catch(error => console.log("database", "fetchMeasurement", error));
};

const fetchMeasurementAggregates = (intervalIdx, span) => {
  const sqlQuery = util.format(
    "SELECT MIN(Value) AS min, MAX(Value) AS max, MEAN(Value) AS avg FROM %s WHERE time >= '%s' AND time <= '%s'",
    INFLUX_MEASUREMENTS[intervalIdx],
    span.aFrom.format(),
    span.aTo.format()
  );
  return influx
    .query(sqlQuery)
    .then(response => {
      console.log("database", "fetchMeasurementAggregates", "response", response);
      return response;
    })
    .catch(error => console.log("database", "fetchMeasurementAggregates", error));
};

exports.fetchMeasurement = fetchMeasurement;
exports.getMeasurementMinTime = getMeasurementMinTime;
exports.fetchMeasurementAggregates = fetchMeasurementAggregates;

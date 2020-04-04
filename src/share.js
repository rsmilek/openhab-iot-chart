// App status - need to go up = initialization
export const STATUS_INVALID = -1;
// App status - fetch measurement data from Influx DB
export const STATUS_FETCH_MEASUREMENT = 0;
// App status - get min time of measurement from Influx DB
export const STATUS_GET_MEASUREMENT_MIN_TIME = 1;
// App status - is running
export const STATUS_VALID = 2;

// Defines array interval names
export const INTERVALS = ["Day", "Week", "Month"];

// Interval index - Day
export const INTERVAL_IDX_DAY = 0;
// Interval index - Week
export const INTERVAL_IDX_WEEK = 1;
// Interval index - Month
export const INTERVAL_IDX_MONTH = 2;

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

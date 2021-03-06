// App status - need to go up = initialization
export const STATUS_INVALID = -1;
// App status - fetch measurement data from Influx DB
export const STATUS_FETCH_MEASUREMENT = 0;
// App status - get min time of measurement from Influx DB
export const STATUS_GET_MEASUREMENT_MIN_TIME = 1;
// App status - get min time of measurement from Influx DB
export const STATUS_GET_MEASUREMENT_AGGREGATES = 2;
// App status - is running
export const STATUS_VALID = 3;

// Defines array interval names
export const INTERVALS = ["Day", "Week", "Month"];

// Interval index - Day
export const INTERVAL_IDX_DAY = 0;
// Interval index - Week
export const INTERVAL_IDX_WEEK = 1;
// Interval index - Month
export const INTERVAL_IDX_MONTH = 2;

// Init offset of chart's time min/max (span) for interval
// NOTE: Valid values <= 0
export const OFFSET_DEFAULT = 0;

export const XAXES_DAY = {
  type: "time",
  time: {
    unit: "hour",
    stepSize: 4,
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

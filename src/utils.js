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

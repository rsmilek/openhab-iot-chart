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

export const INFLUXDB = {
  host: "192.168.0.10",
  userName: "admin",
  password: "Kolovrat73",
  database: "openweather_db"
};

export const INTERVAL_IDX_DAY = 0;
export const INTERVAL_IDX_WEEK = 1;
export const INTERVAL_IDX_MONTH = 2;

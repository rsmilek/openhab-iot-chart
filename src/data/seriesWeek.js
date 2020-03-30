const SERIES_WEEK = [
  {
    t: "2020-02-01T00:00",
    y: 1
  },
  {
    t: "2020-02-02T00:00",
    y: 2
  },
  {
    t: "2020-02-03T00:00",
    y: 3
  },
  {
    t: "2020-02-04T00:00",
    y: 4
  },
  {
    t: "2020-02-05T00:00",
    y: 5
  },
  {
    t: "2020-02-06T00:00",
    y: 6
  },
  {
    t: "2020-02-07T00:00",
    y: 7
  }
];

const XAXES = {
  type: "time",
  time: {
    unit: "day",
    stepSize: 1,
    displayFormats: {
      day: "DD.MM"
    }
  }
};

export const DATA_WEEK = {
  series: SERIES_WEEK,
  xAxes: XAXES
};

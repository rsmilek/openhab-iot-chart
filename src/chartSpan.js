const moment = require("moment");

// Number of days of chart's from for each interval
const SPAN_FROM = [0, 6, 29];

// Number of days to move chart's from/to for each interval
const SPAN_OFFSET = [1, 7, 30];

// Calc chart's min/max (span) for given interval
const init = intervalIdx => {
  const initMoment = moment();
  const aFrom = moment(initMoment)
    .hours(0)
    .minutes(0)
    .seconds(0);
  aFrom.add(-SPAN_FROM[intervalIdx], "d");
  const aTo = moment(initMoment)
    .hours(23)
    .minutes(59)
    .seconds(59);
  return { aFrom, aTo };
};

// Move chart's min/max (span) about given offset
const move = (span, intervalIdx, offset) => {
  const offsetDays = offset * SPAN_OFFSET[intervalIdx];
  span.aFrom.add(offsetDays, "d");
  span.aTo.add(offsetDays, "d");
  return span;
};

exports.init = init;
exports.move = move;

import moment from "moment";
import "moment/locale/ru";

moment.locale("ru");

function calculateDateDifference(startDate: Date, endDate: Date) {
  const startMoment = moment(startDate);
  const endMoment = moment(endDate);

  const duration = moment.duration(endMoment.diff(startMoment));
  return duration.humanize();
}

export default calculateDateDifference;

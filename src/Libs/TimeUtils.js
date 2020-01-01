//Преобразуем минуты в читаемый вид
export function getTimeFromMins(mins) {
  if (mins < 0) {
    return "--:--";
  }

  if (mins === null) {
    return "00:00";
  } else {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;

    if (minutes <= 9) {
      minutes = "0" + minutes;
    }

    if (hours <= 9) {
      hours = "0" + hours;
    }

    return hours + ":" + minutes;
  }
}

export function getCurrentDate() {
  let date = new Date();

  return getFormatDate(date);
}

export function getFormatDate(date) {
  var formatDate = new Date(date);
  var dd = String(formatDate.getDate()).padStart(2, "0");
  var mm = String(formatDate.getMonth() + 1).padStart(2, "0");
  var yyyy = formatDate.getFullYear();

  return yyyy + "-" + mm + "-" + dd;
}

export function getCurrentTimeFormat() {
  //Получим сегодняшную дату
  var date = new Date();

  return date.getHours() + "-" + date.getMinutes();
}

export function getCurrentDateWithTime() {
  return getCurrentDate() + " " + getCurrentTimeFormat();
}

export function getCurrentDayName() {
  var date = new Date();

  return getShortDayNameByID(date.getDay());
}

export function getShortDayNameByID(id) {
  switch (id) {
    case 1:
      return "ПН";
    case 2:
      return "ВТ";
    case 3:
      return "СР";
    case 4:
      return "ЧТ";
    case 5:
      return "ПТ";
    case 6:
      return "СБ";
    case 0:
      return "ВС";
    default:
      return;
  }
}

export function getDDbyDate(date) {
  return String(date.getDate()).padStart(2, "0");
}

export function getMMbyDate(date) {
  return String(date.getMonth() + 1).padStart(2, "0");
}
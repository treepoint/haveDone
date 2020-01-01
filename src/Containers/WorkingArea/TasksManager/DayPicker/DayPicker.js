import React from "react";
import Button from "../../../../Components/Button/Button";
import DatePicker from "./DatePicker/DatePicker";
import {
  getCurrentDate,
  getShortDayNameByID,
  getDDbyDate,
  getMMbyDate,
  getFormatDate
} from "../../../../Libs/TimeUtils";
import "./DayPicker.css";

class DayPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chosenDay: getCurrentDate() };
  }

  componentDidMount() {
    this.getDaysMenu();
  }

  componentDidUpdate() {
    this.getDaysMenu();
  }

  //Обрабатываем нажатие с кнопок
  onClick(event) {
    this.setState({ chosenDay: getFormatDate(event.target.name) });
    this.props.onChange(getFormatDate(event.target.name));
  }

  //Обрабатываем выбор в Date Picker
  onPickDate(date) {
    this.setState({ chosenDay: getFormatDate(date) });
    this.props.onChange(getFormatDate(date));
  }

  getDaysMenu() {
    let date;
    let daysMenu = [];
    let isPrimary = false;

    /* Если день до среды — показываем текущую неделю и прошлую.
     * Поскольку, вероятно, нас больше интересуют старые данные, а не новая неделя.
     * Если же наступила среда — показываем текущую неделю + следующую.
     */

    let currentDate = new Date().getDay();
    let from;
    let to;

    if (currentDate <= 2) {
      from = -5 + currentDate;
      to = 7 + currentDate;
    } else {
      from = -6 - currentDate;
      to = 6 - currentDate;
    }

    let background = "#fff";

    while (from < to) {
      date = new Date();
      date = new Date(date.setDate(date.getDate() - from));

      //Субботу и воскресенье сделаем серыми, чтобы разграничивать недели
      if (date.getDay() === 6 || date.getDay() === 0) {
        background = "rgb(234, 234, 234)";
      } else {
        background = "#fff";
      }

      //Выделим выбранный день
      if (this.state.chosenDay === getFormatDate(date)) {
        isPrimary = true;
      } else {
        isPrimary = false;
      }

      //Добавим кнопки с датами
      daysMenu.unshift(
        <Button
          name={date}
          style={{
            width: "84px",
            background
          }}
          isPrimary={isPrimary}
          value={
            !!from
              ? getDDbyDate(date) +
                "." +
                getMMbyDate(date) +
                " " +
                getShortDayNameByID(date.getDay())
              : "Сегодня"
          }
          onClick={event => {
            this.onClick(event);
          }}
        ></Button>
      );

      from++;
    }

    //Добавим выбор любой даты
    daysMenu.unshift(
      <DatePicker
        onChange={date => this.onPickDate(date)}
        chosenDay={this.state.chosenDay}
      />
    );

    return daysMenu;
  }

  render() {
    return (
      <div className="dayPicker">
        {this.getDaysMenu().map(button => {
          return button;
        })}
      </div>
    );
  }
}

export default DayPicker;
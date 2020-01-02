import React from "react";
import { getFormatDate } from "../../Libs/TimeUtils";

import "./DatePicker.css";

import DP from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chosenDate: null };
  }

  onChange(date) {
    this.setState({ chosenDate: date });
    this.props.onChange(date);
  }

  render() {
    let className = "datePicker";
    let selected = null;

    if (this.props.chosenDay === getFormatDate(this.state.chosenDate)) {
      className = "datePicker chosen";
      selected = this.state.chosenDate;
    }

    return (
      <div style={{ width: this.props.width + "px", marginRight: "27px" }}>
        <DP
          locale="ru"
          className={className}
          placeholderText={this.props.placeholderText}
          selected={selected}
          onChange={date => this.onChange(date)}
          dateFormat="dd.MM.yyyy"
        />
      </div>
    );
  }
}

export default DatePicker;
import React from "react";
import TimeField from "../TimeField/TimeField";

import "./TimeContent.css";

class TimeContent extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      value: "00:00",
      isReadOnly: false,
      isFocused: false
    };
  }

  componentDidMount() {
    this.setState({ value: this.props.value });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      if (!this.state.isReadOnly && this.state.value !== this.props.value) {
        this.setState({ value: this.props.value });
      }
      this.setState({ isReadOnly: false });
      this.setState({ isFocused: false });
    }
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  onKeyPress(event) {
    if (event.key === "Enter") {
      this.setState(
        { isReadOnly: false, isFocused: false },
        this.props.onChangeValue(this.state.value)
      );
    }
  }

  onBlur(event) {
    this.setState({ isReadOnly: false, isFocused: false });
    if (this.state.value !== this.props.value) {
      this.props.onChangeValue(this.state.value);
    }
  }

  //Получаем стиль ячейки заголовка на основании стиля контента
  getStyle() {
    let style;

    //Вот такого делать никогда не нужно. Но если очень хочется — все равно не надо
    let isChrome = navigator.userAgent.indexOf("Chrome") + 1;

    if (!!this.props.isHeader) {
      style = {
        width: this.props.width - (!!isChrome ? 7 : 9) + "px",
        height: this.props.height - 2 + "px",
        fontWeight: "900",
        background: "rgb(243, 243, 243)",
        color: "#000"
      };
    } else {
      style = {
        width: this.props.width - (!!isChrome ? 7 : 8) + "px",
        height: this.props.height - 2 + "px",
        fontWeight: "200"
      };
    }

    return style;
  }

  render() {
    return (
      <div
        className={
          !!this.state.isFocused
            ? "timeContentContainer focus"
            : "timeContentContainer"
        }
      >
        <TimeField
          value={this.state.value}
          disabled={!!this.props.disabled ? true : false}
          className={
            !!this.props.isStandalone ? "timeContent standalone" : "timeContent"
          }
          style={this.getStyle()}
          onFocus={() => this.setState({ isReadOnly: true, isFocused: true })}
          onChange={event => this.onChange(event)}
          onBlur={event => this.onBlur(event)}
          onKeyPress={event => this.onKeyPress(event)}
        />
      </div>
    );
  }
}

export default TimeContent;

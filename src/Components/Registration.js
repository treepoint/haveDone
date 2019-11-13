import React from "react";
import Input from "../Elements/Input/Input";
import Button from "../Elements/Button/Button";
import REG_INPUTS from "./REG_INPUTS";
import "./Registration.css";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  //Собираем значения в объект
  getValuesAsObject() {
    let values = {};
    REG_INPUTS.forEach(input => {
      values[input.name] = this.state[input.name];
    });
    return values;
  }

  //Собираем значения валидации в ассоциативный массив
  getInvalidMessagesAsAssocArray() {
    let validation = new Map();

    REG_INPUTS.forEach(input => {
      validation.set(
        input.name,
        input.validationFunctions
          .map(func => func.getInvalidMessage(this.state[input.name]))
          .filter(value => value)
      );

      return validation;
    });

    return validation;
  }

  //Получим количество ошибок в формеы
  getFormErrorCount() {
    let cnt = 0;
    this.state.validation.forEach(item => {
      cnt = cnt + Object.keys(item).length;
    });
    return cnt;
  }

  onSubmit(event) {
    //Отключаем стандартный обработчик данного события
    event.preventDefault();

    this.setState(
      { isTouched: true, validation: this.getInvalidMessagesAsAssocArray() },
      () => {
        //Шлем в консоль только если все корректно
        if (this.getFormErrorCount() === 0) {
          console.log(this.getValuesAsObject());
        }
      }
    );
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="Registration">
        <h1 className="h1">Расскажи о себе</h1>
        {REG_INPUTS.map(regInputs => (
          <Input
            placeholder={regInputs.placeholder}
            name={regInputs.name}
            value={this.state[regInputs.name]}
            defaultValue={regInputs.defaultValue}
            onChange={event => this.onChange(event)}
            invalidMessage={
              !!this.state.isTouched
                ? this.state.validation.get(regInputs.name)[0]
                : ""
            }
          />
        ))}
        <Button value="ОТПРАВИТЬ" />
      </form>
    );
  }
}

export default Registration;

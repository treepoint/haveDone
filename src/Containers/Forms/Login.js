import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import { setUser } from "../../Store/actions/user";
import { fetchToken } from "../../Store/actions/token";
import { setModalWindowState } from "../../Store/actions/globalModalWindow";
//Импортируем компоненты
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
//Подрубаем вспомогательную функциональность
import { email, password } from "./USER_INPUTS";
import { getInvalidMessagesAsObj } from "./FormsUtils";

//Массив инпутов, на основании которого будем отрисовывать форму
const INPUTS = [email, password];

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { validation: {} };
  }

  componentDidUpdate() {
    if (this.props.token !== null) {
      this.props.closeModalWindow();
    }
  }

  onChange(event) {
    let user = {
      email: this.props.user.email,
      password: this.props.user.password
    };

    user = Object.assign(user, { [event.target.name]: event.target.value });
    this.props.setUser(user);
  }

  login(event) {
    event.preventDefault();

    this.setState(
      {
        isTouched: true,
        validation: getInvalidMessagesAsObj(INPUTS, this.props.user)
      },
      () => {
        //Переходим к аутентификации если ошибок нет
        if (
          Object.keys(getInvalidMessagesAsObj(INPUTS, this.props.user))
            .length === 0
        ) {
          //Получим токен
          this.props.fetchToken();
        }
      }
    );
  }

  render() {
    return (
      <form onClick={event => event.stopPropagation()}>
        <h1 className="h1">Вход</h1>
        {INPUTS.map(inputs => (
          <Input
            placeholder={inputs.placeholder}
            name={inputs.name}
            type={inputs.type}
            value={this.props.user[inputs.name]}
            defaultValue={inputs.defaultValue}
            onChange={event => this.onChange(event)}
            invalidMessage={
              !!this.state.isTouched ? this.state.validation[inputs.name] : ""
            }
          />
        ))}
        <ErrorMessage message={this.props.authError} />
        <Button
          isPrimary={true}
          value="Войти"
          onClick={event => this.login(event)}
        />
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.token,
    authError: state.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => {
      dispatch(setUser(user));
    },
    fetchToken: () => {
      dispatch(fetchToken());
    },
    closeModalWindow: () => {
      dispatch(setModalWindowState(false));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

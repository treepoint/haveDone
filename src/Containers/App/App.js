import React from "react";
//Подключаем роутинг
import { Switch, Route } from "react-router-dom";
//Подключаем redux
import { connect } from "react-redux";
import { setToken, setUser, setLoading } from "../../Store/actions";
//Подключаем cookies
import { bake_cookie, read_cookie } from "../../Libs/Sfcookies";
//Подключаем API
import { getUserByID, reauth } from "../../APIController/APIController";
//Подключаем модальные окна
import { getModalWindow } from "../../Components/ModalWindow/MODAL_WINDOWS";
//Подключаем компоненты и контейнеры
import Header from "../Header/Header";
import Home from "../Pages/Home/Home";
import WorkingAreaRouter from "../WorkingArea/WorkingAreaRouter";
import About from "../Pages/About/About";
import AdminPanelRouter from "../Pages/AdminPanel/AdminPanelRouter";
import Bottom from "../Bottom/Bottom";
//CSS
import "./App.css";

class App extends React.Component {
  componentDidMount() {
    //Попробуем подтянуть часть стора из cookies по обычному токену и ID пользователя
    this.setStoreFromCookies(isSuccess => {
      if (!isSuccess) {
        //Если не получилось — попробуем подтянуть по refresh токену
        this.setStoreAndCookiesFromAPI();
      }
      //Если и здесь не получилось, значит ничего из этого нет — игнорируем ситуацию
    });

    /* Установим статус загрузки redux. Так сможем проверять на
     * страницах можно ли уже работать с данными или нет.
     * Если идет загрузка — значение true, оно же дефолтное. Если загрузилось — false
     */
    this.props.setLoading();
  }

  //Обновим стор по значениям токена и userID
  setStoreFromCookies(callback) {
    let token = read_cookie("token");
    let userId = read_cookie("user_id");

    if (token.length !== 0 && userId.length !== 0) {
      //Токен просто запишем
      this.props.setToken(token);

      //Пользователя получим по ID и запишем
      let promise = getUserByID(userId);

      promise.then(user => {
        this.props.setUser(user);
        callback(true);
      });
    } else {
      callback(false);
    }
  }

  //Обновим стор и куки из API
  setStoreAndCookiesFromAPI() {
    let refreshToken = read_cookie("refresh_token");

    //Нет токена — нет действий
    if (refreshToken.length === 0) {
      return;
    }

    let promise = reauth(refreshToken);

    promise.then(result => {
      //Если есть ошибки
      if (typeof result.response !== "undefined") {
        return;
      }

      //Unixtime в обычное время
      let tokenExp = new Date(result.token.exp * 1000);

      //Unixtime в обычное время
      let refreshTokenExp = new Date(result.refreshToken.exp * 1000);

      bake_cookie("token", result.token.value, tokenExp);
      bake_cookie("user_id", result.user.id, tokenExp);
      bake_cookie("refresh_token", result.refreshToken.value, refreshTokenExp);

      this.props.setToken(result.token.value);
      this.props.setUser(result.user);
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/working" component={WorkingAreaRouter} />
          <Route path="/admin" component={AdminPanelRouter} />
          <Route path="/about" component={About} />
        </Switch>
        {getModalWindow(
          this.props.modalWindowState,
          this.props.modalWindowName
        )}
        <Bottom />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.token,
    modalWindowState: state.modalWindowState,
    modalWindowName: state.modalWindowName,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setToken: token => {
      dispatch(setToken(token));
    },
    setUser: user => {
      dispatch(setUser(user));
    },
    setLoading: () => {
      dispatch(setLoading(false));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

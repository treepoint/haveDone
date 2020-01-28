import React from "react";
import HeaderNavigationLink from "../HeaderNavigationLink/HeaderNavigationLink";
//CSS
import "./Navigation.css";

class Navigation extends React.PureComponent {
  render() {
    return (
      <div className="navigation">
        <HeaderNavigationLink exact={true} to="/" value="Главная" />
        <HeaderNavigationLink
          to="/tasks_manager"
          value="Задачи"
          isNeedAuth={true}
        />
        <HeaderNavigationLink
          to="/task_statuses"
          value="Статусы"
          isNeedAuth={true}
        />
        <HeaderNavigationLink
          to="/categories"
          value="Категории"
          isNeedAuth={true}
        />
        <HeaderNavigationLink
          to="/statistic"
          value="Статистика"
          isNeedAuth={true}
        />
        <HeaderNavigationLink
          to="/admin"
          value="Админ.панель"
          onlyAdmin={true}
        />
        <HeaderNavigationLink to="/about" value="Справка" />
      </div>
    );
  }
}

export default Navigation;

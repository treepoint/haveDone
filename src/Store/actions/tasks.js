//Обвязка для API
import { APIURL, getHeaders } from "../APIConfiguration";
import Axios from "axios";
import { setNextDayAlreadyComesMessageShowDate } from "./app";
import { fetchCategories } from "./categories";
import { removeTaskLog, createTaskLog, updateTaskNameInLog } from "./tasksLog";
import { setNotifications } from "./notifications";
import { fetchActiveTasksCountByCategories } from "./statistics";

//Подключаем библиотеку для работы со временем
import { getCurrentFormatDate, getFormatDate } from "../../Libs/TimeUtils";

const URL = APIURL + "/tasks";

export const SET_TASKS = "SET_TASKS";
export const IS_TASKS_FETCHING = "IS_TASKS_FETCHING";
export const IS_TASKS_UPDATING = "IS_TASKS_UPDATING";
export const REMOVE_TASK = "REMOVE_TASK";
export const CLEAR_TASKS = "CLEAR_TASKS";

export function setTasks(object) {
  return { type: SET_TASKS, object };
}

export function setIsFetching(boolean) {
  return { type: IS_TASKS_FETCHING, boolean };
}

export function setIsUpdating(boolean) {
  return { type: IS_TASKS_UPDATING, boolean };
}

export function clearTasks(object) {
  return { type: CLEAR_TASKS, object };
}

//Получить все задачи за определенный период
export function fetchTasksByDate(date) {
  return dispatch => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    Axios.get(URL + "/date/" + date, headers)
      .then(response => {
        //Записываем ответ
        dispatch(setTasks(response.data));
        //Получаем категории
        dispatch(fetchCategories());
        //Проставляем, что загрузку прекратили
        dispatch(setIsFetching(false));
        /*Если таски загружаем за сегодня — проставим обозначение, что
          предупреждающее сообщение о «вчерашнем дне» показывать не нужно. Если точнее, то мы ставим дату когда оно показывалось, 
          считаем, что сегодня */
        if (getFormatDate(date) === getCurrentFormatDate()) {
          dispatch(
            setNextDayAlreadyComesMessageShowDate(getCurrentFormatDate())
          );
        }
      })
      .catch(error => {
        let message =
          "Не удалось получить список задач. Перезагрузите страницу и попробуйте снова.";
        dispatch(setNotifications({ message, type: "error" }));
      });
  };
}

//Создать задачу
export function createTask(date, name, category_id, executeNow) {
  return (dispatch, getState) => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    const state = getState();

    let task = {
      category_id: !!!category_id
        ? Object.keys(state.categories)[0]
        : category_id,
      project_id: state.userSettings.project_id,
      name: name,
      description: null,
      create_date: date
    };

    Axios.post(URL, task, headers)
      .then(response => {
        if (typeof response.data === "object") {
          //К нему добавим новый объект и обновим список
          dispatch(setTasks(response.data));

          if (executeNow) {
            //Получим ID новой задачи
            let newTaskId = response.data[Object.keys(response.data)].id;
            //Закроем лог по текущей задаче и откроем по новой
            dispatch(createTaskLog(newTaskId, date));
          }
        }
      })
      .catch(error => {
        let message =
          "Не удалось добавить задачу. Перезагрузите страницу и попробуйте снова.";
        dispatch(setNotifications({ message, type: "error" }));
      });
  };
}

//Обновить задачу
export function updateTask(task, forDate) {
  return (dispatch, getState) => {
    dispatch(setIsUpdating(true));

    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    //Получим состояние, нам нужно сравнивать изменения по текущему таску
    const state = getState();
    const oldTask = state.tasks[task.id];

    Axios.put(URL + "/" + task.id, task, headers)
      .then(response => {
        if (typeof response.data === "object") {
          //Если таску перенесли на другой день — удалим из текущего набора
          if (
            forDate < task.moved_date &&
            task.moved_date !== null &&
            task.moved_date !== oldTask.moved_date
          ) {
            dispatch(removeTask(task.id));
          } else {
            //Иначе обновим задачу в списке
            let updatedTask = response.data;
            //Проставим дату за которую считаем таску
            updatedTask[Object.keys(updatedTask)[0]].for_date = forDate;
            //Проставим время исполнения из исходного таска
            updatedTask[Object.keys(updatedTask)[0]].execution_time_to_day =
              task.execution_time_all;
            updatedTask[Object.keys(updatedTask)[0]].execution_time_day =
              task.execution_time_day;

            dispatch(setTasks(updatedTask));

            //Если имя задачи поменялось — обновим записи в логе по этой задаче
            if (oldTask.name !== task.name) {
              dispatch(updateTaskNameInLog(task.id));
            }
          }

          dispatch(setIsUpdating(false));
        }

        dispatch(fetchActiveTasksCountByCategories());
      })
      .catch(error => {
        let message =
          "Не удалось обновить задачу. Перезагрузите страницу и попробуйте снова.";
        dispatch(setNotifications({ message, type: "error" }));
        dispatch(setIsUpdating(false));
      });
  };
}

//Удалить задачу
export function deleteTask(id) {
  return (dispatch, getState) => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    Axios.delete(URL + "/" + id, headers)
      .then(response => {
        if (typeof response.data.affectedRows === "number") {
          //Удалим объект и обновим список
          dispatch(removeTask(id));

          //При удалении задачи так же нужно грохнуть и все записи в логе по этой задаче
          const state = getState();

          let tasksLog = state.tasksLog;

          //Пройдемся по всему логу тасок и удалим все записи, завязанные на эту задачу
          for (var tl in tasksLog) {
            if (tasksLog[tl].task_id === id) {
              //Удаляем только из стора. Удалением из базы займется API, так быстрее
              dispatch(removeTaskLog(tasksLog[tl].id));
            }
          }
        }
      })
      .catch(error => {
        let message =
          "Не удалось удалить задачу. Перезагрузите страницу и попробуйте снова.";
        dispatch(setNotifications({ message, type: "error" }));
      });
  };
}

function removeTask(id) {
  return { type: REMOVE_TASK, id };
}

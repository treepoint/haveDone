const tokens = require("./modules/tokens");
const users = require("./modules/users");
const roles = require("./modules/roles");
const categories = require("./modules/categories");
const statistics = require("./modules/statistics");
const tasks = require("./modules/tasks");
const tasksLog = require("./modules/tasksLog");
const tasksStatuses = require("./modules/tasksStatuses");
const tasksStatusesTypes = require("./modules/tasksStatusesTypes");

/*
 * Токены
 */

//Создание токена
export function getToken(user, callback) {
  tokens.getToken(user, callback);
}

//Обновить токен
export function reauth(refreshToken, callback) {
  tokens.reauth(refreshToken, callback);
}

/*
 * Пользователи
 */

//Получение списка пользователей как объектов в массиве
export function getUsers(callback) {
  users.getUsers(callback);
}

//Получить пользователя как объекта по ID
export function getUserByID(ID, callback) {
  users.getUserByID(ID, callback);
}

//Получить пользователя как объекта по имени и паролю
export function getUserByEmailPassword(user, callback) {
  users.getUserByEmailPassword(user, callback);
}

//Создать пользователя
export function createUser(user, callback) {
  users.createUser(user, callback);
}

//Обновить пользователя
export function updateUser(user, callback) {
  users.updateUser(user, callback);
}

//Удалить пользователя
export function deleteUser(ID, callback) {
  users.deleteUser(ID, callback);
}

/*
 * Роли
 */

//Получение списка ролей пользователей
export function getRoles(callback) {
  roles.getRoles(callback);
}

/*
 * Категории
 */

//Получить все категории пользователя
export function getUserCategories(callback) {
  categories.getUserCategories(callback);
}

//Получить категорию как объект по ID
export function getCategoryByID(ID, callback) {
  categories.getCategoryByID(ID, callback);
}

//Создать категорию
export function createCategory(category, callback) {
  categories.createCategory(category, callback);
}

//Обновить категорию
export function updateCategory(category, callback) {
  categories.updateCategory(category, callback);
}

//Удалить категорию
export function deleteCategory(ID, callback) {
  categories.deleteCategory(ID, callback);
}

/*
 * Задачи
 */

//Создать задачу
export function createTask(task) {
  return tasks.createTask(task);
}

//Обновить задачу
export function updateTask(ID, task) {
  return tasks.updateTask(ID, task);
}

//Получить задачу как объект по ID
export function getTaskByID(ID) {
  return tasks.getTaskByID(ID);
}

//Получить все задачи пользователя
export function getUserTasks() {
  return tasks.getUserTasks();
}

//Получить все задачи пользователя за дату
export function getUserTasksByDate(date) {
  return tasks.getUserTasksByDate(date);
}

//Удалить задачу
export function deleteTask(ID) {
  return tasks.deleteTask(ID);
}

/*
 * Лог выполнения задач
 */

//Получить весь лог выполнения всех задач
export function getTasksLog() {
  return tasksLog.getTasksLog();
}

//Получить весь лог выполнения всех задач за день
export function getTasksLogByDate(date) {
  return tasksLog.getTasksLogByDate(date);
}

//Обновить лог по ID
export function updateTaskLog(ID, taskLog) {
  return tasksLog.updateTaskLog(ID, taskLog);
}

//Добавить запись в лог выполнения задач
export function createTaskLog(taskLog) {
  return tasksLog.createTaskLog(taskLog);
}

//Удалить запись из лога выполнения задач
export function deleteTaskLog(ID) {
  return tasksLog.deleteTaskLog(ID);
}

/*
 * Статусы задач
 */

//Получить статус как объект по ID
export function getTaskStatusByID(ID, callback) {
  tasksStatuses.getTaskStatusByID(ID, callback);
}

//Получить все статусы
export function getAllTaskStatuses(callback) {
  tasksStatuses.getAllTaskStatuses(callback);
}

//Обновить статус по ID
export function updateStatus(status, callback) {
  tasksStatuses.updateStatus(status, callback);
}

//Создать статус
export function createStatus(status, callback) {
  tasksStatuses.createStatus(status, callback);
}

//Удалить статус
export function deleteStatus(ID, callback) {
  tasksStatuses.deleteStatus(ID, callback);
}

/*
 * Типы статусов задач
 */

export function getAllTaskStatusesTypes(callback) {
  tasksStatusesTypes.getAllTaskStatusesTypes(callback);
}

/*
 * Статистика по категориям
 */

//Получаем время исполнения по всем категориям
export function getTimeExecutionForAllCategories(callback) {
  statistics.getTimeExecutionForAllCategories(callback);
}

//Получаем время исполнения по всем категориям за определенный день
export function getTimeExecutionForAllCategoriesByDate(date, callback) {
  statistics.getTimeExecutionForAllCategoriesByDate(date, callback);
}

/*
 * Статистика по задачам
 */

//Получить статистику по задачам за период
export function getTaskStatisticByPeriod(dateFrom, dateTo, callback) {
  statistics.getTaskStatisticByPeriod(dateFrom, dateTo, callback);
}

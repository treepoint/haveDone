import { SET_TOKEN } from "../actions/token";

export function token(state = null, action) {
  switch (action.type) {
    case SET_TOKEN:
      return action.text;
    default:
      return state;
  }
}

import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initState = {
  hour: '00',
  minute: '00',
  onSetting: false,
  alarm1: false,
  alarm2: false,
};
export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}

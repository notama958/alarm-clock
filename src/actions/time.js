import {
  CLEAR_HOUR_TIMER,
  CLEAR_MINUTE_TIMER,
  CLOCK_ON,
  NEXT_TIME_SETTING,
  RESET_TIME_ORDER,
  SET_HOUR_TIMER,
  SET_MINUTE_TIMER,
  SET_PROJECTOR,
  SET_SNOOZE_TIME,
  SET_TIME_FORMAT,
  SET_TIME_HOUR,
  SET_TIME_MINUTE,
  SET_TIME_MODE,
} from './types';

export const setTimeMode = (stt) => (dispatch) => {
  dispatch({
    type: SET_TIME_MODE,
    payload: stt,
  });
};
export const setTimeHour = (stt) => (dispatch) => {
  dispatch({
    type: SET_TIME_HOUR,
    payload: stt,
  });
};
export const setTimeMinute = (stt) => (dispatch) => {
  dispatch({
    type: SET_TIME_MINUTE,
    payload: stt,
  });
};
export const resetTimeOrder = (mode) => (dispatch) => {
  dispatch({
    type: RESET_TIME_ORDER,
    payload: mode,
  });
};
export const setTimeFormat = (mode) => (dispatch) => {
  dispatch({
    type: SET_TIME_FORMAT,
    payload: mode,
  });
};
export const setSnoozeTime = (t) => (dispatch) => {
  dispatch({
    type: SET_SNOOZE_TIME,
    payload: t,
  });
};

export const nextTimeSetting = (mode) => (dispatch) => {
  dispatch({
    type: NEXT_TIME_SETTING,
    payload: mode,
  });
};

export const setProjector = (mode) => (dispatch) => {
  dispatch({
    type: SET_PROJECTOR,
    payload: mode,
  });
};

// convert to AMPM
export const ConvertTime = (time, time_format, ampm = '') => {
  let hour = parseInt(time);
  let stringHour;

  if (ampm !== '') {
    if (hour === 0) {
      return '12';
    } else if (hour > 12) {
      stringHour = hour - 12;
      if (stringHour < 10) {
        return '0' + stringHour;
      }
      return stringHour.toString();
    }
  }
  if (hour < 10) {
    return '0' + hour;
  }
  return time;
};
export const clockOn = (mode) => (dispatch) => {
  dispatch({
    type: CLOCK_ON,
    payload: mode,
  });
};

export const countUp = (hh, mm) => (dispatch) => {
  // console.log('RECEIVED: ', mm);
  let minute = (parseInt(mm) + 1) % 60;
  let hour = hh;
  if (minute === 0) {
    hour = (parseInt(hh) + 1) % 24;
    if (hour < 10) {
      hour = '0' + hour;
    }
  }
  if (minute < 10) {
    minute = '0' + minute;
  }
  minute = minute.toString();
  hour = hour.toString();
  // console.log('After calculation: ', hour, minute);
  dispatch({
    type: SET_TIME_HOUR,
    payload: hour,
  });
  dispatch({
    type: SET_TIME_MINUTE,
    payload: minute,
  });
};

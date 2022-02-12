import {
  SET_PROJECTOR,
  SET_ALARM_MODE,
  SET_ALARM1_HOUR,
  SET_ALARM1_MINUTE,
  SET_ALARM2_HOUR,
  SET_ALARM2_MINUTE,
  SET_ALARM1_MODE,
  SET_ALARM2_MODE,
  NEXT_ALARM_SETTING,
  RESET_ALARM_ORDER,
  ALARM_ON_OFF,
} from './types';

export const setAlarmSetting = (stt) => (dispatch) => {
  dispatch({
    type: SET_ALARM_MODE,
    payload: stt,
  });
};

export const setAlarm1Hour = (hh) => (dispatch) => {
  dispatch({
    type: SET_ALARM1_HOUR,
    payload: hh,
  });
};

export const setAlarm1Minute = (mm) => (dispatch) => {
  dispatch({
    type: SET_ALARM1_MINUTE,
    payload: mm,
  });
};

export const setAlarm2Hour = (hh) => (dispatch) => {
  dispatch({
    type: SET_ALARM2_HOUR,
    payload: hh,
  });
};

export const setAlarm2Minute = (mm) => (dispatch) => {
  dispatch({
    type: SET_ALARM2_MINUTE,
    payload: mm,
  });
};

export const setAlarm1Mode = (mode) => (dispatch) => {
  dispatch({
    type: SET_ALARM1_MODE,
    payload: mode,
  });
};
export const setAlarm2Mode = (mode) => (dispatch) => {
  dispatch({
    type: SET_ALARM2_MODE,
    payload: mode,
  });
};

export const nextAlarmSetting = (mode) => (dispatch) => {
  dispatch({
    type: NEXT_ALARM_SETTING,
    payload: mode,
  });
};

export const resetAlarmAction = () => (dispatch) => {
  dispatch({
    type: RESET_ALARM_ORDER,
  });
};

export const alarmOff = (stt) => (dispatch) => {
  dispatch({
    type: ALARM_ON_OFF,
    payload: stt,
  });
};

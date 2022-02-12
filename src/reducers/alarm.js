import {
  SET_ALARM_MODE,
  SET_ALARM1_MODE,
  SET_ALARM2_MODE,
  SET_ALARM1,
  SET_ALARM1_HOUR,
  SET_ALARM1_MINUTE,
  SET_ALARM2,
  SET_ALARM2_HOUR,
  SET_ALARM2_MINUTE,
  NEXT_ALARM_SETTING,
  RESET_TIME_ORDER,
  RESET_ALARM_ORDER,
} from '../actions/types';
const initState = {
  delay: 20000,
  onAlarmSetting: false,
  onAlarmMode: '',
  // system alarm
  al1_hour: '00',
  al2_hour: '00',
  al1_minute: '00',
  al2_minute: '00',
  // mode
  al1_mode: 'off',
  al2_mode: 'off',
  // alarm
  alarm1: false,
  alarm2: false,
};
export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALARM_MODE:
      return {
        ...state,
        onAlarmSetting: payload,
      };
    case SET_ALARM1:
      return {
        ...state,
        alarm1: payload,
      };
    case SET_ALARM1_HOUR:
      return {
        ...state,
        al1_hour: payload,
      };
    case SET_ALARM1_MINUTE:
      return {
        ...state,
        al1_minute: payload,
      };
    case SET_ALARM2_HOUR:
      return {
        ...state,
        al2_hour: payload,
      };
    case SET_ALARM2_MINUTE:
      return {
        ...state,
        al2_minute: payload,
      };

    case SET_ALARM2:
      return {
        ...state,
        alarm2: payload,
      };
    case SET_ALARM1_MODE:
      return {
        ...state,
        al1_mode: payload,
        alarm1: payload !== 'off' ? true : false,
      };
    case SET_ALARM2_MODE:
      return {
        ...state,
        al2_mode: payload,
        alarm2: payload !== 'off' ? true : false,
      };
    case NEXT_ALARM_SETTING:
      return {
        ...state,
        onAlarmMode: payload,
      };
    case RESET_ALARM_ORDER:
      return {
        ...state,
        onAlarmSetting: false,
        onAlarmMode: '',
      };
    default:
      return state;
  }
}

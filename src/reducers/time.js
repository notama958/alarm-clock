import {
  NEXT_TIME_SETTING,
  RESET_TIME_ORDER,
  SET_PROJECTOR,
  SET_TIME_HOUR,
  SET_TIME_MINUTE,
  SET_TIME_MODE,
  SET_TIME_FORMAT,
  SET_SNOOZE_TIME,
  CLOCK_ON,
} from '../actions/types';
const initState = {
  delay: 20000,
  onSystemSetting: false,
  AMPM: '',
  // system time
  hour: '00',
  hourTimer: null,
  minute: '00',
  minuteTimer: null,
  time_format: '24h',
  onTimeSetting: 'hh',
  snoozeTime: '09',
  //projector
  projector: false,
  start: false,
};
export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case CLOCK_ON:
      return {
        ...state,
        start: payload,
      };
    case SET_PROJECTOR:
      return {
        ...state,
        projector: payload,
      };
    case SET_TIME_HOUR:
      return {
        ...state,
        hour: payload,
      };
    case SET_TIME_MINUTE:
      return {
        ...state,
        minute: payload,
      };
    case SET_TIME_FORMAT:
      const setAMPM = (mode) => {
        if (payload === '12h') {
          if (
            (parseInt(state.hour) === 12 && parseInt(state.minute) > 0) ||
            parseInt(state.hour) > 12
          ) {
            return 'PM';
          } else return 'AM';
        }
      };
      return {
        ...state,
        time_format: payload,
        AMPM: setAMPM(payload),
      };
    case SET_SNOOZE_TIME:
      return {
        ...state,
        snoozeTime: payload,
      };
    case SET_TIME_MODE:
      return {
        ...state,
        onSystemSetting: payload,
      };

    case RESET_TIME_ORDER:
      return {
        ...state,
        onSystemSetting: false,
        onTimeSetting: 'hh',
        AMPM:
          state.time_format === '12h'
            ? parseInt(state.hour) >= 12
              ? 'PM'
              : 'AM'
            : '',
      };
    case NEXT_TIME_SETTING:
      return {
        ...state,
        onTimeSetting: payload,
      };
    default:
      return state;
  }
}

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useLongPress } from 'use-long-press';
import { connect } from 'react-redux';
import {
  nextTimeSetting,
  resetTimeOrder,
  setTimeHour,
  setTimeMinute,
  setTimeMode,
  setTimeFormat,
  setSnoozeTime,
} from '../actions/time';
import { setAlarmSetting } from '../actions/alarm';
import AlarmController from './AlarmController';

const ButtonController = ({
  thour,
  tminute,
  time_format,
  snoozeTime,
  setTimeMode,
  onTimeSetting,
  onSystemSetting,
  nextTimeSetting,
  resetTimeOrder,
  setTimeHour,
  setTimeMinute,
  setTimeFormat,
  setSnoozeTime,
  // alarm
  onAlarmSetting,
  setAlarmSetting,
}) => {
  // enter long press
  const [enabled, setEnabled] = useState(true);
  const [enabled_up, setEnabled_up] = useState(true);
  const [enabled_down, setEnabled_down] = useState(true);
  const callback_up = useCallback((event) => {
    if (onSystemSetting) {
      increment(event, 5);
    }
  });
  const callback_down = useCallback((event) => {
    if (onSystemSetting) decrement(event, 5);
  });
  const callback = useCallback((event) => {
    alert('Enter Time Setting');
    setTimeMode(!onSystemSetting);
  }, []);
  const timeFormats = ['24h', '12h'];
  const convertInc = (num, max, acceleration = 0) => {
    let temp = (parseInt(num) + 1 + acceleration) % max;
    if (temp == 0) {
      temp = max;
    }
    if (Math.floor(temp / 10) === 0) {
      temp = '0' + temp;
    }
    return temp;
  };
  const convertDec = (num, max, min = 0, acceleration = 0) => {
    let temp = parseInt(num) - 1 - acceleration;
    if (temp === min) {
      temp = '0' + min;
    } else if (temp < min) {
      temp = max;
    } else if (Math.floor(temp / 10) === 0) {
      temp = '0' + temp;
    }
    return temp;
  };

  const increment = (e, acc = 0) => {
    if (onTimeSetting === 'hh') {
      if (time_format === '24h') setTimeHour(convertInc(thour, 23, acc));
      else setTimeHour(convertInc(thour, 12, acc));
    } else if (onTimeSetting === 'mm') {
      setTimeMinute(convertInc(tminute, 59, acc));
    } else if (onTimeSetting === 'time_format') {
      setTimeFormat(
        timeFormats[(timeFormats.indexOf(time_format) + 1) % timeFormats.length]
      );
    } else if (onTimeSetting === 'snooze_time') {
      setSnoozeTime(convertInc(snoozeTime, 59, acc));
    }
  };
  const decrement = (e, acc = 0) => {
    if (onTimeSetting === 'hh') {
      if (time_format === '24h') setTimeHour(convertDec(thour, 23, acc));
      else setTimeHour(convertDec(thour, 12, acc));
    } else if (onTimeSetting === 'mm') {
      setTimeMinute(convertDec(tminute, 60, 0, acc));
    } else if (onTimeSetting === 'time_format') {
      setTimeFormat(
        timeFormats[(timeFormats.indexOf(time_format) + 1) % timeFormats.length]
      );
    } else if (onTimeSetting === 'snooze_time') {
      setSnoozeTime(convertDec(snoozeTime, 60, 5, acc));
    }
  };
  const bind_up = useLongPress(enabled_up ? callback_up : null, {
    onFinish: (event) => {},
    onCancel: (event) => {},
    onMove: (event) => {
      if (onSystemSetting) increment();
    },
    threshold: 1500,
    captureEvent: true,
    cancelOnMovement: false,
    detect: 'both',
  });
  const bind_down = useLongPress(enabled_down ? callback_down : null, {
    onFinish: (event) => {},
    onCancel: (event) => {},
    onMove: (event) => {
      if (onSystemSetting) decrement();
    },
    threshold: 1500,
    captureEvent: true,
    cancelOnMovement: false,
    detect: 'both',
  });
  const bind_set = useLongPress(enabled ? callback : null, {
    onFinish: (event) => {},
    onCancel: (event) => {},
    onMove: (event) => {
      if (onSystemSetting) {
        if (onTimeSetting === 'hh') {
          return nextTimeSetting('mm');
        } else if (onTimeSetting === 'mm') {
          return nextTimeSetting('time_format');
        } else if (onTimeSetting === 'time_format') {
          return nextTimeSetting('snooze_time');
        } else if (onTimeSetting === 'snooze_time') {
          return resetTimeOrder();
        }
      }
    },
    threshold: 3000,
    captureEvent: true,
    cancelOnMovement: false,
    detect: 'both',
  });
  /////////////////////////////////////// ALARM

  const alarmOnClick = () => {
    setAlarmSetting(true);
  };
  return (
    <div className="container__buttons">
      {onAlarmSetting ? (
        <AlarmController type="up" />
      ) : (
        <button className="btn btn-primary" {...bind_down}>
          <i className="fas fa-chevron-down"></i>
        </button>
      )}
      <button className="btn btn-primary">VOL</button>
      <button className="btn btn-primary">RADIO SLEEP</button>
      <button className="btn btn-primary">SNOOZE DIMMER</button>
      <button className="btn btn-primary" {...bind_set}>
        SET
      </button>
      <button className="btn btn-primary" onClick={alarmOnClick}>
        AL
      </button>
      {onAlarmSetting ? (
        <AlarmController type="down" />
      ) : (
        <button className="btn btn-primary" {...bind_up}>
          <i className="fas fa-chevron-up"></i>
        </button>
      )}
    </div>
  );
};

const mapStateToProps = ({ alarm, time }) => ({
  onSystemSetting: time.onSystemSetting,
  onTimeSetting: time.onTimeSetting,
  time_hour: time.time_hour,
  thour: time.hour,
  tminute: time.minute,
  time_format: time.time_format,
  snoozeTime: time.snoozeTime,
  onAlarmSetting: alarm.onAlarmSetting,
});
export default connect(mapStateToProps, {
  setTimeMode,
  nextTimeSetting,
  resetTimeOrder,
  setTimeHour,
  setTimeMinute,
  setTimeFormat,
  setSnoozeTime,
  // alarm
  setAlarmSetting,
})(ButtonController);

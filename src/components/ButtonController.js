import React, { useState, useCallback, useRef, useEffect , Fragment} from 'react';
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
import {
  alarmOff,
  nextAlarmSetting,
  resetAlarmAction,
  setAlarm1Mode,
  setAlarmSetting,
} from '../actions/alarm';
import AlarmController from './AlarmController';
import time from '../reducers/time';

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
  onAlarmMode,
  nextAlarmSetting,
  resetAlarmAction,
  alarmOff,
  alarmOnOff,
}) => {
  // enter long press
  const [enabled, setEnabled] = useState(true);
  const [enabled_up, setEnabled_up] = useState(true);
  const [enabled_down, setEnabled_down] = useState(true);
  const [snoozeOnClick, setSnoozeOnClick] = useState(false);
  const [temp,setTemp]=useState(0);
  const [mode,setMode]=useState(null);
  const timer = useRef(null);

  const fastIncrement = () => {
    timer.current = setInterval(() => {
      setTemp(temp=>temp+1);
      setMode(mode=> "inc");
    },500);
  };
  const fastDecrement = () => {
    timer.current = setInterval(() => {
      setTemp(temp=>temp-1);
      setMode(mode=> "dec");
    },500);
  };
  useEffect(()=>{
    if(mode==='inc')
    {
      increment(null, 2);
    }
    else{
      decrement(null, 2);
    }
    // return ()=> clearInterval(timer.current);
  },[temp,setTemp])
  const timeoutClear = () => {
    clearInterval(timer.current);
  };

  useEffect(() => {
    alarmOff(false);
    let i = setTimeout(() => {
      if (alarmOnOff) {
        alarmOff(true);
      }
    }, parseInt(snoozeTime) * 1000);
    return () => {
      clearTimeout(i);
    };
  }, [snoozeOnClick]);
  const callback_up = useCallback((event) => {
    if (onSystemSetting) {
      increment(null, 5);
    }
  });
  const callback_down = useCallback((event) => {
    if (onSystemSetting) {
      decrement(null, 5);
    }
  });

  const callback = useCallback((event) => {
    alert('Enter Time Setting');
    setTimeMode(!onSystemSetting);
  }, []);
  const timeFormats = ['24h', '12h'];
  const convertInc = (num, max, min = 0, acceleration = 0) => {
    let temp = (parseInt(num) + 1 + acceleration) % max;
    if (temp == 0) {
      temp = max.toString();
    }
    if (temp < 10) {
      if (temp === 1) temp += min;
      temp = '0' + temp;
    }
    return temp.toString();
  };
  const convertDec = (num, max, min = 0, acceleration = 0) => {
    let temp = parseInt(num) - 1 - acceleration;
    if (temp === min) {
      temp = '0' + min;
    } else if (temp < min) {
      temp = max.toString();
    } else if (Math.floor(temp / 10) === 0) {
      temp = '0' + temp;
    }
    return temp.toString();
  };

  const increment = (e, acc = 0) => {
    if (onTimeSetting === 'hh') {
      if (time_format === '24h') setTimeHour(convertInc(thour, 23, acc));
      else setTimeHour(convertInc(thour, 12, 0, acc));
    } else if (onTimeSetting === 'mm') {
      setTimeMinute(convertInc(tminute, 59, 0, acc));
    } else if (onTimeSetting === 'time_format') {
      setTimeFormat(
        timeFormats[(timeFormats.indexOf(time_format) + 1) % timeFormats.length]
      );
    } else if (onTimeSetting === 'snooze_time') {
      setSnoozeTime(convertInc(snoozeTime, 60, 4, acc));
    }
  };
  const decrement = (e, acc = 0) => {
    if (onTimeSetting === 'hh') {
      if (time_format === '24h') setTimeHour(convertDec(thour, 23, acc));
      else setTimeHour(convertDec(thour, 12, acc));
    } else if (onTimeSetting === 'mm') {
      setTimeMinute(convertDec(tminute, 59, 0, acc));
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
    if (alarmOnOff) {
      alarmOff(false);
    } else {
      setAlarmSetting(true);
      if (onAlarmMode === '') {
        nextAlarmSetting('al1_hh');
      } else if (onAlarmMode === 'al1_hh') {
        nextAlarmSetting('al1_mm');
      } else if (onAlarmMode === 'al1_mm') {
        nextAlarmSetting('al1_mode');
      } else if (onAlarmMode === 'al1_mode') {
        nextAlarmSetting('al2_hh');
      } else if (onAlarmMode === 'al2_hh') {
        nextAlarmSetting('al2_mm');
      } else if (onAlarmMode === 'al2_mm') {
        nextAlarmSetting('al2_mode');
      } else if (onAlarmMode === 'al2_mode') {
        resetAlarmAction();
      }
      // reset
    }
  };
  return (
    <div className="container__buttons">
      {onAlarmSetting ? (
        <AlarmController type="down" />
      ) : (
        <Fragment>

        <button className="btn btn-primary" {...bind_down}>
          <i className="fas fa-chevron-down"></i>
        </button>
        <button className="btn btn-primary"
         onMouseLeave={timeoutClear}
         onMouseUp={timeoutClear}
         onMouseDown={()=>{
           if(onTimeSetting)
           fastDecrement();
         }}
        >
          <i className="fas fa-angle-double-down"></i>
        </button>
        </Fragment>
      )}
      <button className="btn btn-primary">VOL</button>
      <button className="btn btn-primary" onClick={(e) => alarmOff(false)}>
        RADIO SLEEP
      </button>
      <button
        className="btn btn-primary"
        onClick={(e) => {
          setSnoozeOnClick(!snoozeOnClick);
        }}
      >
        SNOOZE DIMMER
      </button>
      <button className="btn btn-primary" {...bind_set}>
        SET
      </button>
      <button className="btn btn-primary" onClick={alarmOnClick}>
        AL
      </button>
      {onAlarmSetting ? (
        <AlarmController type="up" />
      ) : (
        <Fragment>
        <button className="btn btn-primary" {...bind_up}>
          <i className="fas fa-chevron-up"></i>
        </button>
        <button className="btn btn-primary"
         onMouseLeave={timeoutClear}
         onMouseUp={timeoutClear}
         onMouseDown={()=>{
           if(onTimeSetting)
           fastIncrement();
         }}
        >
          <i className="fas fa-angle-double-up"></i>
        </button>
        </Fragment>

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
  onAlarmMode: alarm.onAlarmMode,
  alarmOnOff: alarm.alarmOnOff,
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
  nextAlarmSetting,
  resetAlarmAction,
  alarmOff,
})(ButtonController);

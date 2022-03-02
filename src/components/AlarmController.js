import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { connect } from 'react-redux';
import { useLongPress } from 'use-long-press';
import {
  setAlarm1Hour,
  setAlarm1Minute,
  setAlarm1Mode,
  setAlarm2Hour,
  setAlarm2Minute,
  setAlarm2Mode,
} from '../actions/alarm';

const AlarmController = ({
  type,
  al1_hour,
  al1_minute,

  al2_hour,
  al2_minute,

  al1_mode,
  al2_mode,

  alarm1,
  alarm2,
  onAlarmSetting,
  onAlarmMode,
  setAlarm1Hour,
  setAlarm1Minute,
  setAlarm2Hour,
  setAlarm2Minute,
  setAlarm1Mode,
  setAlarm2Mode,
}) => {
  const [enabled_up, setEnabled_up] = useState(true);
  const [enabled_down, setEnabled_down] = useState(true);
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

  const Modes = ['rd', 'bu', 'off'];

  const callback_up = useCallback((event) => {
    if (onAlarmSetting) increment(event, 5);
  });
  const callback_down = useCallback((event) => {
    if (onAlarmSetting) decrement(event, 5);
  });

  const convertInc = (num, max, acceleration = 0) => {
    let temp = (parseInt(num) + 1 + acceleration) % max;
    if (temp == 0) {
      temp = max.toString();
    }
    if (Math.floor(temp / 10) === 0) {
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
    if (onAlarmMode.includes('hh')) {
      if (onAlarmMode.includes('al1')) {
        setAlarm1Hour(convertInc(al1_hour, 23, acc));
      } else if (onAlarmMode.includes('al2')) {
        setAlarm2Hour(convertInc(al2_hour, 23, acc));
      }
    } else if (onAlarmMode.includes('mm')) {
      if (onAlarmMode.includes('al1')) {
        setAlarm1Minute(convertInc(al1_minute, 59, 0, acc));
      } else if (onAlarmMode.includes('al2')) {
        setAlarm2Minute(convertInc(al2_minute, 59, 0, acc));
      }
    } else {
      if (onAlarmMode.includes('al1')) {
        setAlarm1Mode(Modes[(Modes.indexOf(al1_mode) + 1) % Modes.length]);
      } else if (onAlarmMode.includes('al2')) {
        setAlarm2Mode(Modes[(Modes.indexOf(al2_mode) + 1) % Modes.length]);
      }
    }
  };
  const decrement = (e, acc = 0) => {
    if (onAlarmMode.includes('hh')) {
      if (onAlarmMode.includes('al1')) {
        setAlarm1Hour(convertDec(al1_hour, 23));
      } else if (onAlarmMode.includes('al2')) {
        setAlarm2Hour(convertDec(al2_hour, 23));
      }
    } else if (onAlarmMode.includes('mm')) {
      if (onAlarmMode.includes('al1')) {
        setAlarm1Minute(convertDec(al1_minute, 59));
      } else if (onAlarmMode.includes('al2')) {
        setAlarm2Minute(convertDec(al2_minute, 59));
      }
    } else {
      let temp;
      if (onAlarmMode.includes('al1')) {
        temp = Modes.indexOf(al1_mode) - 1;
        if (temp < 0) {
          temp = Modes.length - 1;
        }
        setAlarm1Mode(Modes[temp]);
      } else if (onAlarmMode.includes('al2')) {
        temp = Modes.indexOf(al2_mode) - 1;
        if (temp < 0) {
          temp = Modes.length - 1;
        }
        setAlarm2Mode(Modes[temp]);
      }
    }
  };
  const bind_up = useLongPress(enabled_up ? callback_up : null, {
    onFinish: (event) => {},
    onCancel: (event) => {},
    onMove: (event) => {
      if (onAlarmSetting) increment();
    },
    onStart: (event) => {},
    threshold: 1500,
    captureEvent: true,
    cancelOnMovement: false,
    detect: 'both',
  });
  const bind_down = useLongPress(enabled_down ? callback_down : null, {
    onFinish: (event) => {},
    onCancel: (event) => {},
    onMove: (event) => {
      if (onAlarmSetting) decrement();
    },
    onStart: (event) => {},
    threshold: 1500,
    captureEvent: true,
    cancelOnMovement: false,
    detect: 'both',
  });
  return (
    <Fragment>
      {type === 'up' ? (
        <Fragment>
        <button className="btn btn-primary" {...bind_up}>
          <i className="fas fa-chevron-up"></i>
        </button>
        <button className="btn btn-primary"
         onMouseLeave={timeoutClear}
         onMouseUp={timeoutClear}
         onMouseDown={fastIncrement}
        >
          <i className="fas fa-angle-double-up"></i>
        </button>
          </Fragment>
      ) : (
        <Fragment>
        <button className="btn btn-primary" {...bind_down}>
          <i className="fas fa-chevron-down"></i>
        </button>
        <button className="btn btn-primary"
            onMouseLeave={timeoutClear}
            onMouseUp={timeoutClear}
            onMouseDown={fastDecrement}
        >
          <i className="fas fa-angle-double-down"></i>
        </button>
    </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = ({ alarm, time }) => ({
  alarm1: alarm.alarm1,
  alarm2: alarm.alarm2,
  al1_hour: alarm.al1_hour,
  al1_minute: alarm.al1_minute,
  al2_hour: alarm.al2_hour,
  al2_minute: alarm.al2_minute,
  al1_mode: alarm.al1_mode,
  al2_mode: alarm.al2_mode,
  time_format: time.time_format,
  snoozeTime: time.snoozeTime,

  onAlarmSetting: alarm.onAlarmSetting,
  onAlarmMode: alarm.onAlarmMode,
});
AlarmController.propTypes = {};

export default connect(mapStateToProps, {
  setAlarm1Hour,
  setAlarm1Minute,
  setAlarm2Hour,
  setAlarm2Minute,
  setAlarm1Mode,
  setAlarm2Mode,
})(AlarmController);

import React, { Fragment, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLongPress } from 'use-long-press';

const AlarmController = ({ type, onAlarmSetting }) => {
  const [enabled_up, setEnabled_up] = useState(true);
  const [enabled_down, setEnabled_down] = useState(true);
  const timeFormats = ['24h', '12h'];
  const callback_up = useCallback((event) => {
    if (onAlarmSetting) {
      increment(event, 5);
    }
  });
  const callback_down = useCallback((event) => {
    if (onAlarmSetting) decrement(event, 5);
  });
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

  const increment = (e, acc = 0) => {};
  const decrement = (e, acc = 0) => {};
  const bind_up = useLongPress(enabled_up ? callback_up : null, {
    onFinish: (event) => {},
    onCancel: (event) => {},
    onMove: (event) => {
      if (onAlarmSetting) increment();
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
      if (onAlarmSetting) decrement();
    },
    threshold: 1500,
    captureEvent: true,
    cancelOnMovement: false,
    detect: 'both',
  });
  return (
    <Fragment>
      {type === 'up' ? (
        <button className="btn btn-primary" {...bind_up}>
          <i className="fas fa-chevron-up"></i>
        </button>
      ) : (
        <button className="btn btn-primary" {...bind_down}>
          <i className="fas fa-chevron-down"></i>
        </button>
      )}
    </Fragment>
  );
};

const mapStateToProps = ({ alarm, time }) => ({
  onTimeSetting: time.onTimeSetting,
  time_hour: time.time_hour,
  thour: time.hour,
  tminute: time.minute,
  time_format: time.time_format,
  snoozeTime: time.snoozeTime,
  onAlarmSetting: alarm.onAlarmSetting,
});
AlarmController.propTypes = {};

export default connect(mapStateToProps, {})(AlarmController);

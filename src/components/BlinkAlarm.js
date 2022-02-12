import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetAlarmAction } from '../actions/alarm';
const BlinkAlarm = ({
  AMPM,
  msg,
  timeout,
  onAlarmSetting,
  onAlarmMode,
  time_format,
  type,
  delay = 1000,
  resetAlarmAction,
}) => {
  const [visible, setVisible] = useState(true);
  const [period, setPeriod] = useState(null);
  const [time, setTime] = useState(msg);
  useEffect(() => {
    if (onAlarmMode === type && onAlarmSetting) {
      setPeriod((period) =>
        setInterval(() => {
          if (type === onAlarmMode) {
            setVisible((visible) => !visible);
          }
        }, 1000)
      );
    } else {
      clearInterval(period);
    }
    return () => {
      clearInterval(period);
    };
  }, [onAlarmMode, onAlarmSetting]);
  useEffect(() => {
    // console.log(period);
    let i = setTimeout(() => {
      resetAlarmAction();
      clearInterval(period);
    }, 20 * 1000);
    return () => {
      clearTimeout(i);
    };
  }, [period, setPeriod]);
  useEffect(() => {
    if (type !== onAlarmMode) {
      if (
        type === 'mm' &&
        (onAlarmMode === 'snooze_time' || onAlarmMode === 'time_format')
      ) {
        setVisible((visible) => false);
      } else {
        setVisible((visible) => true);
      }
      clearInterval(period);
    }
  }, [onAlarmMode]);
  return <Fragment>{visible ? msg : ''}</Fragment>;
};

BlinkAlarm.propTypes = {};
const mapStateToProps = ({ alarm, time }) => ({
  AMPM: time.AMPM,
  onAlarmSetting: time.onAlarmSetting,
  onAlarmMode: time.onAlarmMode,
  time_format: time.time_format,
});
export default connect(mapStateToProps, { resetAlarmAction })(BlinkAlarm);

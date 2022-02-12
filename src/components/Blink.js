import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import {} from '../actions/alarm';
import { connect } from 'react-redux';
import { resetTimeOrder } from '../actions/time';
const Blink = ({
  AMPM,
  msg,
  timeout,
  onSystemSetting,
  onTimeSetting,
  type,
  delay = 1000,
  // alarm
  onAlarmMode,
  onAlarmSetting,
  resetTimeOrder,
}) => {
  const [visible, setVisible] = useState(true);
  const [period, setPeriod] = useState(null);
  const [time, setTime] = useState(msg);

  useEffect(() => {
    if (onTimeSetting === type && onSystemSetting) {
      setPeriod((period) =>
        setInterval(() => {
          if (type === onTimeSetting) {
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
  }, [onTimeSetting, onSystemSetting]);
  useEffect(() => {
    let i = setTimeout(() => {
      resetTimeOrder();
      clearInterval(period);
    }, 50 * 1000);
    return () => {
      clearTimeout(i);
    };
  }, [period, setPeriod]);
  useEffect(() => {
    if (type !== onTimeSetting) {
      if (
        type === 'mm' &&
        (onTimeSetting === 'snooze_time' || onTimeSetting === 'time_format')
      ) {
        setVisible((visible) => false);
      } else {
        setVisible((visible) => true);
      }
      clearInterval(period);
    }
  }, [onTimeSetting]);
  useEffect(() => {
    if (onAlarmSetting && onAlarmMode.includes(type)) {
      setPeriod((period) =>
        setInterval(() => {
          setVisible((visible) => !visible);
        }, 1000)
      );
    } else {
      clearInterval(period);
    }
  }, [onAlarmSetting, onAlarmMode]);
  return <Fragment>{visible ? msg : ''}</Fragment>;
};

Blink.propTypes = {};
const mapStateToProps = ({ alarm, time }) => ({
  AMPM: time.AMPM,
  onTimeSetting: time.onTimeSetting,
  onSystemSetting: time.onSystemSetting,
  onAlarmMode: alarm.onAlarmMode,
  onAlarmSetting: alarm.onAlarmSetting,
});
export default connect(mapStateToProps, { resetTimeOrder })(Blink);

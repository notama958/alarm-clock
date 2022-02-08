import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import {} from '../actions/alarm';
import { connect } from 'react-redux';
import {} from '../actions/time';
const Blink = ({
  AMPM,
  msg,
  timeout,
  onSystemSetting,
  onTimeSetting,
  type,
  delay = 1000,
}) => {
  const [visible, setVisible] = useState(true);
  const [period, setPeriod] = useState(null);
  const [time, setTime] = useState(msg);
  useEffect(() => {
    if (AMPM === '12h') {
      if (type === 'hh') {
        setTime();
      }
    } else {
      if (type === 'hh') {
        setTime();
      }
    }
  }, [AMPM, time, setTime]);
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
      // console.log(type); // I expected you b!tch
      clearInterval(period);
    }
    return () => {
      clearInterval(period);
    };
  }, [onTimeSetting, onSystemSetting]);
  useEffect(() => {
    // console.log(period);
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
  return <Fragment>{visible ? msg : ''}</Fragment>;
};

Blink.propTypes = {};
const mapStateToProps = ({ alarm, time }) => ({
  AMPM: time.AMPM,
  onTimeSetting: time.onTimeSetting,
  onSystemSetting: time.onSystemSetting,
});
export default connect(mapStateToProps, {})(Blink);

import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetAlarmAction } from '../actions/alarm';
const BlinkIcon = ({
  type,
  msg,
  onAlarmMode,
  onAlarmSetting,
  alarm1,
  alarm2,
  resetAlarmAction,
}) => {
  const [visible, setVisible] = useState(true);
  const [period, setPeriod] = useState(null);
  useEffect(() => {
    // console.log(period);
    let i = setTimeout(() => {
      resetAlarmAction();
      clearInterval(period);
    }, 50 * 1000);
    return () => {
      clearTimeout(i);
    };
  }, [period, setPeriod]);
  useEffect(() => {
    if (onAlarmMode.includes(type) && onAlarmSetting) {
      setPeriod((period) =>
        setInterval(() => {
          if (onAlarmMode.includes(type)) {
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
    if (alarm1) {
      setVisible((visible) => true);
      clearInterval(period);
      setPeriod(null);
    }
    if (alarm2) {
      setVisible((visible) => true);
      clearInterval(period);
      setPeriod(null);
    }
  }, [alarm1, alarm2]);

  return (
    <Fragment>
      {type === 'al1' && onAlarmMode.includes(type) ? (
        <div className={`grid-box__child alarm-1 ${visible ? '' : 'off'}`}>
          <i className="far fa-bell">{msg}</i>
        </div>
      ) : (
        ''
      )}
      {type === 'al2' && onAlarmMode.includes(type) ? (
        <div className={`grid-box__child alarm-2 ${visible ? '' : 'off'}`}>
          <i className="far fa-bell">{msg}</i>
        </div>
      ) : (
        ''
      )}
      {type === 'al1' && (
        <div className={`grid-box__child alarm-1 ${alarm1 ? '' : 'off'}`}>
          <i className="far fa-bell">{msg}</i>
        </div>
      )}
      {type === 'al2' && (
        <div className={`grid-box__child alarm-2 ${alarm2 ? '' : 'off'}`}>
          <i className="far fa-bell">{msg}</i>
        </div>
      )}
    </Fragment>
  );
};

BlinkIcon.propTypes = {};
const mapStateToProps = ({ alarm, time }) => ({
  AMPM: time.AMPM,
  onAlarmSetting: alarm.onAlarmSetting,
  onAlarmMode: alarm.onAlarmMode,
  alarm1: alarm.alarm1,
  alarm2: alarm.alarm2,
});
export default connect(mapStateToProps, { resetAlarmAction })(BlinkIcon);

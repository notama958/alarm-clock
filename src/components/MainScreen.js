import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  setProjector,
  ConvertTime,
  clockOn,
  setTimeHour,
  setTimeMinute,
  countUp,
} from '../actions/time';
import Blink from './Blink';
import BlinkIcon from './BlinkIcon';
const MainScreen = ({
  AMPM,
  time_hh,
  time_mm,
  time_format,
  snoozeTime,
  projector,
  start,
  onTimeSetting,
  onSystemSetting,
  // actions
  setProjector,
  setTimeHour,
  setTimeMinute,
  clockOn,
  countUp,
  // alarms
  al1_hh,
  al2_hh,
  al1_mm,
  al2_mm,
  al1,
  al2,
  al1_mode,
  al2_mode,
  onAlarmSetting,
  onAlarmMode,
}) => {
  const [adjHour, setAdjHour] = useState(time_hh);
  const [hh, setHH] = useState(time_hh);
  const [mm, setMM] = useState(time_mm);
  const [currentThread, setCurrentThread] = useState(null);
  useEffect(() => {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    if (h < 10) {
      h = '0' + h;
    } else h = h.toString();

    if (m < 10) {
      m = '0' + m;
    } else m = m.toString();
    console.log('First set time');
    setTimeHour(h);
    setTimeMinute(m);
    setHH((HH) => time_hh);
    setMM((MM) => time_mm);
  }, []);

  useEffect(() => {
    if (start) {
      setCurrentThread(
        setInterval(() => {
          // pause while set clock
          if (!onSystemSetting || !onAlarmSetting) {
            console.log('change time ', time_mm);
            countUp(time_hh, time_mm);
          }
        }, 2500)
      );
    } else {
      console.log('Remove time');
      clearInterval(currentThread);
      setCurrentThread(null);
    }
    return () => {
      // clockOn(false);
      clearInterval(currentThread);
      setCurrentThread(null);
    };
  }, [start]);
  useEffect(() => {
    console.log('=====>', time_mm);
  }, [time_mm]);

  useEffect(() => {
    setAdjHour((adjHour) => ConvertTime(time_hh, time_format, AMPM));
  }, [AMPM, time_hh]);

  useEffect(() => {
    if (onSystemSetting) {
      clearInterval(currentThread);
    }
  }, [onSystemSetting]);
  useEffect(() => {
    if (onAlarmSetting) {
      clearInterval(currentThread);
    }
  }, [onAlarmSetting]);

  return (
    <div className="container__mainscreen">
      <div className="gridbox">
        <div
          className="grid-box__child header"
          onClick={(e) => {
            setProjector(!projector);
            clockOn(!start);
          }}
        >
          x
        </div>
        <div className="grid-box__child projector">
          <div className={`projector__wrapper ${projector ? '' : 'off'}`}>
            {adjHour}:{time_mm}
          </div>
        </div>

        <div className="grid-box__child hour">
          {onTimeSetting !== 'time_format' &&
          onTimeSetting !== 'snooze_time' &&
          !onAlarmSetting ? (
            <Blink msg={adjHour} timeout={20000} type="hh" />
          ) : (
            ''
          )}
          {onAlarmSetting &&
            !onAlarmMode.includes('mode') &&
            onAlarmMode.includes('al1') && (
              <Blink msg={al1_hh} timeout={20000} type="hh" />
            )}
          {onAlarmSetting &&
            !onAlarmMode.includes('mode') &&
            onAlarmMode.includes('al2') && (
              <Blink msg={al2_hh} timeout={20000} type="hh" />
            )}
        </div>
        <div
          className={`grid-box__child colon ${
            onTimeSetting === 'time_format' ||
            onTimeSetting === 'snooze_time' ||
            (onAlarmSetting && onAlarmMode.includes('mode'))
              ? 'blackout'
              : ''
          }`}
        >
          :
        </div>

        <div className="grid-box__child minute ">
          {onAlarmSetting && onAlarmMode === 'al1_mode' && (
            <Blink msg={al1_mode} timeout={20000} type="al1_mode" />
          )}
          {onAlarmSetting && onAlarmMode === 'al2_mode' && (
            <Blink msg={al2_mode} timeout={20000} type="al2_mode" />
          )}
          {onAlarmSetting &&
            !onAlarmMode.includes('mode') &&
            onAlarmMode.includes('al1') && (
              <Blink msg={al1_mm} timeout={20000} type="al1_mm" />
            )}
          {onAlarmSetting &&
            !onAlarmMode.includes('mode') &&
            onAlarmMode.includes('al2') && (
              <Blink msg={al2_mm} timeout={20000} type="al2_mm" />
            )}

          {onTimeSetting === 'time_format' && !onAlarmSetting ? (
            <Blink msg={time_format} timeout={20000} type="time_format" />
          ) : onTimeSetting === 'snooze_time' && !onAlarmSetting ? (
            <Blink msg={snoozeTime} timeout={20000} type="snooze_time" />
          ) : !onAlarmSetting ? (
            <Blink msg={time_mm} timeout={20000} type="mm" />
          ) : (
            ''
          )}
        </div>
        <div className="grid-box__child mem ">MEM</div>
        <BlinkIcon type="al1" msg={1} />
        <BlinkIcon type="al2" msg={2} />
        <div className="grid-box__child sl">SL</div>
        <div className="grid-box__child ampm">{AMPM}</div>
      </div>
    </div>
  );
};

MainScreen.propTypes = {};
const mapStateToProps = ({ alarm, time }) => ({
  time_hh: time.hour,
  time_mm: time.minute,
  time_format: time.time_format,
  snoozeTime: time.snoozeTime,
  AMPM: time.AMPM,
  start: time.start,
  al1_hh: alarm.al1_hour,
  al1_mm: alarm.al1_minute,
  al1_mode: alarm.al1_mode,
  al2_hh: alarm.al2_hour,
  al2_mm: alarm.al2_minute,
  al2_mode: alarm.al2_mode,
  al1: alarm.alarm1,
  al2: alarm.alarm2,
  projector: time.projector,
  onTimeSetting: time.onTimeSetting,
  onSystemSetting: time.onSystemSetting,
  onAlarmSetting: alarm.onAlarmSetting,
  onAlarmMode: alarm.onAlarmMode,
});
export default connect(mapStateToProps, {
  setProjector,
  ConvertTime,
  clockOn,
  setTimeMinute,
  setTimeHour,
  countUp,
})(MainScreen);

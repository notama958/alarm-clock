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
  onAlarmSetting,
  onAlarmMode,
}) => {
  const [adjHour, setAdjHour] = useState(time_hh);
  const [adjMinute, setAdjMinute] = useState(time_mm);
  const [currentThread, setCurrentThread] = useState(null);
  const [clockStart, setClockStart] = useState(start);
  // useEffect(() => {
  //   let today = new Date();
  //   let h = today.getHours();
  //   let m = today.getMinutes();
  //   if (h < 10) {
  //     h = '0' + h;
  //   } else h = h.toString();

  //   if (m < 10) {
  //     m = '0' + m;
  //   } else m = m.toString();
  //   console.log('First set time');
  //   setAdjHour((adjHour) => h);
  //   setAdjMinute((adjMinute) => m);
  // }, []);

  // useEffect(() => {
  //   if (start) {
  //     setCurrentThread(
  //       setInterval(() => {
  //         // pause while set clock
  //         if (!onSystemSetting) {
  //           console.log('change time');
  //           countUp(time_hh, time_mm, AMPM);
  //         }
  //         // setAdjMinute(parseInt(time_mm) + 1);
  //       }, 2500)
  //     );
  //   }
  //   return () => {
  //     // clockOn(false);
  //     setCurrentThread(null);
  //     clearInterval(currentThread);
  //   };
  // }, [start]);

  // useEffect(() => {
  //   if (onSystemSetting || !start) {
  //     clearInterval(currentThread);
  //   }
  // }, [start, onSystemSetting, currentThread, setCurrentThread]);

  useEffect(() => {
    setAdjHour((adjHour) => ConvertTime(time_hh, time_format, AMPM));
  }, [AMPM, time_hh]);

  // useEffect(() => {
  //   console.log('hello hour ', time_hh);
  //   setTimeHour(adjHour);
  // }, [adjHour, time_hh]);

  // useEffect(() => {
  //   console.log('hello minute ', time_mm);
  //   setTimeMinute(time_mm);
  // }, [time_mm]);

  // useEffect(() => {
  //   console.log('hello hour ', time_hh);
  //   setAdjHour(time_hh);
  // }, [time_hh]);

  return (
    <div className="container__mainscreen">
      <div className="gridbox">
        <div
          className="grid-box__child header"
          onClick={(e) => {
            setProjector(!projector);
            clockOn(true);
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
          {onAlarmSetting ? (
            <div className="grid-box__child hour">
              {onAlarmMode !== 'mode' ? (
                <Blink msg={al1_hh} timeout={20000} type="hh" />
              ) : (
                <Blink msg={al2_hh} timeout={20000} type="hh" />
              )}
            </div>
          ) : (
            ''
          )}
        </div>
        <div
          className={`grid-box__child colon ${
            onTimeSetting === 'time_format' ||
            onTimeSetting === 'snooze_time' ||
            (onAlarmSetting && onAlarmMode !== 'hh' && onAlarmMode !== 'mm')
              ? 'blackout'
              : ''
          }`}
        >
          :
        </div>

        <div className="grid-box__child minute ">
          {onAlarmSetting ? (
            <Blink msg={'00'} type="mm" />
          ) : (
            <Blink msg={'mode'} type="mode" />
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
        <div className={`grid-box__child alarm-1  ${al1 ? '' : 'off'}`}>
          <i className="far fa-bell"> 1</i>
        </div>
        <div className={`grid-box__child alarm-2 ${al2 ? '' : 'off'} `}>
          <i className="far fa-bell"> 2</i>
        </div>
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
  al2_hh: alarm.al2_hour,
  al2_mm: alarm.al2_minute,
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

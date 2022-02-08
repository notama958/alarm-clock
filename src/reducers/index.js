import { combineReducers } from 'redux';
import alert from './alert';
import alarm from './alarm';
import time from './time';
export default combineReducers({ alert, alarm, time });

import React from 'react';
import PropTypes from 'prop-types';

const MainScreen = (props) => {
  return (
    <div className="container__mainscreen">
      <div className="gridbox">
        <div className="grid-box__child header">x</div>
        <div className="grid-box__child projector">
          <div className="projector__wrapper off">
            <p>23:49</p>
          </div>
        </div>
        <div className="grid-box__child hour">hh</div>
        <div className="grid-box__child colon">:</div>

        <div className="grid-box__child minute ">mm</div>
        <div className="grid-box__child mem ">MEM</div>
        <div className="grid-box__child alarm-1 ">
          <i class="far fa-bell"> 1</i>
        </div>
        <div className="grid-box__child alarm-2 ">
          <i class="far fa-bell"> 2</i>
        </div>
        <div className="grid-box__child sl">SL</div>
      </div>
    </div>
  );
};

MainScreen.propTypes = {};

export default MainScreen;

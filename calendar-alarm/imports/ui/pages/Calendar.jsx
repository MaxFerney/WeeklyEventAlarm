// Modules
import React, { useState } from 'react';
import {NavLink, Link} from "react-router-dom";
import PropTypes from 'prop-types';
// import {  } from "react-router";

// Components
// import Header from './../components/Header.js';
// import Footer from './../components/Footer.js';

const Calendar = (props) => {
    //Stubbed out variables to edit later
    let currentEvent="";
    let eventTime="";
    let commute=0;
  //Needs to route to Calendar.jsx
    return(
        <div id="alarmPage">
            <div id="eventAlarm">
                <h1>{currentEvent}</h1>
                <hr/>
                <h1>{eventTime}</h1>
            </div>
            <p>Your event starts in 15 minutes! Please take proper precautions to assure you are not late.</p>
            <p>Your estimated commute is: {commute} minutes</p>

            <button>Back to Events</button>
        </div>
    );
}
export default Calendar;

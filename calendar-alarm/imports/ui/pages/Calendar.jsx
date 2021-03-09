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
    let startDate="";
    let endDate="";
    //year is current year
    let year="";
    //Event variables
    let currentEvent="Add Events";
    let eventTimeStart="0:00";
    let eventTimeEnd="0:00";
    let amPm="am";
    return(
        <div id="calendarPage">
            <div id="weekPicker">
                <p>&lt;</p>
                <p>{startDate}-{endDate},{year}</p>
                <p>&gt;</p>
            </div>
            <div id="weeklyCalendar">
                <div id="dayOfWeek">
                    <p>M</p>
                    <p>T</p>
                    <p>W</p>
                    <p>R</p>
                    <p>F</p>
                    <p>S</p>
                    <p>S</p>
                </div>
                <div id="taskArea">
                    <div id="mondayTasks"></div>
                    <div id="tuesdayTasks"></div>
                    <div id="wednesdayTasks"></div>
                    <div id="thursdayTasks"></div>
                    <div id="fridayTasks"></div>
                    <div id="saturdayTasks"></div>
                    <div id="sundayTasks"></div>
                </div>
            </div>
            <div id="dailyTaskList">
                <ul>
                    <li><p>{currentEvent}</p><p>{eventTimeStart}-{eventTimeEnd}{amPm}</p></li>
                </ul>
            </div>
        </div>
    );
}
export default Calendar;

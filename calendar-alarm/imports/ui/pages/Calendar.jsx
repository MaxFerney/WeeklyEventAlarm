// Modules
import React, { useState } from 'react';
import {NavLink, Link} from "react-router-dom";
import PropTypes from 'prop-types';
import moment from 'moment';

// import {  } from "react-router";

// Components
// import Header from './../components/Header.js';
// import Footer from './../components/Footer.js';

const Calendar = (props) => {

    //Stubbed out variables to edit later
    let startDate= moment( moment().day(0) ).format("MMM Do");
    // console.log( moment(moment().month()+1,"M").format("MMM") );
    // console.log( moment(moment().month()+1,"M").format("MMM").toString() + ", " + moment().date().toString() );
    let endDate= moment( moment().day(6) ).format("MMM Do");
    //year is current year
    let year=moment( moment().day(0) ).format("YYYY");
    //Event variables
    let currentEvent="Add Events";
    let eventTimeStart="0:00";
    let eventTimeEnd="0:00";
    let amPm="am";
    const getDays = () =>{
        let days=[];
        for(var i=0;i<7;i++){
            days.push(
                <p key={i}>{moment( moment().day(i) ).format("dd [ | ] D")}</p>
            );
        }
        return days;
    };
    return(
        <div id="calendarPage">
            <div id="weekPicker">
                <p>&lt;</p>
                <p>{startDate}-{endDate},{year}</p>
                <p>&gt;</p>
            </div>
            <div id="weeklyCalendar">
                <div id="dayOfWeek">
                    {getDays()}
                    {/*<p>S {moment(moment().day())}</p>
                    <p>M</p>
                    <p>T</p>
                    <p>W</p>
                    <p>R</p>
                    <p>F</p>
                    <p>S</p>*/}
                </div>
                <div id="taskArea">
                    <div id="sundayTasks"></div>
                    <div id="mondayTasks"></div>
                    <div id="tuesdayTasks"></div>
                    <div id="wednesdayTasks"></div>
                    <div id="thursdayTasks"></div>
                    <div id="fridayTasks"></div>
                    <div id="saturdayTasks"></div>
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

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
    let currentTime = moment().format('X');
    const getDays = () =>{
        let days=[];
        for(var i=0;i<7;i++){
            days.push(
                <p key={i}>{moment( moment().day(i) ).format("dd")}</p>
            );
        }
        return days;
    };

    function styleSelectedDay(selectedDay){
        let el=document.getElementById(selectedDay);
        el.classList.add("selectedBorder");
    }

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
                    <p>S</p>
                    U+005C U+0022*/}
                </div>
                <div id="taskArea">
                    <div id="sundayTasks" class="visualCalendar" onclick="styleSelectedDay(U+005C U+0022 sundayTasks U+005C U+0022)">.</div>
                    <div id="mondayTasks" class="visualCalendar" onclick="styleSelectedDay(U+005C U+0022 mondayTasks U+005C U+0022)">.</div>
                    <div id="tuesdayTasks" class="visualCalendar" onclick="styleSelectedDay(U+005C U+0022 tuesdayTasks U+005C U+0022)">.</div>
                    <div id="wednesdayTasks" class="visualCalendar" onclick="styleSelectedDay(U+005C U+0022 wednesdayTasks U+005C U+0022)">.</div>
                    <div id="thursdayTasks" class="visualCalendar" onclick="styleSelectedDay(U+005C U+0022 thursdayTasks U+005C U+0022)">.</div>
                    <div id="fridayTasks" class="visualCalendar" onclick="styleSelectedDay(U+005C U+0022 fridayTasks U+005C U+0022)">.</div>
                    <div id="saturdayTasks" class="visualCalendar" onclick="styleSelectedDay(U+005C U+0022 saturdayTasks U+005C U+0022)">.</div>
                </div>
            </div>
            <div id="dailyTaskList">
                <ul>
                    <li><p>{currentEvent}</p><p>{eventTimeStart}-{eventTimeEnd}{amPm}</p></li>
                </ul>
                {/*add event button*/}
                <NavLink to={{
                    pathname:"/edit/"+currentTime,
                    state:{
                        eventID:currentTime,
                        from:'calendar'
                    }
                }}>+ Add Event</NavLink>
            </div>

        </div>
    );
}
export default Calendar;

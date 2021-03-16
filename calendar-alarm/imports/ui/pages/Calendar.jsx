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
    console.log(currentTime);
    const getDays = () =>{
        let days=[];
        for(var i=0;i<7;i++){
            days.push(
                <p key={i}>{moment( moment().day(i) ).format("dd")}</p>
            );
        }
        return days;
    };
    //Applies border to selected borders
    function styleSelectedDay(selectedDay){
        //make default selected = current day
        $('.selectedBorder').removeClass("selectedBorder")
        let el=document.getElementById(selectedDay);
        el.classList.add("selectedBorder");
    }

    const renderDayItems = () => {
        //set default to today
        //make a moment selector
        let fromdb = [];
        const items = fromdb.map((item)=>{
            return(
                <li key={item.EventID}>
                    <NavLink to={{
                        pathname:"/overview/"+item.EventID,
                        state:{
                            eventID:item.EventID,
                            from:'calendar'
                        }
                    }}>
                        <span>{item.Details.Name}</span> <span>{item.Times.StartTime}-{item.Times.StopTime}</span>
                    </NavLink>

                </li>
            )
        })
        return (
            <ul id="">
                {items}
            </ul>
        );
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
                    <div id="sundayTasks" className="visualCalendar" onClick={()=>{styleSelectedDay("sundayTasks")}}>.</div>
                    <div id="mondayTasks" className="visualCalendar" onClick={()=>{styleSelectedDay("mondayTasks")}}>.</div>
                    <div id="tuesdayTasks" className="visualCalendar" onClick={()=>{styleSelectedDay("tuesdayTasks")}}>.</div>
                    <div id="wednesdayTasks" className="visualCalendar" onClick={()=>{styleSelectedDay("wednesdayTasks")}}>.</div>
                    <div id="thursdayTasks" className="visualCalendar" onClick={()=>{styleSelectedDay("thursdayTasks")}}>.</div>
                    <div id="fridayTasks" className="visualCalendar" onClick={()=>{styleSelectedDay("fridayTasks")}}>.</div>
                    <div id="saturdayTasks" className="visualCalendar" onClick={()=>{styleSelectedDay("saturdayTasks")}}>.</div>
                </div>
            </div>
            <div id="dailyTaskList">
                {renderDayItems("sundayTasks")}
                {/*add event button*/}
            </div>
            <NavLink to={{
                pathname:"/edit/"+currentTime,
                state:{
                    eventID:currentTime,
                    from:'calendar'
                }
            }}>+ Add Event</NavLink>
        </div>
    );
}
export default Calendar;

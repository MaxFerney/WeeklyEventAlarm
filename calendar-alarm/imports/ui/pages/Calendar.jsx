// Modules
import React, { useState, useEffect } from 'react';
import {NavLink, Link, useLocation} from "react-router-dom";
import PropTypes from 'prop-types';
import moment from 'moment';
import { CalendarCollectionAccess } from './../../../lib/calData.js';

// import {  } from "react-router";

// Components
// import Header from './../components/Header.js';
// import Footer from './../components/Footer.js';
const unixToToday = (unixTime) =>{
    return moment( moment(unixTime, 'X').format('h:mm:ss a'), 'h:mm:ss a').format('X');
}

const DayItems = (props) => {
    let day = props.day;
    let dayItems = props.allLocalStorage.filter(item => {
        return(
            item.Times.Days.includes(day.day())
        )
    } ).sort( (d1,d2) => unixToToday(d1.Times.StartTime) - unixToToday(d2.Times.StartTime) );

    //console.log(dayItems);

    const items = dayItems.map((item)=>{
        let formatStart = moment(item.Times.StartTime, 'X').format('h:mm a');
        let formatEnd = moment(item.Times.StopTime, 'X').format('h:mm a');
        return(
            <li key={item.EventID} className={"events"}>
                <NavLink to={{
                    pathname:"/overview/"+item.EventID,
                    state:{
                        eventID:item.EventID,
                        from:'existingEvent'
                    }
                }}>
                <span className={"theme_"+item.Details.Theme}><span>{item.Details.Name}</span> <span>{formatStart}-{formatEnd} &gt;</span></span>
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

const Calendar = (props) => {

    //Stubbed out variables to edit later
    let location = useLocation();
    let firstRender = true;
    const [currentDay, setCurrentDay] = useState(moment(moment().day(), 'd'));
    let startDate= moment( moment().day(0) ).format("MMM Do");
    let endDate= moment( moment().day(6) ).format("MMM Do");
    //year is current year
    let year=moment( moment().day(0) ).format("YYYY");
    //Event variables
    let currentEvent="Add Events";
    let eventTimeStart="0:00";
    let eventTimeEnd="0:00";
    let amPm="am";
    let currentTime = moment().format('X');

    //console.log(currentTime);
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
        $('.selectedBorder').removeClass("selectedBorder");
        $('#'+selectedDay).addClass("selectedBorder");
        // let el=document.getElementById(selectedDay);
        // el.classList.add("selectedBorder");
    }

    const taskRender = () => {
        const itemDivBox = (dayID, dayItems, overSix) => {
            let dayBoxes = dayItems.map((item, index)=>
            <>
                <div key={item.EventID.toString()} className={"itemBox_"+item.Details.Theme}>
                    <p className="calendar_p">{moment(item.Times.StartTime, 'X').format('h:mma')}</p>
                </div>
                {/*{console.log("overSix: "+overSix.toString()+" | index: "+index)}
                {(overSix && index==5)
                    ? " v "
                    : ""
                }
                */}
            </>
            )
            if (overSix){
                dayBoxes.push(
                    <p className="over_six_text">V</p>
                );
            }
            //console.log(dayBoxes);

            return dayBoxes;
        }
        //Day columns
        let days=[];
        for(var i=0;i<7;i++){
            let dayName = moment( moment().day(i) ).format("ddd"); //mon
            let dayID = moment( moment().day(i) ); //1
            let overSix = false
            let dayItems = props.allLocalStorage.filter(item => {
                return(
                    item.Times.Days.includes(i)
                )
            } ).sort( (d1,d2) => unixToToday(d1.Times.StartTime) - unixToToday(d2.Times.StartTime) );
            //individual day column
            dayItems = dayItems.filter((item, index) => {
                //console.log(index);
                if (index<6){
                    return true;
                } else {
                    overSix=true;
                    return false;
                }
            } );
            days.push(

                <div
                    key={i}
                    id={dayName}
                    className="visualCalendar"
                    onClick={()=>{
                        styleSelectedDay(dayName);
                        setCurrentDay(moment(dayName, 'ddd'));
                    }}>
                    {
                        dayItems.length==0
                        ? <p></p>
                        : itemDivBox(dayID, dayItems, overSix)
                    }
                </div>
            );
        }
        return days;

    }
    //$('editPage').css('background-image', 'url(' + imageUrl + ')');
    return(
        <div id="calendarPage">
            <div id="weekPicker">
                <p>{startDate}-{endDate},{year}</p>
            </div>
            <div id="weeklyCalendar">
                <div id="dayOfWeek">
                    {getDays()}

                </div>
                <div id="taskArea">
                    {taskRender()}

                </div>
            </div>
            <div id="dailyTaskList">
                <DayItems {...props} day={currentDay}/>
                {/*add event button*/}
            </div>
            <NavLink id="addEventButton"to={{
                pathname:"/edit/"+currentTime,
                state:{
                    eventID:currentTime,
                    from:'addEvent'
                }
            }}>+ Add Event</NavLink>
        </div>
    );
}
export default Calendar;

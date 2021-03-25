// Modules
import React, { useState } from 'react';
import {Tracker} from 'meteor/tracker';
import {NavLink, Link, useLocation, useParams, Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import NavButton from './../components/NavButton.jsx';
import moment from 'moment';
import { CalendarCollectionAccess } from './../../../lib/calData.js';
// import {  } from "react-router";

// Components
// import Header from './../components/Header.js';
// import Footer from './../components/Footer.js';
const EventDetailCompoent = (props) =>{
    const item = props.item;
    console.log(props)
    return(
        <div id="eventOverview">
            <div id="details">
                <div id="eventName">
                    <h2 className="descriptor">Name: </h2>
                    <p className="value">{item.Details.Name}</p>
                </div>
                <div id="eventTheme">
                    <h2 className="descriptor">Event Theme: </h2>
                    <p className="value">{item.Details.Theme}</p>
                </div>
                <div id="eventAddress">
                    <h2 className="descriptor">Address: </h2>
                    <p className="value">{item.Details.Address}</p>
                </div>
            </div>
            <div id="times">
                <div id="eventStart">
                    <h2 className="descriptor">Start Time: </h2>
                    <p className="value">{moment(item.Times.StartTime, 'X').format('h:mm a')}</p>
                </div>
                <div id="eventStop">
                    <h2 className="descriptor">Stop Time: </h2>
                    <p className="value">{moment(item.Times.StopTime, 'X').format('h:mm a')}</p>
                </div>
                <div id="eventDays">
                    <h2 className="descriptor">Days: </h2>
                    <p className="value">{
                        item.Times.Days.map((day)=>
                            <span key={day}>{moment(day,'d').format('dd')}</span>
                        )
                    }</p>
                </div>
                <div id="eventRepeat">
                    <p className="descriptor">Repeat: </p>
                    <p className="value">{item.Times.DoesRepeat.toString()}</p>
                </div>
            </div>
        </div>
    );
}

const EventOverview = (props) => {
    //Stubbed out variables to edit later
    let currentEvent="Replace this event";
    let eventTime="Replace this time";
    let commute=0;
    let results = null;
    let item;
    const currTime = moment().format('X');

    let eventID = props.eventID;
    console.log(eventID);
    const [redirectToCalendar, setRedirectToCalendar] = useState(false);
    const [redirectToEdit, setRedirectToEdit] = useState(false);
    // console.log(eventID);
    // console.log(props.eventID);
    // console.log(moment().format('X'));
    //test eventID - 1615495198

    const getEventInfo = () => {

        console.log(props.allCalendarItems);
        results = props.allCalendarItems.filter(item => item.EventID.toString() === eventID.toString());
        item = results[0];
        //console.log(results[0]);
        return results[0];

    }
    const renderItem = () => {
        return(
            <EventDetailCompoent item={item} />
        );
    }

    if (results == null){
        console.log("getting info");
        if(eventID == null){
            console.error("HOW DID YOU GET HERE?!?");
        } else {
            getEventInfo();
        }

    }
    if (redirectToCalendar){
        return(
            <Redirect to={{
                pathname:"/calendar",
                state:{
                    eventID:eventID,
                    from:"overview"
                }
            }}/>
        );
    }
    if (redirectToEdit){
        return(
            <Redirect to={{
                pathname:"/edit/"+eventID,
                state:{
                    eventID:eventID,
                    from:"existingEvent"
                }
            }}/>
        );
    }
  //Needs to route to Calendar.jsx
    return(
        <div id="overviewPage">
            <h1>Event Overview</h1>
            {(results.length==0) ? <p>awaiting data</p> : renderItem()}

            <div id="buttons">
                <button onClick={()=>{setRedirectToCalendar(true)}}>Back to Calendar</button>
                <button onClick={()=>{setRedirectToEdit(true)}}>Edit</button>
            </div>

            {/*<NavButton id="continue" to_pathname="/calendar" to_state={{from:"alarm"}} text="Back to events" />*/}
        </div>
    );
}
export default EventOverview;

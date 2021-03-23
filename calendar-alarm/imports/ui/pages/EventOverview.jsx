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

const EventOverview = (props) => {
    //Stubbed out variables to edit later
    let currentEvent="Replace this event";
    let eventTime="Replace this time";
    let commute=0;
    let results = null;
    let item;
    let location = useLocation();
    const currTime = moment().format('X');
    const [eventID, setEventID] = useState(!!location.state ? location.state.eventID : null);
    const [redirectToCalendar, setRedirectToCalendar] = useState(false);
    const [redirectToEdit, setRedirectToEdit] = useState(false);
    // console.log(eventID);
    // console.log(props.eventID);
    // console.log(moment().format('X'));
    //test eventID - 1615495198

    const getEventInfo = () => {

        console.log(props.allCalendarItems);
        results = props.allCalendarItems.filter(item => item.EventID.toString() === eventID.toString());
        item = JSON.stringify(results[0])
        //console.log(results[0]);
        return results[0];

    }
    const renderItem = () => {
        return(
            <p>{item}</p>
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
                    eventID:location.state.eventID,
                    from:"overview"
                }
            }}/>
        );
    }
    if (redirectToEdit){
        return(
            <Redirect to={{
                pathname:"/edit/"+location.state.eventID,
                state:{
                    eventID:location.state.eventID,
                    from:"existingEvent"
                }
            }}/>
        );
    }
  //Needs to route to Calendar.jsx
    return(
        <div id="overviewPage">
            <h1>Event Overview</h1>
            <div id="eventOverview">
                {(results==null) ? <p>awaiting data</p> : renderItem()}
            </div>
            <button onClick={()=>{setRedirectToCalendar(true)}}>Back to Calendar</button>
            <button onClick={()=>{setRedirectToEdit(true)}}>Edit</button>
            {/*<NavButton id="continue" to_pathname="/calendar" to_state={{from:"alarm"}} text="Back to events" />*/}
        </div>
    );
}
export default EventOverview;

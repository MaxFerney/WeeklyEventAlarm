// Modules
import React, { useState } from 'react';
import {Tracker} from 'meteor/tracker';
import {NavLink, Link, useLocation, useParams} from "react-router-dom";
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
    let location = useLocation();
    const currTime = moment().format('X');
    const [eventID, setEventID] = useState(!!location.state ? location.state.eventID : null);
    const [eventItem, setEventItem] = useState(null);
    console.log(eventID);
    console.log(props.eventID);
    console.log(moment().format('X'));
    //test eventID - 1615495198

    const getEventInfo = () => {
        console.log(props.allCalendarItems);
        results = props.allCalendarItems.filter(item => item.EventID.toString() === eventID.toString());
        console.log(results[0]);
        //setEventItem(results[0]);
        return results[0];

    }
    const createEvent = () => {
        var name = $('#eventName').val();
        var theme = 'Home';
        var address = "1234 place rd";
        var startTime = parseInt( moment( moment().minutes(),"m" ).format('X') );
        var stopTime = parseInt( moment( moment(moment().minutes(),"m").add(1, 'h') ).format('X') );
        console.log(startTime);
        console.log(stopTime);
        var days = [2,4];
        var repeat = false;
        var soundName = "Alarm";
        var soundFileLocation = null;
        //perhaps change this type or how it's stored
        var notifications = [
            {minPrior:2},
            {minPrior:15},
            {hourPrior:0}
        ];
        var description = "None Provided";

        CalendarCollectionAccess.insert({
            EventID:location.state.eventID,
            isActive:true,
            Details:{
                Name:name,
                Theme:theme,
                Address:address,
                Description:description
            },
            Times:{
                StartTime:startTime,
                StopTime:stopTime,
                Days:days,
                DoesRepeat:repeat
            },
            AlarmDetails:{
                Notifications:notifications,
                Sound:soundName,
                SoundFile:soundFileLocation
            }
        });
    };
    if (eventItem === null){
        console.log("getting info");
        getEventInfo();
    }

  //Needs to route to Calendar.jsx
    return(
        <div id="overviewPage">
            <div id="eventOverview">
                <h1>{currentEvent}</h1>
                <h1>{eventTime}</h1>
            </div>
            <p>Your event starts in 15 minutes! Please take proper precautions to assure you are not late.</p>
            <p>Your estimated commute is: {commute} minutes</p>
            <input id="eventName" type="text"/>
            <button onClick={createEvent}>TEMP CREATE EVENT</button>
            {(results===null) ? <p>awaiting data</p> : <p>{JSON.stringify(results)}</p>}
            {/*<NavButton id="continue" to_pathname="/calendar" to_state={{from:"alarm"}} text="Back to events" />*/}
        </div>
    );
}
export default EventOverview;

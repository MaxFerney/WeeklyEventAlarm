// Modules
import React, { useState } from 'react';
import {NavLink, Link, useLocation, useParams} from "react-router-dom";
import PropTypes from 'prop-types';
import NavButton from './../components/NavButton.jsx';
// import {  } from "react-router";

// Components
// import Header from './../components/Header.js';
// import Footer from './../components/Footer.js';

const EventOverview = (props) => {
    //Stubbed out variables to edit later
    let currentEvent="Replace this event";
    let eventTime="Replace this time";
    let commute=0;
    let location = useLocation();
    const [eventID, setEventID] = useState(!!location.state ? location.state.eventID : null);
    console.log(eventID);
    console.log(props.eventID);


  //Needs to route to Calendar.jsx
    return(
        <div id="overviewPage">
            <div id="eventOverview">
                <h1>{currentEvent}</h1>
                <h1>{eventTime}</h1>
            </div>
            <p>Your event starts in 15 minutes! Please take proper precautions to assure you are not late.</p>
            <p>Your estimated commute is: {commute} minutes</p>
            {/*<NavButton id="continue" to_pathname="/calendar" to_state={{from:"alarm"}} text="Back to events" />*/}
        </div>
    );
}
export default EventOverview;

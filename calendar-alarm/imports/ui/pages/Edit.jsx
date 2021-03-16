import React, { useState, useEffect } from 'react';
// import {Helmet} from "react-helmet";
import PropTypes from 'prop-types';
import moment from 'moment';
//import { useParams } from 'react-router-dom';

import { useParams, useHistory, Redirect, BrowserRouter as Router, Route, NavLink, useLocation } from "react-router-dom";

// import Footer from './../components/footer.jsx';
// import Header from './../components/header.jsx';
// import TimeList from './TimeList.jsx';

import { CalendarCollectionAccess } from './../../../lib/calData.js';

const Edit = (props) => {
    let location = useLocation();
    const [redirectToOverview, setRedirectToOverview] = useState(false);
    const renderCategories = (default_category="Work") => {
        var mappedCategories = props.categories.map((category) => {
            if (category==default_category){
                return(<option selected value={category}>{category}</option>);
            } else {
                return(<option value={category}>{category}</option>);
            }
        });
        return (
            <select name="categories" id="themeSelection" class="" >
                {mappedCategories}
            </select>
        );
    }
    //updates db with info
    const seeNewTime = () => {
        // var startTime = parseInt(moment($('#newTimeStart').val()).format('X'));
        // var stopTime = parseInt(moment($('#newTimeEnd').val()).format('X'));
        // var category = $('#categorySelection').val();
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
        //alert('New Time Added!');
        console.log("lets gooo");
        setRedirectToOverview(true);
        return (

            <Redirect to={{
                pathname:"/overview/"+location.state.eventID,
                state:{
                    eventID:location.state.eventID,
                    from:"edit"
                }
            }}/>
        );
    }

    const getInfoData = () => {
        return (
            <div id="editInfoContainer">
                <p>Name</p>
                <input id="eventName" type="text" class=""/>
                <p>Event Theme</p>
                { renderCategories("Work") }
                <p>Event Address</p>
                <input id="eventAddress" type="text" class=""/>
            </div>
        );
    }

    const getDateData = () => {
        return (
            <div id="editTimeContainer">
                <p>Start Time</p>
                <input id="newTimeStart" type="datetime-local" class=""/>
                <p>End Time</p>
                <input id="newTimeEnd" type="datetime-local" class=""/>
                <p>Category</p>
                { renderCategories("Work") }
                <br/>
                <button id="saveValuesBtn" class="greenBG" onClick={ () => seeNewTime() }>
                    Save
                </button>
            </div>
        );
    }

    const getOtherData = () => {
        return (
            <div id="editOtherContainer">
                <h2 id="addNewTimeHeader">Add New Time</h2>
                <p>Start Time</p>
                <input id="newTimeStart" type="datetime-local" class="tanBG"/>
                <p>End Time</p>
                <input id="newTimeEnd" type="datetime-local" class="tanBG"/>
                <p>Category</p>
                { renderCategories("Work") }
                <br/>
                <button id="saveValuesBtn" class="greenBG" onClick={ () => seeNewTime() }>
                    Save
                </button>
            </div>
        );
    }
    //whole form
    const getData = () => {
        return(
            <div id="editContainer">
                {getInfoData()}
                {getDateData()}
                {getOtherData()}
            </div>
        );
    }

    if (redirectToOverview){
        return(
            <Redirect to={{
                pathname:"/overview/"+location.state.eventID,
                state:{
                    eventID:location.state.eventID,
                    from:"edit"
                }
            }}/>
        );

        console.log(redirectToOverview);
    }
    return (
       <div id="editPage">
            {/*<Helmet>
                <title>Edit / Update</title>
            </Helmet>*/}
            {/*conditionals for if its an edit or create event type page.*/}
            {/*<Header />*/}
            {getData()}
            {/*<Footer />*/}
       </div>
    );
}
export default Edit

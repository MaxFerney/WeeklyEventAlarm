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
    let daysSelected = [];
    let results = null;
    let item;
    let firstRender = true;

    const [eventID, setEventID] = useState(!!location.state ? location.state.eventID : null);

    const [redirectToOverview, setRedirectToOverview] = useState(false);
    const [redirectToCalendar, setRedirectToCalendar] = useState(false);
    //let redirectToOverview = false;


    if (firstRender){
        console.log("getting information...");
        if (location.state.from=="addEvent"){
            //this is a new event. set defaults here
            console.log("this is a new event");
        } else if (location.state.from=="existingEvent"){
            //gather defaults from existing event
            console.log("this is an existing event");
            results = props.allCalendarItems.filter(item => item.EventID.toString() === eventID.toString());

            item = JSON.stringify(results[0])
            console.log(item);
            daysSelected = results[0].Times.Days;

        } else {
            console.error("something went horribly wrong");
        }
        firstRender=false;
    }
    //updates db with info
    const seeNewTime = (data=null) => {
        // var startTime = parseInt(moment($('#newTimeStart').val()).format('X'));
        // var stopTime = parseInt(moment($('#newTimeEnd').val()).format('X'));
        // var category = $('#categorySelection').val();

        /*THIS WILL BE REPLACED WITH STUFF ON THE PAGE*/
        //default
        var name = $('#eventName').val();
        var theme = $('#themeSelection').val();
        var address = $('#eventAddress').val();
        // var startTime = parseInt( moment( moment().minutes(),"m" ).format('X') );
        // var stopTime = parseInt( moment( moment(moment().minutes(),"m").add(1, 'h') ).format('X') );
        var startTime = parseInt(moment($('#TimeStart').val()).format('X'))
        var stopTime = parseInt(moment($('#TimeEnd').val()).format('X'))
        var days = daysSelected;
        if (daysSelected.length==0){
            //ensure atleast a single day is selected
            daysSelected.push(parseInt(moment($('#TimeStart').val()).format('d')))
        }
        var doInsert = false;

        if (data == null){
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
                    Days:daysSelected,
                    DoesRepeat:repeat
                },
                AlarmDetails:{
                    Notifications:notifications,
                    Sound:soundName,
                    SoundFile:soundFileLocation
                }
            });

        } else {
            console.log('attempting to update')
            var repeat = results[0].Times.DoesRepeat;
            var soundName = results[0].AlarmDetails.Sound;
            var soundFileLocation = results[0].AlarmDetails.SoundFile;
            //perhaps change this type or how it's stored
            var notifications = results[0].AlarmDetails.Notifications;
            var description = results[0].Details.Description;

            var databaseUpdate = {
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
                        Days:daysSelected,
                        DoesRepeat:repeat
                    },
                    AlarmDetails:{
                        Notifications:notifications,
                        Sound:soundName,
                        SoundFile:soundFileLocation
                    }
                }

            Meteor.call(`updateEventByID`, location.state.eventID, databaseUpdate);
        //     CalendarCollectionAccess.update({_id:item._id},{$set:{
        //             EventID:location.state.eventID,
        //             isActive:true,
        //             Details:{
        //                 Name:name,
        //                 Theme:theme,
        //                 Address:address,
        //                 Description:description
        //             },
        //             Times:{
        //                 StartTime:startTime,
        //                 StopTime:stopTime,
        //                 Days:daysSelected,
        //                 DoesRepeat:repeat
        //             },
        //             AlarmDetails:{
        //                 Notifications:notifications,
        //                 Sound:soundName,
        //                 SoundFile:soundFileLocation
        //             }
        //         }
        //     });
        }






        //alert('New Time Added!');
        //console.log("lets gooo");
        setRedirectToOverview(true);
        //redirectToOverview=true
        // return (
        //
        //     <Redirect to={{
        //         pathname:"/overview/"+location.state.eventID,
        //         state:{
        //             eventID:location.state.eventID,
        //             from:"edit"
        //         }
        //     }}/>
        // );
    }

    const getInfoData = (data=null) => {

        const renderCategories = (default_category="Work") => {
            var mappedCategories = props.categories.map((category) => {
                if (category==default_category){
                    return(<option key={category} selected value={category}>{category}</option>);
                } else {
                    return(<option key={category} value={category}>{category}</option>);
                }
            });
            return (
                <select name="categories" id="themeSelection" className="" placeholder="Event Theme">
                    {mappedCategories}
                </select>
            );
        }
        if (data==null){
            return (
                <div id="editInfoContainer">
                    <input id="eventName" type="text" className="" placeholder="Event Name"/>
                    { renderCategories("Event Theme") }
                    <input id="eventAddress" type="text" className="" placeholder="Event Address"/>
                </div>
            );
        } else {
            console.log(data);
            console.log(results[0].Details);
            return (
                <div id="editInfoContainer">
                    <input id="eventName" type="text" className="" defaultValue={results[0].Details.Name}/>
                    { renderCategories(results[0].Details.Theme.toString()) }
                    <input id="eventAddress" type="text" className="" defaultValue={results[0].Details.Address} />
                </div>

            );
        }

    }

    const getDateData = (data=null) => {
        //selection fanciness
        const selectDay = (dayNum) => {
            let currentDay = $('#day'+dayNum);
            if ($('#day'+dayNum).hasClass("selectedBorder")){
                //remove day from days selected.
                $('#day'+dayNum).removeClass("selectedBorder");
                daysSelected = daysSelected.filter(function(e) { return e !== dayNum })
                //console.log("REMOVED DAY"+dayNum);
            } else {
                //add day
                $('#day'+dayNum).addClass("selectedBorder");
                if(!daysSelected.includes(dayNum)){
                    daysSelected.push(dayNum)
                    //console.log("adding day"+dayNum)
                }
                //console.log("ADDED DAY"+dayNum);
            }
            //console.log(daysSelected);

        }
        //generate buttons for days of week
        const makeButtonArray = (data=null) => {

            let days = [];
            if (data == null){
                //if creating new
                for(var i=0;i<7;i++){
                    let dayNum = i;
                    let formattedDay = moment( moment().day(i) ).format("ddd");
                    days.push(
                        <div key={i} id={"day"+i} className={"dayButton"} onClick={()=>{selectDay(dayNum)}}>{formattedDay}</div>
                    );
                }
            } else {
                //if there are days selected from db
                for(var i=0;i<7;i++){
                    formattedDay = moment( moment().day(i) ).format("ddd");
                    let isSelected = "";
                    if (daysSelected.includes(i)){
                        isSelected="selectedBorder"
                    }
                    days.push(
                        <div key={i} id={"day"+i} className={"dayButton "+isSelected} onClick={()=>{selectDay(i)}}>{formattedDay}</div>
                    );
                }
            }
            return days;
        }
        if (data == null){
            return (
                <div id="editTimeContainer">
                    <input id="TimeStart" type="datetime-local" className="" placeholder="startTime"/>
                    <input id="TimeEnd" type="datetime-local" className="" placeholder="endTime"/>
                    { makeButtonArray() }
                    {/*<p>Number of weeks to repeat (OR DOES REPEAT?)</p>*/}
                    {/*put a drop down with function here ON HOLD FOR NOW*/}
                </div>
            );
        } else {
            let defaultStart = results[0].Times.StartTime;
            let defaultEnd = results[0].Times.StopTime;
            return (
                <div id="editTimeContainer">
                    <p>Start Time</p>
                    <input id="TimeStart" type="datetime-local" className="" defaultValue={moment(defaultStart, 'X').format('YYYY[-]MM[-]DD[T]HH[:]mm')}/>
                    <p>End Time</p>
                    <input id="TimeEnd" type="datetime-local" className="" defaultValue={moment(defaultEnd, 'X').format('YYYY[-]MM[-]DD[T]HH[:]mm')}/>
                    { makeButtonArray(data) }
                    {/*<p>Number of weeks to repeat (OR DOES REPEAT?)</p>*/}
                    {/*put a drop down with function here ON HOLD FOR NOW*/}
                </div>
            );
        }

    }

    const getOtherData = (data=null) => {
        const renderSoundList = (sound="Work") => {
            return(
                <p>placeholder</p>
            )
        }
        return (
            <div id="editOtherContainer">
                { renderSoundList("Work") }
            </div>
        );
    }
    //whole form
    const getData = (data=null) => {

        return(
            <div id="editContainer">
                {getInfoData(data)}
                {getDateData(data)}
                {/*{getOtherData(data)}*/}
                <button id="saveValuesBtn" className="" onClick={()=>{ seeNewTime(data) }}>
                    {(data==null) ? "Create" : "Save"}
                </button>
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

        //console.log(redirectToOverview);
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
    //console.log(item);
    //console.log(results);
    return (
       <div id="editPage">
        <h1>Add or Edit Event</h1>
            {/*<Helmet>
                <title>Edit / Update</title>
            </Helmet>*/}
            {/*conditionals for if its an edit or create event type page.*/}
            {/*<Header />*/}
            {(results==null) ? getData() : getData(item)}
            <button onClick={()=>{setRedirectToCalendar(true)}}>Back to Calendar</button>
            {/*<Footer />*/}
       </div>
    );
}
export default Edit

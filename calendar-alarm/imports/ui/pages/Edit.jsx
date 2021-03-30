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

    let eventID = props.eventID;

    const [redirectToOverview, setRedirectToOverview] = useState(false);
    const [redirectToCalendar, setRedirectToCalendar] = useState(false);
    //let redirectToOverview = false;


    if (firstRender){
        let allLocalStorage = allStorage();
        //console.log("getting information...");
        if (location.state.from=="addEvent"){
            //this is a new event. set defaults here
        } else if (location.state.from=="existingEvent"){
            //gather defaults from existing event
            results = allLocalStorage.filter(item => item.EventID.toString() === eventID.toString());
            //waits for results to get populated.
            if (results.length>0){
                item = JSON.stringify(results[0])
                daysSelected = results[0].Times.Days;
            }

        } else {
            console.error("something went horribly wrong");
        }
        firstRender=false;
    }
    function allStorage() {
        var storageArray = [];
        keys = Object.keys(localStorage);
        i = keys.length;
        while ( i-- ) {
            keyName = keys[i];
            var data = localStorage.getItem(keyName);
            if (data) {
                dataParsed = JSON.parse(data);
                //dataParsed["keyName"] = keyName;
                storageArray.push( dataParsed );
            }
        }
        return storageArray;
    }
    /*
    useEffect(()=>{
        //check days selected in here?
        return function cleanup() {
            location = useLocation();
            daysSelected = [];
            results = null;
            item=undefined;
            firstRender = true;
            eventID = props.eventID;
            setRedirectToOverview(false);
            setRedirectToCalendar(false);
        };
    });
    */
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
        var startTime = parseInt(moment($('#TimeStart').val(), 'HH:mm').format('X'))
        var stopTime = parseInt(moment($('#TimeEnd').val(), 'HH:mm').format('X'))
        var days = [];
        let d=7;
        while (d--){
            if ($('#day'+d).hasClass("selectedBorder")){
                days.push( d );
                //console.log("pushed day: "+d);
            }
        }
        days = days.sort((d1,d2)=>d1-d2);
        //var days = daysSelected;
        if (days.length==0){
            // days.push(parseInt(moment($('#TimeStart').val()).format('d')))
            days.push(moment().day())
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
            var dataToInsert = {
                EventID:eventID,
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
            }
            CalendarCollectionAccess.insert(dataToInsert);
            localStorage.setItem(eventID, JSON.stringify(dataToInsert, null, '\t'));

        } else {
            //console.log('attempting to update')
            var repeat = results[0].Times.DoesRepeat;
            var soundName = results[0].AlarmDetails.Sound;
            var soundFileLocation = results[0].AlarmDetails.SoundFile;
            //perhaps change this type or how it's stored
            var notifications = results[0].AlarmDetails.Notifications;
            var description = results[0].Details.Description;

            var databaseUpdate = {
                    EventID:eventID,
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
                }

            CalendarCollectionAccess.find({EventID:props.eventID}).fetch().map((currentItem) => {
                CalendarCollectionAccess.update({_id:currentItem._id},{$set:databaseUpdate});
            });
            localStorage.setItem(eventID, JSON.stringify(databaseUpdate, null, '\t'));
        }
        setRedirectToOverview(true);
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
                    <input id="eventAddress" type="text" className="" placeholder="Event Address"/>
                    { renderCategories("Event Theme") }
                </div>
            );
        } else {
            return (
                <div id="editInfoContainer">
                    <input id="eventName" type="text" className="" defaultValue={results[0].Details.Name}/>
                    <input id="eventAddress" type="text" className="" defaultValue={results[0].Details.Address} />
                    { renderCategories(results[0].Details.Theme.toString()) }
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
            } else {
                //add day
                $('#day'+dayNum).addClass("selectedBorder");
                if(!daysSelected.includes(dayNum)){
                    daysSelected.push(dayNum)
                }
            }

        }
        //generate buttons for days of week
        const makeButtonArray = (data=null) => {

            let days = [];
            if (data == null){
                //if creating new
                for(var i=0;i<7;i++){
                    let dayNum = i;
                    let formattedDay = moment( moment().day(i) ).format("dd");
                    let isSelected = "";
                    days.push(                          /*should fix:  v  added space*/
                        <div key={i} id={"day"+i} className={"dayButton "+isSelected} onClick={()=>{selectDay(dayNum)}}>{formattedDay}</div>
                    );
                }
            } else {
                //if there are days selected from db
                for(var i=0;i<7;i++){
                    let dayNum=i;
                    formattedDay = moment( moment().day(i) ).format("dd");
                    let isSelected = "";
                    if (results[0].Times.Days.includes(i)){
                        isSelected="selectedBorder"
                    }
                    days.push(
                        <div key={i} id={"day"+i} className={"dayButton "+isSelected} onClick={()=>{selectDay(dayNum)}}>{formattedDay}</div>
                    );
                }
            }
            return(
                <div id="button_array">
                    {days}
                </div>
            );
        }
        if (data == null){
            return (
                <div id="editTimeContainer">
                    <p>Start Time</p>
                    <input id="TimeStart" type="time" className="" placeholder="startTime" defaultValue={moment().format('HH[:]mm')}/>
                    {/*<input id="TimeStart" type="datetime-local" className="" placeholder="startTime" defaultValue={moment().format('YYYY[-]MM[-]DD[T]HH[:]mm')}/>*/}
                    <p>End Time</p>
                    <input id="TimeEnd" type="time" className="" placeholder="endTime" defaultValue={moment().format('HH[:]mm')}/>
                    {/*<input id="TimeEnd" type="datetime-local" className="" placeholder="endTime" defaultValue={moment().format('YYYY[-]MM[-]DD[T]HH[:]mm')}/>*/}

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
                    <input id="TimeStart" type="time" className="" defaultValue={moment(defaultStart, 'X').format('HH[:]mm')}/>
                    {/*<input id="TimeStart" type="datetime-local" className="" defaultValue={moment(defaultStart, 'X').format('YYYY[-]MM[-]DD[T]HH[:]mm')}/>*/}
                    <p>End Time</p>
                    <input id="TimeEnd" type="time" className="" defaultValue={moment(defaultEnd, 'X').format('HH[:]mm')}/>
                    {/*<input id="TimeEnd" type="datetime-local" className="" defaultValue={moment(defaultEnd, 'X').format('YYYY[-]MM[-]DD[T]HH[:]mm')}/>*/}
                    { makeButtonArray(data) }
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
    const getData = (data=null) => {

        return(
            <div id="editContainer">
                {getInfoData(data)}
                {getDateData(data)}

                <div id="button_container">
                    <button id="saveValuesBtn" className="" onClick={()=>{ seeNewTime(data) }}>
                        {(data==null) ? "Create" : "Save"}
                    </button>
                    <button onClick={()=>{setRedirectToCalendar(true)}} id="backToCalendar">Back to Calendar</button>
                </div>
            </div>
        );
    }

    if (redirectToOverview){
        return(
            <Redirect to={{
                pathname:"/overview/"+eventID,
                state:{
                    eventID:eventID,
                    from:"edit"
                }
            }}/>
        );

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

    return (
       <div id="editPage">
        <h1>{(results == null || results==undefined) ? "Add" : (results.length==0) ? "Add":"Edit"} Event</h1>
            {(results == null || results==undefined) ? getData(null) : (results.length==0) ? getData(null):getData(item)}
       </div>
    );
}
export default Edit

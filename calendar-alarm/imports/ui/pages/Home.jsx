// Modules
import React, { useState } from 'react';
import {NavLink, Link, Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import moment from 'moment';
// import CalendarCollectionAccess from './../../lib/calData.js';
import NavButton from './../components/NavButton.jsx';
// import {  } from "react-router";

// Components
// import Header from './../components/Header.js';
// import Footer from './../components/Footer.js';
const ListDailyEvents = (props) => {
    let today = moment().day();
    const listItem = (itemData) => {
        if (itemData){
            let formatStart = moment(itemData.Times.StartTime, 'X').format('h:mm a');
            return(
                itemData.Details.Name+" at "+formatStart
            );
        }
    }
    let dayItems = props.allLocalStorage.filter(item => {
        return(
            item.Times.Days.includes(today)
        )
    } );
    return(
        <ul>
            {props.allLocalStorage.length==0
                ? <li>No items for today</li>
                : dayItems.map((item)=>
                    <li key={item.eventID}>{listItem(item)}</li>
                )
            }
        </ul>
    );
}
const HomePage = (props) => {


//     const renderEvents = function (passed_posts) {
//   console.log(passed_posts);
//   let formattedPosts = passed_posts.map(function(post){
//     return <li key={events._id}>{events.Details.name} {events.Times.StartTime}-{events.Times.StopTime}</li>;
//   });
//
//   return formattedPosts;
// };
    //const allPostsInDB = CalendarCollectionAccess.find().fetch();
    const getUnixSec = () =>{
        const ESTCurrentTimeFix = 18000000;
        let date = new Date();
        return (date.getTime()+ESTCurrentTimeFix);
    };

    const redirectToCal=()=>{
        return(
            <Redirect to={{
                pathname:"/calendar/",
                state:{
                    from:"home"
                }
            }}/>
        );
    };
  //Needs to route to Calendar.jsx
    return(
        <div id="homePage">
            <h1>{moment(getUnixSec()).format('dddd, MMMM Do')}</h1>
            <div id="dailyEvents">
                <h2>Today's Events</h2>
                <ListDailyEvents {...props}/>

            </div>
            <NavButton id="continue" to_pathname="/calendar" to_state={{from:"home"}} text="Continue" />
        </div>
    );
}
export default HomePage;

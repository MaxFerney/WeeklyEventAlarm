// Modules
import React, { useState } from 'react';
import {NavLink, Link} from "react-router-dom";
import PropTypes from 'prop-types';
// import {  } from "react-router";

// Components
// import Header from './../components/Header.js';
// import Footer from './../components/Footer.js';

const HomePage = (props) => {

  function getDay(){
    let date = new Date();
    let day=date.getDay();
    switch (day){
        case 1:{
            day="Monday";
            break;
        }
        case 2:{
            day="Tuesday";
            break;
        }
        case 3:{
            day="Wednesday";
            break;
        }
        case 4:{
            day="Thursday";
            break;
        }
        case 5:{
            day="Friday";
            break;
        }
        case 6:{
            day="Saturday";
            break;
        }
        case 0:{
            day="Sunday";
            break;
        }
    }

    return day;
  }
  function getDate(){
      let date = new Date();
      let dateOfMonth=date.getDate();
      return dateOfMonth;
  }
  function getMonth(){
      let date = new Date();
      let month=date.getMonth();
      switch(month){
          case 0:{
              month="January";
              break;
          }
          case 1:{
              month="Febuary";
              break;
          }
          case 2:{
              month="March";
              break;
          }
          case 3:{
              month="April";
              break;
          }
          case 4:{
              month="May";
              break;
          }
          case 5:{
              month="June";
              break;
          }
          case 6:{
              month="July";
              break;
          }
          case 7:{
              month="August";
              break;
          }
          case 8:{
              month="September";
              break;
          }
          case 9:{
              month="October";
              break;
          }
          case 10:{
              month="November";
              break;
          }
          case 11:{
              month="December";
              break;
          }
      }
      return month;
  }
  //Needs to route to Calendar.jsx
    return(
        <div id="homePage">
            <h1>{getDay()},{getMonth()} {getDate()}</h1>
            <div id="dailyEvents">
                <h2>Today's Events</h2>
                <ul>
                    <li>test event</li>
                    <li>test event</li>
                    <li>test event</li>
                </ul>
            </div>
            <button>Continue</button>
        </div>
    );
}
export default HomePage;

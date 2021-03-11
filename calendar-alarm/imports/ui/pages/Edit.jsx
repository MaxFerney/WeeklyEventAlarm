// Modules
import React, { useState } from 'react';
import {NavLink, Link} from "react-router-dom";
import PropTypes from 'prop-types';
import NavButton from './../components/NavButton.jsx';
// import {  } from "react-router";

// Components
// import Header from './../components/Header.js';
// import Footer from './../components/Footer.js';

const Edit = (props) => {
    //Stubbed out variables to edit later
    let currentEvent="Replace this event";
    let eventTime="Replace this time";
    let commute=0;
  //Needs to route to Calendar.jsx
    return(
        <div id="editPage">
            <form action="">
                <input type="text" name="name" value="Name"/>
                <input type="address" name="address" value="Address"/>
                <input type="theme" name="theme" value="Theme"/>
                <label for="startTime">
                <input type="time" name="startTime"/>
                <label for="endTime">
                <input type="time" name="endTime"/>
                <input type="select" name="repeatWeeks" value="Number of weeks to repeat"/>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <input type="submit" value="submit">
            </form>
        </div>
    );
}
export default Edit;

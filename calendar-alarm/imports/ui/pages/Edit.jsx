import React, { useState, useEffect } from 'react';
// import {Helmet} from "react-helmet";
import PropTypes from 'prop-types';
import moment from 'moment';
//import { useParams } from 'react-router-dom';

import { useParams, useHistory, Redirect, BrowserRouter as Router, Route, NavLink } from "react-router-dom";

// import Footer from './../components/footer.jsx';
// import Header from './../components/header.jsx';
// import TimeList from './TimeList.jsx';

import { CalendarCollectionAccess } from './../../../lib/calData.js';

export default class Edit extends React.Component{

    renderCategories(default_category="Work"){
        var mappedCategories = this.props.categories.map((category) => {
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
    seeNewTime() {
        var startTime = parseInt(moment($('#newTimeStart').val()).format('X'));
        var stopTime = parseInt(moment($('#newTimeEnd').val()).format('X'));
        var category = $('#categorySelection').val();

        CalendarCollectionAccess.insert({
            start_time: startTime,
            stop_time: stopTime,
            category: category,
            is_active: false
        });
            alert('New Time Added!')
    }

    getInfoData() {
        return (
            <div id="editInfoContainer">
                <p>Name</p>
                <input id="eventName" type="text" class=""/>
                <p>Event Theme</p>
                { this.renderCategories("Work") }
                <p>Event Address</p>
                <input id="eventName" type="text" class=""/>
            </div>
        );
    }

    getDateData() {
        return (
            <div id="editTimeContainer">
                <p>Start Time</p>
                <input id="newTimeStart" type="datetime-local" class=""/>
                <p>End Time</p>
                <input id="newTimeEnd" type="datetime-local" class=""/>
                <p>Category</p>
                { this.renderCategories("Work") }
                <br/>
                <button id="saveValuesBtn" class="greenBG" onClick={ () => this.seeNewTime() }>
                    Save
                </button>
            </div>
        );
    }

    getOtherData() {
        return (
            <div id="editOtherContainer">
                <h2 id="addNewTimeHeader">Add New Time</h2>
                <p>Start Time</p>
                <input id="newTimeStart" type="datetime-local" class="tanBG"/>
                <p>End Time</p>
                <input id="newTimeEnd" type="datetime-local" class="tanBG"/>
                <p>Category</p>
                { this.renderCategories("Work") }
                <br/>
                <button id="saveValuesBtn" class="greenBG" onClick={ () => this.seeNewTime() }>
                    Save
                </button>
            </div>
        );
    }
    //whole form
    getData(){
        return(
            <div id="editContainer">
                {this.getInfoData()}
                {this.getDateData()}
                {this.getOtherData()}
            </div>
        );
    }

    render(){
        return (
           <div id="editPage">
                {/*<Helmet>
                    <title>Edit / Update</title>
                </Helmet>*/}
                {/*conditionals for if its an edit or create event type page.*/}
                {/*<Header />*/}
                {this.getData()}
                {/*<Footer />*/}
           </div>
        );
    }
}

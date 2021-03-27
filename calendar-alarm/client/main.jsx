import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import App from './../imports/ui/App.jsx';
import { CalendarCollectionAccess } from '../lib/calData.js'
import PropTypes from 'prop-types';

Meteor.startup(() => {
    function alertDismissed(){
        console.log("i've been dismissed");
    }
    function allStorage() {
        var archive = {}, // Notice change here
            keys = Object.keys(localStorage);
            i = keys.length;

        while ( i-- ) {
            archive[ keys[i] ] = localStorage.getItem( keys[i] );
        }

        return archive;
    }
    Tracker.autorun(()=>{
        console.log(CalendarCollectionAccess.find().fetch());
        const allCalendarItems = CalendarCollectionAccess.find().fetch();
        const props = {
            allCalendarItems:allCalendarItems,
            allLocalStorage:allLocalStorage
        };

        localStorage.setItem('myKey2', JSON.stringify({ my: 'data2' }))


        console.log(allCalendarItems);
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log(JSON.stringify(navigator.notification)); //empty object
        //navigator.notification.alert("hello world", alertDismissed, 'some title', 'a button');
        console.log(navigator.localStorage); //undefined
        console.log(window.localStorage); //object object
        console.log(localStorage); //object object
        console.log("#####################################################");
        var data = localStorage.getItem('myKey')
        if (data) {
            data = JSON.parse(data)
            console.log(data.my);
        }


        const allLocalStorage = allStorage();
        console.log(JSON.stringify(allLocalStorage));
        console.log(allLocalStorage);
        console.log("#####################################################");

        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");
        ReactDOM.render(<App {...props}/>, document.getElementById('react-target'));
    });

});

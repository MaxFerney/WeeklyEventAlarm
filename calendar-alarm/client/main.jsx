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
    Tracker.autorun(()=>{
        console.log(CalendarCollectionAccess.find().fetch());
        const allCalendarItems = CalendarCollectionAccess.find().fetch();
        const props = {
            allCalendarItems:allCalendarItems
        };
        console.log(allCalendarItems);
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log(JSON.stringify(navigator.notification));
        //navigator.notification.alert("hello world", alertDismissed, 'some title', 'a button');
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");
        ReactDOM.render(<App {...props}/>, document.getElementById('react-target'));
    });

});

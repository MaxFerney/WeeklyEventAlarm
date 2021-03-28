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
        var storageArray = [{}];
        keys = Object.keys(localStorage);
        i = keys.length;
        while ( i-- ) {
            keyName = keys[i];
            var data = localStorage.getItem(keyName);
            if (data) {
                dataParsed = JSON.parse(data);
                dataParsed["keyName"] = keyName;
                storageArray.push( dataParsed );
            }
        }
        return storageArray;
    }
    //if doing a refresh on localStorage
    //localStorage.clear();
    Tracker.autorun(()=>{
        console.log(CalendarCollectionAccess.find().fetch());
        const allCalendarItems = CalendarCollectionAccess.find().fetch();

        console.log(allCalendarItems);

        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log(JSON.stringify(navigator.notification)); //empty object
        console.log(navigator.localStorage); //undefined
        console.log(window.localStorage); //object object
        console.log(localStorage); //object storage
        console.log("#####################################################");
        // var data = localStorage.getItem('myKey')
        // if (data) {
        //     data = JSON.parse(data);
        //     console.log(data.my);
        // }

        //localStorage.setItem('myKey2', JSON.stringify({ my: 'data2' }))


        let allLocalStorage = allStorage();

        console.log("#####################################################");

        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");

        const props = {
            allCalendarItems:allCalendarItems,
            allLocalStorage:allLocalStorage
        };
        ReactDOM.render(<App {...props}/>, document.getElementById('react-target'));
    });

});

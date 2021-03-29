import React, { useState } from 'react';
import {
    Router,
    Switch,
    Route,
    NavLink,
    Redirect,
    useParams,
    useRouteMatch,
    useHistory,
    useLocation,
    withRouter
} from "react-router-dom";
import PropTypes from 'prop-types';
import { createBrowserHistory } from "history";
import moment from 'moment';
import { CalendarCollectionAccess } from './../../lib/calData.js';

const customHistory = createBrowserHistory();

//ROUTED PAGES
import HomePage from './pages/Home.jsx';
import EventOverview from './pages/EventOverview.jsx';
import Edit from './pages/Edit.jsx';
import Calendar from './pages/Calendar.jsx';
import AlarmPage from './pages/AlarmPage.jsx';

//constants and functions
const allCategories = [
    'Home',
    'Work',
    'School',
    'Vacation'
];


//Rendering and Routing Components
function OverviewRouter(props) {
    let { id } = useParams();
    let location = useLocation();
    return <EventOverview {...props} categories={allCategories} eventID={id} location={location} />
}
function EditRouter(props) {
    let { id } = useParams();
    let location = useLocation();
    return <Edit {...props} categories={allCategories} eventID={id} location={location} />
}

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            date: new Date(),
            theme: 'Vacation',
            nextEvent: undefined,
            futureTimes: [],
            allLocalStorage: this.props.allLocalStorage,
        };
    }

    /*INTERNAL FUNCTIONS*/
    unixToToday(unixTime){
        return moment( moment(unixTime, 'X').format('h:mm:ss a'), 'h:mm:ss a').format('X');
    }
    getNextEvent(timesInFuture){
        if (timesInFuture.length>0){
            if (timesInFuture[0]!=null && timesInFuture[0]!=undefined)
            {
                return timesInFuture[0];
            }
        } else {
            return undefined;
        }
    }
    getFutureTimes(){
        let allStartTimes = this.state.allLocalStorage
            .filter(item => item.Times.Days.includes( moment().day() ) )
            .sort((t1,t2)=> this.unixToToday(t1.Times.StartTime) - this.unixToToday(t2.Times.StartTime))
            .map((item)=>{
                timeNow = moment().format('X');
                //if (now sorted..) time is in the future
                if (this.unixToToday(item.Times.StartTime)-timeNow > 0){
                    //console.log(JSON.stringify(item));
                    return item;
                }
            });
        //remove all nulls (aka past times)
        allStartTimesFiltered = allStartTimes.filter(item=>item!=null);

        return allStartTimesFiltered;
    }
    onConfirm(buttonIndex){
        //could make this a follow up prompt.
        let returnString = (
            "You selected button number " + buttonIndex + "\nyou selected: "+(buttonIndex==1?"OK":"Snooze")
        )
        alert(returnString);
    }
    allStorage() {
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
    /*INTERNAL FUNCTIONS*/

    componentDidMount(){

        /*Theme for next event*/
        let nextEvent = this.getNextEvent(this.getFutureTimes());
        if (nextEvent!=undefined){
            this.setState({
                theme: nextEvent.Details.Theme,
                nextEvent: nextEvent,
                futureTimes:this.getFutureTimes()
            });
        } else {
            this.setState({theme: 'Vacation' });
        }


        this.timerID = setInterval(
            () => this.tick(),//PLEASE SET PARENTHESIS HERE TO ENABLE TIMER
            1000
        );
    }
    componentWillUnmount() {
        this.state={
            date: new Date(),
            theme: 'Vacation',
            nextEvent: undefined,
            futureTimes: [],
        };
        clearInterval(this.timerID);
    }

    //anything that happens here gets checked every [setInterval] milliseconds
    tick() {


        /*Updating Next Events*/
        let nextEvent = this.getNextEvent(this.getFutureTimes());
        if (nextEvent!=undefined){
            this.setState({
                theme: nextEvent.Details.Theme,
                nextEvent: nextEvent,
                futureTimes:this.getFutureTimes()
            });
        } else {this.setState({theme: 'Vacation' });}



        /*Setting Background CSS*/
        if(this.state.theme=='Vacation'){
            $('body, html').css({
                'background-image': 'url("/images/Travel_Background.jpg")'
            });
        } else {
            $('body, html').css({
                'background-image':'url("/images/'+this.state.theme+'_Background.jpg")'
            });
        }



        /*Check Time - Do Alarm*/
        results = this.state.allLocalStorage
            .filter(item => true)
            .map((eventItem)=>{

                let today = moment().day();
                let uniNow = moment().format('X');
                let title= eventItem.Details.Name;
                let message = eventItem.Details.Address;

                //if an event occurs today
                if (eventItem.Times.Days.includes(today)){
                    //console.log("there's an event today!");

                    //if theres an event now, do one type of ping
                    eventItem.Times.StartTime
                    if (this.unixToToday(eventItem.Times.StartTime) == uniNow) {
                        console.log("ITS NOW!!!!");
                        //prompt not appearing in background, but sound is
                        //2 content lines MAX
                        //3 buttons MAX
                        navigator.notification.confirm(
                            message,
                            this.onConfirm,
                            title+" Starts Now!",
                            ['OK', 'Snooze']);
                        navigator.notification.beep(2);
                    }

                    //if theres an event in CONST minutes, then another type of ping

                }
            });



        /*State Updates*/
        this.setState({
            date: new Date(),
            allLocalStorage:this.allStorage()
        });

    }
    renderRoute(props){
        //console.log("I've been ticked off!!");
        return(
            <Router history={customHistory}>
                <Switch>
                    <Route
                        key="home"
                        path="/"
                        exact>
                        <HomePage {...this.props} allLocalStorage={this.state.allLocalStorage}/>
                    </Route>
                    <Route
                        key="calendar"
                        path="/calendar"
                        exact>
                        <Calendar {...this.props} allLocalStorage={this.state.allLocalStorage}/>
                    </Route>
                    <Route
                        key="edit"
                        path="/edit/:id"
                        exact>
                        <EditRouter {...this.props}/>
                    </Route>
                    {<Route
                        key="overview"
                        path="/overview/:id"
                        exact>
                        <OverviewRouter {...this.props} allLocalStorage={this.state.allLocalStorage}/>
                    </Route>}
                    <Route
                        key="alarmpage"
                        path="/alarm"
                        exact>
                        <AlarmPage {...this.props} allLocalStorage={this.state.allLocalStorage}/>
                    </Route>

                </Switch>
            </Router>
        );
    }
    render(){
        return(
            <>
                {this.renderRoute(this.state.date)}
            </>

        );
    }
}

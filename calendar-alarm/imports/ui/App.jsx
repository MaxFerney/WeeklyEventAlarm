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
            date: new Date()
        };
    }
    componentDidMount(){
        this.timerID = setInterval(
            () => this.tick(),//PLEASE SET PARENTHESIS HERE TO ENABLE TIMER
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    onConfirm(buttonIndex){
        //could make this a follow up prompt.
        let returnString = (
            "You selected button number " + buttonIndex + "\nyou selected: "+(buttonIndex==1?"OK":"Snooze")
        )
        alert(returnString);
    }
    //anything that happens here gets checked every [setInterval] milliseconds
    tick() {
        //background = all items times - now = smallest = theme
        results = this.props.allLocalStorage.filter(item => true);
        results.map((eventItem)=>{

            let today = moment().day();
            let uniNow = moment().format('X');
            let title= eventItem.Details.Name;
            let message="It will take some time to get to "+eventItem.Details.Address;

            //if an event occurs today
            if (eventItem.Times.Days.includes(today)){
                //console.log("there's an event today!");

                //if theres an event now, do one type of ping
                if (eventItem.Times.StartTime == uniNow) {
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
        })
        this.setState({
            date: new Date()
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
                        <HomePage {...this.props}/>
                    </Route>
                    <Route
                        key="calendar"
                        path="/calendar"
                        exact>
                        <Calendar {...this.props}/>
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
                        <OverviewRouter {...this.props}/>
                    </Route>}
                    <Route
                        key="alarmpage"
                        path="/alarm"
                        exact>
                        <AlarmPage {...this.props}/>
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

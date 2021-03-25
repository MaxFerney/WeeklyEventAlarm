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

import { CalendarCollectionAccess } from './../../lib/calData.js';

const customHistory = createBrowserHistory();

//ROUTED PAGES
import HomePage from './pages/Home.jsx';
import EventOverview from './pages/EventOverview.jsx';
import Edit from './pages/Edit.jsx';
import Calendar from './pages/Calendar.jsx';
import AlarmPage from './pages/AlarmPage.jsx';

const allCategories = [
    'Home',
    'Work',
    'School',
    'Vacation'
];

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
            //date: new Date(),
            allCalendarItems:[],
        };
    }
    componentDidMount(){
        //CALL DATA HERE!!!!!
        let fetchCalendarItems = async () =>{
            Meteor.call(`getAllData`, (results, error)=>{
                console.log(results);
                let allCalendarItems = [];
                console.log("++++++++++++++++++****************%%$$$##");
                console.log(allCalendarItems);
                allCalendarItems = results;
                this.setState({
                    allCalendarItems
                });
            });
        };
        fetchCalendarItems();
        /*
        this.timerID = setInterval(
            ()=> this.tick, 500
        );
        */
    }
    /*
    componentDidUpdate(prevProps, prevState) {
        // Typical usage (don't forget to compare props):
        if (this.props.userID !== prevProps.userID) {
            this.fetchData(this.props.userID);
        }
    }
    */
    componentWillUnmount() {
        clearInterval(this.timerID);
        this.setState({
            //date: new Date(),
            allCalendarItems:[],
        });
    }

    // tick() {
    //     this.setState({
    //         date: new Date()
    //     });
    // }
    renderRoute(props){
        if (props.allCalendarItems==undefined){
            props={allCalendarItems:[]}
        }
        return(
            <Router history={customHistory}>
                <Switch>
                    <Route
                        key="home"
                        path="/"
                        exact>
                        <HomePage {...props}/>
                    </Route>
                    <Route
                        key="calendar"
                        path="/calendar"
                        exact>
                        <Calendar {...props}/>
                    </Route>
                    <Route
                        key="edit"
                        path="/edit/:id"
                        exact>
                        <EditRouter {...props}/>
                    </Route>
                    {<Route
                        key="overview"
                        path="/overview/:id"
                        exact>
                        <OverviewRouter {...props}/>
                    </Route>}
                    <Route
                        key="alarmpage"
                        path="/alarm"
                        exact>
                        <AlarmPage {...props}/>
                    </Route>

                </Switch>
            </Router>
        );
    }
    render(){
        return(
            <>
                {this.renderRoute(this.state.allCalendarItems)}
            </>
        );
    }
}

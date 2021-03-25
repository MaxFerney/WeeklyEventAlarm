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
            date: new Date()
        };
    }
    componentDidMount(){
        this.timerID = setInterval(
            () => this.tick,//PLEASE SET PARENTHESIS HERE TO ENABLE TIMER 
            500
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        console.log("this is a tick!");
        this.setState({
            date: new Date()
        });

    }
    renderRoute(props){
        console.log("I've been ticked off!!");
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

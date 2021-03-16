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
    return <EventOverview {...props} categories={allCategories} eventID={id} />
}
function EditRouter(props) {
    let { id } = useParams();
    return <EventOverview {...props} categories={allCategories} eventID={id} />
}
export default class App extends React.Component{
    render(){
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
}

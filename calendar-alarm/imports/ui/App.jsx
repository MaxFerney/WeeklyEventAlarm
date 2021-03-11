import React from 'react';
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

const customHistory = createBrowserHistory();

//ROUTED PAGES
import HomePage from './pages/Home.jsx';
// import EventDescription from './pages/EventDescription.jsx';
// import Edit from './pages/Edit.jsx';
import Calendar from './pages/Calendar.jsx';
import AlarmPage from './pages/AlarmPage.jsx';

export default class App extends React.Component{
    render(){
        return(
            <Router history={customHistory}>
                <Switch>
                    <Route
                        key="home"
                        path="/"
                        exact>
                        <HomePage/>
                    </Route>
                    <Route
                        key="calendar"
                        path="/calendar"
                        exact>
                        <Calendar/>
                    </Route>
                    {/*<Route
                        key="edit"
                        path="/edit"
                        exact>
                        <Edit/>
                    </Route>*/}
                    {/*<Route
                        key="description"
                        path="/description"
                        exact>
                        <EventDescription/>
                    </Route>*/}
                    <Route
                        key="alarmpage"
                        path="/alarm"
                        exact>
                        <AlarmPage/>
                    </Route>

                </Switch>
            </Router>
        );
    }
}

import React from 'react';
import {
    Router,
    Switch,
    Route,
    NavLink,
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
                </Switch>
            </Router>
        );
    }
}

import React, { useState } from 'react';
import {NavLink, Link, Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import moment from 'moment';

import NavButton from './../components/NavButton.jsx';


const YouHaveArrived=(props)=>{
    return(
            <div id="ArrivedPage">
                <div id="good">
                    <img src="/images/check.png" alt="check mark">
                    <p>Youre all set! You made it to your event on time!</p>
                </div>
                <NavButton id="backToEvents" to_pathname="/calendar" text="BACK TO EVENTS" />
            </div>
    );
}
export default YouHaveArrived;

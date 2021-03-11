import React from 'react';
import {NavLink} from "react-router-dom";
import PropTypes from 'prop-types';

export default class NavButton extends React.Component{
    render(){
        return(
            <NavLink
                id={this.props.id}
                className="NavButton button"
                to={{
                    pathname:this.props.to_pathname,
                    state:this.props.to_state
                }}>
                {this.props.text}
            </NavLink>
        );
    }
}
NavButton.propTypes = {
    id: PropTypes.string.isRequired, //id string
    to_pathname: PropTypes.string.isRequired, //location on click
    to_state: PropTypes.object.isRequired, //state variables to send
    text: PropTypes.string.isRequired //button text
};

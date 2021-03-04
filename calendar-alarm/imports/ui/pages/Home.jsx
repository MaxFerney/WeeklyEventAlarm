// Modules
import React, { useState } from 'react';
import {NavLink, Link, withRouter, useLocation} from "react-router-dom";
import PropTypes from 'prop-types';
// import {  } from "react-router";

// Components
// import Header from './../components/Header.js';
// import Footer from './../components/Footer.js';

const Home = (props) => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <button onClick={increment}>Click Me</button>
      <p>You've pressed the button {counter} times.</p>
    </div>
  );
};
export default Home

import React from 'react';
import '../styles/header.css';
import {Jumbotron} from 'react-bootstrap';

const Header = props => {
  return(
   <div className="header">
    <Jumbotron>
      <h1 className="title">LARRYBOOK</h1>
    </Jumbotron>
   </div>
  )
 }

export default Header;

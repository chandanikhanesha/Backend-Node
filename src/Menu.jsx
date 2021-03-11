import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu=()=>
{
    return (
        <>
        <div className="header">
    <NavLink className="menu" exact to="/">Note  </NavLink>
    <NavLink className="menu" exact to="/contact">contactus  </NavLink>
    <NavLink className="menu"  excat to="/contact/name">name </NavLink>
    <NavLink className="menu" excat to="/user/chandani/khanesha">user </NavLink>
    <NavLink  className="menu" excat to="/serch">serch</NavLink>
    </div>
    </>
    
    );
};

export default Menu;
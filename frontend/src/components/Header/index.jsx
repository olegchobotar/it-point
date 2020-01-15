import React from 'react';
import { Link } from "react-router-dom";
import './styles.css';
import logo from '../../assets/logo.png';

export default function (props) {
    return (
        <div className="wrapper">
            <div className="content">
                <img className="logo" src={logo} alt=""/>
                <div className="actions">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/users">Users</Link>
                            </li>
                            <li>
                                <Link to="/sign-in">Sign In</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

import React from 'react'
import { Link } from 'react-router-dom'

import Copyright from '../Copyright/Copyright'

import './Footer.css'

const Footer = props => (
    <footer>
        <nav>
            <ul>
                <li><Link to="/privacy-policy">Privacy</Link></li>
                <li><Link to="/terms-of-use">Terms</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
        <div className="copyright">
            <Copyright />
        </div>
        </footer>
)

export default Footer
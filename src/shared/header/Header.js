import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
      <div className="topnav">
        <span>
          <Link to="/" className="top-format">Movie</Link>
        </span>
        <span>
          <Link to="/tvSeries" className="top-format">Tv-Series</Link>
        </span>
        <span>
          <Link to="/actors" className="top-format">Actors</Link>
        </span>
        <span>
          <Link to="/favourite" className="top-format">favourites</Link>
        </span>
        <div className="topnav-right">
          <span>
            <Link to="/signin" className="top-format">Sign in</Link>
          </span>
          <span>
            <Link to="/signup" className="top-format">Sign up</Link>
          </span>
        </div>
      </div>
    )
}
export default Header;
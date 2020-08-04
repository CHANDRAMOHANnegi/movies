import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MovieThumb.css';

const MovieThumb = (props) => {
    return (
    <div className="rmdb-moviethumb">
    {props.clickable ?
      <Link to={{pathname: `/movie/${props.movieId}`, movieName: `${props.movieName}`}}>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={props.image} alt="moviethumb" />
          </div>
          <div className="flip-card-back">
            <h2>{props.movieName}</h2>
            <p>Click for more Info</p>
          </div>
        </div>
      </div>
      </Link>
        :
        <img src={props.image} alt="moviethumb" />
      }
      </div>
    )
}

MovieThumb.propTypes = {
image:  PropTypes.string,
movieId: PropTypes.number,
movieName: PropTypes.string
}

export default MovieThumb;
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './TvThumb.css';

const TvThumb = (props) => {
    return (
    <div className="tvthumb">
      {props.clickable ?
      <Link to={{pathname: `/tvSeries/${props.tvId}`, tvName: `${props.tvName}`}}>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={props.image} alt="tvthumb" />
          </div>
          <div className="flip-card-back">
            <h1>{props.tvId}</h1> 
            <p>{props.tvName}</p>
          </div>
        </div>
      </div>
      </Link>
        :
        <img src={props.image} alt="tvthumb" />
      }
      </div>
    )
}

TvThumb.propTypes = {
image:  PropTypes.string,
tvId: PropTypes.number,
tvName: PropTypes.string
}

export default TvThumb;
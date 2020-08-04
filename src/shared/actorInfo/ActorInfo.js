import React from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../config';
import FontAwesome from 'react-fontawesome';
import ActorThumb from '../actorsThumb/ActorThumb';
import './ActorInfo.css';

const ActorInfo = (props) => {
    return (
    <div className="rmdb-movieinfo"
      style={{
        background: props.person.backdrop_path ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${props.person.known_for.backdrop_path}')` : '#FFFFFF'
      }}
      >
        <div className="rmdb-movieinfo-content">
          <div className="rmdb-movieinfo-thumb">
            <ActorThumb
            image={props.person.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${props.person.profile_path}` : 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg'}
            clickable={false}
            />
          </div>
          <div className="rmdb-movieinfo-text">
            <h1>{props.person.title}</h1>
            <h3>Plot</h3>
            <p>{props.person.biography}</p>
            <h3>IMDB Rating</h3>
            <p>{props.person.popularity}</p>
          <div className="rmdb-rating">
            <meter min="0" max="100" optimum="100" low="40" high="70" value={props.person.vote_average * 10}></meter>
            <p className="rmdb-score">{props.person.vote_average}</p>
          </div>
          {props.directors.length > 1 ? <h3>Directors</h3> : <h3>Director</h3> }
          {props.directors.map( (element, i) => {
          return <p  key={i} className="rmdb-director">{element.name}</p>
      })}
        </div>
          <FontAwesome className="fa-film" name="film" size="5x" />
        </div>
    </div>)
}

export default ActorInfo;
import React, { Component, useState } from 'react';
import MovieInfo from '../../shared/movieInfo/MovieInfo';
import MovieInfoBar from '../../shared/movieInfoBar/MovieInfoBar';
import Spinner from '../../shared/spinner/Spinner';
import CommentBox from '../../shared/commentBox/CommentBox';
import './Movie.css';
import { Button, Typography } from '@material-ui/core';
import { useEffect } from 'react';

export const MovieView = (props) => {

    const { state, addToFavourite, favourites } = props;
    console.log(props);

    let isAdded = false;

    const [added, setAdded] = useState(false);

    if (favourites && state.movie) {
        isAdded = favourites.find(mov => mov.id === state.movie.id)
    }

    useEffect(() => {
        setAdded(isAdded);
    })

    const addtoFavourite = () => {
        let newFavourites = favourites;

        if (!isAdded) {
            if (favourites)
                newFavourites.push(state.movie)
            else
                newFavourites = [state.movie];
            addToFavourite(newFavourites)
            setAdded(true)
        }
    }

    return (
        <div className="movie">
            {state.movie ?
                <div>
                    <MovieInfo movie={state.movie} directors={state.directors} />
                    <MovieInfoBar time={state.movie.runtime} budget={state.movie.budget} revenue={state.movie.revenue} />
                    <div style={{ margin: '10px' }}>
                   
                   
                   
                        {added ?
                            <Typography variant="h5" > Added to favourite</Typography>
                            : <Button variant="contained" 
                            
                            onClick={addtoFavourite}> ADD to Favourites</Button>}





                    </div>
                </div>
                : null}





            {state.loading ? <Spinner /> : null}
            <CommentBox />
        </div>
    );
}
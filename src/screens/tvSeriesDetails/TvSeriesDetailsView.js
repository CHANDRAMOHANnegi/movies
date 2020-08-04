import React, {Component} from 'react';
import { API_URL, API_KEY } from '../../config';
import TvInfo from '../../shared/tvInfo/TvInfo';
import Spinner from '../../shared/spinner/Spinner';
import CommentBox from '../../shared/commentBox/CommentBox';
import './TvSeriesDetails.css';

export const TvSeriesDetailsView = ({state})=>{
    return (
        <div className="tv">
            {state.tv ?
                <div>
                    <TvInfo tv={state.tv} directors={state.directors} />
                </div>
            : null}
            {state.loading ? <Spinner /> : null}
            <CommentBox/>
        </div>
        );
    }
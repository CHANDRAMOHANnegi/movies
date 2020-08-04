import React, { Component } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL,POSTER_SIZE, BACKDROP_SIZE } from '../../config';
import SearchBar from '../../shared/searchBar/SearchBar';
import FourColGrid from '../../shared/fourColGrid/FourColGrid';
import MovieThumb from '../../shared/movieThumb/MovieThumb';
import LoadMoreBtn from '../../shared/loadMoreBtn/LoadMoreBtn';
import Spinner from '../../shared/spinner/Spinner';
import './Home.css';

export const HomeView = ({state,searchItems,loadMoreItems})=>{
    return (
        <div className="home">
                <SearchBar callback={searchItems} />
                    <div className="home-grid">
                      <FourColGrid
                      header={state.searchTerm ? 'Search Result' : 'Popular Movies'}
                      loading={state.loading}
                      >
                      {state.movies.map ( (element, i) => {
                          return <MovieThumb
                                  key={i}
                                  clickable={true}
                                  image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : './images/no_image.jpg'}
                                  movieId={element.id}
                                  movieName={element.original_title}
                                  />
                                })}           
                      </FourColGrid>
                      {state.loading ? <Spinner /> : null}
                      {(state.currentPage <= state.totalPages && !state.loading) ?
                      <LoadMoreBtn text="Load More" onClick={loadMoreItems} />
                      : null }
                    </div>
            </div>
        );
    };
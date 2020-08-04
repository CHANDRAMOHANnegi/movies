import React, { Component } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL,POSTER_SIZE, BACKDROP_SIZE } from '../../config';
import SearchBar from '../../shared/searchBar/SearchBar';
import FourColGrid from '../../shared/fourColGrid/FourColGrid';
import TvThumb from '../../shared/tvThumb/TvThumb';
import LoadMoreBtn from '../../shared/loadMoreBtn/LoadMoreBtn';
import Spinner from '../../shared/spinner/Spinner';
import './TvSeries.css';
// import {TvSeriesView} from './TvSeriesView';

class TvSeries extends Component {
constructor(props){
        super(props)
        this.state = {
            tv: [],
            loading: false,
            currentPage: 0,
            totalPages: 0,
            searchTerm: ''}
    }


componentDidMount(){
  
    this.setState({ loading: true });
    const endpoint = `${API_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
    this.fetchItems(endpoint);

}

searchItems = (searchTerm) => {
let endpoint = '';
this.setState({
    tv: [],
    loading: true,
    searchTerm
})

    if(searchTerm  === ''){
        endpoint = `${API_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
        endpoint = `${API_URL}search/tv?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    this.fetchItems(endpoint);
}

loadMoreItems = () => {
    let endpoint = '';
    this.setState({ loading: true });

    if(this.state.searchTerm === ''){
        endpoint = `${API_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`;
    } else {
        endpoint = `${API_URL}search/tv?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.currentPage + 1}`;
    }
    this.fetchItems(endpoint);
}

fetchItems = (endpoint) => {
    fetch(endpoint)
    .then(result => result.json())
    .then(result => {
        this.setState({
            tv: [...this.state.tv, ...result.results],
            loading: false,
            currentPage: result.page,
            totalPages: result.total_pages
        })
    })
    .catch(error => console.error('Error:', error))
}

    render() {
         return (
            <div className="tv">
                <SearchBar callback={this.searchItems} />
                    <div className="tv-grid">
                      <FourColGrid
                      header={this.state.searchTerm ? 'Search Result' : 'Popular TvSeries'}
                      loading={this.state.loading}
                      >
                      {this.state.tv.map ( (element, i) => {
                          return <TvThumb
                                  key={i}
                                  clickable={true}
                                  image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : '../../assets/no_image.jpg'}
                                  tvId={element.id}
                                  tvName={element.original_name}
                                  />
                                })}           
                      </FourColGrid>
                      {this.state.loading ? <Spinner /> : null}
                      {(this.state.currentPage <= this.state.totalPages && !this.state.loading) ?
                      <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} />
                      : null }
                    </div>
            </div>
        )
    }
}

export default TvSeries;
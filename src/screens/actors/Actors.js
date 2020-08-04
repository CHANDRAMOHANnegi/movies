import React, { Component } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL,POSTER_SIZE, BACKDROP_SIZE } from '../../config';
import SearchBar from '../../shared/searchBar/SearchBar';
import FourColGrid from '../../shared/fourColGrid/FourColGrid';
import ActorsThumb from '../../shared/actorsThumb/ActorThumb';
import LoadMoreBtn from '../../shared/loadMoreBtn/LoadMoreBtn';
import Spinner from '../../shared/spinner/Spinner';
import './Actors.css';
// import {ActorsView} from './ActorsView';

class Actors extends Component {
constructor(props){
        super(props)
        this.state = {
            person: [],
            loading: false,
            currentPage: 0,
            totalPages: 0,
            searchTerm: ''}
    }
componentDidMount(){
    
    this.setState({ loading: true });
    const endpoint = `${API_URL}person/popular?api_key=${API_KEY}&language=en-US&page=1`;
    this.fetchItems(endpoint);
}

searchItems = (searchTerm) => {
let endpoint = '';
this.setState({
    person: [],
    loading: true,
    searchTerm
})

    if(searchTerm  === ''){
        endpoint = `${API_URL}person/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
        endpoint = `${API_URL}search/person?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    this.fetchItems(endpoint);
}

loadMoreItems = () => {
    let endpoint = '';
    this.setState({ loading: true });

    if(this.state.searchTerm === ''){
        endpoint = `${API_URL}person/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`;
    } else {
        endpoint = `${API_URL}search/person?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.currentPage + 1}`;
    }
    this.fetchItems(endpoint);
}

fetchItems = (endpoint) => {
    fetch(endpoint)
    .then(result => result.json())
    .then(result => {
        this.setState({
            person: [...this.state.person, ...result.results],
            loading: false,
            currentPage: result.page,
            totalPages: result.total_pages
        })
    })
    .catch(error => console.error('Error:', error))
}

    render() {
         return (
            <div className="actor">
                <SearchBar callback={this.searchItems} />
                    <div className="actor-grid">
                      <FourColGrid
                      header={this.state.searchTerm ? 'Search Result' : 'Popular Actors'}
                      loading={this.state.loading}
                      >
                      {this.state.person.map ( (element, i) => {
                          return <ActorsThumb
                                  key={i}
                                  clickable={true}
                                  image={element.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.profile_path}` : './images/no_image.jpg'}
                                  personId={element.id}
                                  personName={element.name}
                                  popularity={element.popularity}
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

export default Actors;
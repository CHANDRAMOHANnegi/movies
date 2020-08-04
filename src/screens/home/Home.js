import React, { Component } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../config';
import './Home.css';
import { HomeView } from './HomeView';
import { setMovies } from "../../store/actions/userAction";

import { connect } from "react-redux";

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            loading: false,
            currentPage: 0,
            totalPages: 0,
            searchTerm: ''
        }
    }

    componentDidMount() {

        this.setState({ loading: true });
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        this.fetchItems(endpoint);

    }

    searchItems = (searchTerm) => {
        let endpoint = '';
        this.setState({
            movies: [],
            loading: true,
            searchTerm
        })

        if (searchTerm === '') {
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        } else {
            endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
        }
        this.fetchItems(endpoint);
    }

    loadMoreItems = () => {
        let endpoint = '';
        this.setState({ loading: true });

        if (this.state.searchTerm === '') {
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`;
        } else {
            endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.currentPage + 1}`;
        }
        this.fetchItems(endpoint);
    }

    fetchItems = (endpoint) => {
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    movies: [...this.state.movies, ...result.results],
                    loading: false,
                    currentPage: result.page,
                    totalPages: result.total_pages
                }, this.props.setMovies([...this.state.movies, ...result.results]))
            })
            .catch(error => console.error('Error:', error))
    }

    render() {
        return (
            <HomeView state={this.state}
                searchItems={this.searchItems}
                loadMoreItems={this.loadMoreItems}
            />
        )
    }
}


export default connect(null, { setMovies })(Home);
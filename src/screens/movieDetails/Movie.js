import React, { Component } from 'react';
import { API_URL, API_KEY } from '../../config';
import { MovieView } from './MovieView';
import './Movie.css';
import { connect } from 'react-redux';
import { addToFavourite } from "../../store/actions/userAction";

class Movie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movie: null,
            directors: [],
            loading: false
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
        this.fetchItems(endpoint);
    }


    fetchItems = (endpoint) => {
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                if (result.status_code) {
                    this.setState({ loading: false });
                } else {
                    this.setState({ movie: result }, () => {
                        const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`;
                        fetch(endpoint)
                            .then(result => result.json())
                            .then(result => {
                                const directors = result.crew.filter((member) => member.job === "Director");

                                this.setState({
                                    directors,
                                    loading: false
                                })
                            })
                    })
                }
            })
            .catch(error => console.error('Error:', error))
    }
    render() {
        console.log(this.props);

        return (
            <MovieView state={this.state} addToFavourite={this.props.addToFavourite} favourites={this.props.favourites} />
        );
    }
}

function mapState(state) {
    return {
        favourites: state.userReducer.favourites,
    }
}

export default connect(mapState, { addToFavourite })(Movie);


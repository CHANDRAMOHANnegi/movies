import React, {Component} from 'react';
import { API_URL, API_KEY } from '../../config';
import {TvSeriesDetailsView} from './TvSeriesDetailsView';
import './TvSeriesDetails.css';

class TvSeriesDetails extends Component {
    constructor(props){
        super(props)
        this.state = {
            tv: null,
            directors: [],
            loading: false
        }
    }
   
    componentDidMount(){
        this.setState({ loading: true })
        const endpoint = `${API_URL}tv/${this.props.match.params.tvId}?api_key=${API_KEY}&language=en-US`;
        this.fetchItems(endpoint);
        
    }

    fetchItems = (endpoint) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            if (result.status_code){
                this.setState({ loading: false });
            } else {
                this.setState({ tv: result }, () => {
                const endpoint = `${API_URL}tv/${this.props.match.params.tvId}/credits?api_key=${API_KEY}`;
               fetch(endpoint)
               .then(result => result.json())
               .then(result => {
                   const directors = result.crew.filter( (member) => member.job === "Director");
              
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
        return (
            <TvSeriesDetailsView state={this.state}/>
        );
    }
    }
export default TvSeriesDetails;
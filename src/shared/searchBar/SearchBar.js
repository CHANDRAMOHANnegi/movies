import React, { Component }  from 'react';
import {SearchBarView} from './SearchBarView';
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: ''
        }
    }
    timeout = null;

    doSearch = (event) => {
        this.setState({value: event.target.value })
        clearTimeout(this.timeout);

    this.timeout = setTimeout( () => {
        this.props.callback(this.state.value);
    }, 500)
}  

    render(){
        return (
            <SearchBarView state={this.state}
            doSearch={this.doSearch}/>
        );
    }
}

export default SearchBar;
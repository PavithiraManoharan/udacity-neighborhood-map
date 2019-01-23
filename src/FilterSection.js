//Here Goes Sidebar content
import React, { Component } from 'react'
import './App.css'

class FilterSection extends Component {

    constructor(props){
        super(props);
        this.state = {
            query: '',
            filteredVenues: []
        }
    }

    componentDidMount() {
        this.setState({filteredVenues: this.props.venues})
    }

    filterVenues(query) {
        let filteredVenues = (this.props.venues).filter(eachPlace => eachPlace.venue.name.toLowerCase().includes(query.toLowerCase()))
        this.props.markers.forEach(marker => {
            marker.name.toLowerCase().includes(query.toLowerCase()) === true ? 
                marker.setVisible(true) :
                marker.setVisible(false)
        })
        this.setState({ query })
        this.setState({ filteredVenues })
    }
 
    render() {
        return( 
            <div className="sidebar">
                <input placeorder="Filter content" value= {this.state.query} onChange={(e) => { this.filterVenues(e.target.value) }}/>
                <ol>
                    {this.state.filteredVenues && (this.state.filteredVenues).map((currentLocation, index) =>
                        <li key={index}>{currentLocation.venue.name}</li>
                    )}
                </ol>        
            </div>
        )
    }
}

export default FilterSection
//Here Goes Sidebar content
import React, { Component } from 'react'
import './App.css'

class FilterSection extends Component {

    constructor(props){
        super(props);
        this.state = {
            query: ''
        }
    }

    filterVenues(query) {
        this.props.markers.forEach(marker => {
            marker.name.toLowerCase().includes(query.toLowerCase()) === true ? 
                marker.setVisible(true) :
                marker.setVisible(false)
        })
        this.setState({ query })
    }
 
    render() {
        return( 
            <div className="sidebar">
                <input value= {this.state.query} onChange={(e) => { this.filterVenues(e.target.value) }}/>
                <ol>
                    {this.props.venues && (this.props.venues).map((currentLocation) =>
                            <li key={currentLocation.venue.id}>{currentLocation.venue.name}</li>
                    )}
                </ol>        
            </div>
        )
    }
}

export default FilterSection
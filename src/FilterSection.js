import React, { Component } from 'react'
import './App.css'

class FilterSection extends Component {

    constructor(props){
        super(props)
        this.state = {
            query: '',
            filteredVenues: []
        }
    }

    /**
     * Adding the list of venues received as props in a new state for filter functions
     */
    componentDidMount() {
        this.setState({filteredVenues: this.props.venues})
    }

    /**
     * Triggering click on the marker after finding the one which matches the given venue
     */
    highlightMarker = (currentLocation) => {
        let marker = this.props.markers.filter(m => m.id === currentLocation.venue.id)[0]
        window.google.maps.event.trigger(marker, 'click')
    }

    /**
     * Filter Venues from props based on the value entered in the input field
     */
    filterVenues = (query) => {
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
            <nav id="canvas-menu" className={"sidebar " + (this.props.isSidebarOpen ? 'open' : 'closed')}>
                <input name="Filter venues" id="filter" type="text" placeholder="Filter places" value= {this.state.query} onChange={(e) => { this.filterVenues(e.target.value) }}/>
                <ul className="listPlaces">
                    {this.state.filteredVenues && (this.state.filteredVenues).map((currentLocation, index) =>
                        <li key={index} onClick={() => {this.highlightMarker(currentLocation)}}>
                            <button key={index} name={currentLocation.venue.name} title={currentLocation.venue.name}><i className="fas fa-landmark"></i>   {currentLocation.venue.name}</button>
                        </li>
                    )}
                </ul>
            </nav>
        )
    }
}

export default FilterSection
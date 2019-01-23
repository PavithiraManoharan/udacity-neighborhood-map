//Here Goes Sidebar content
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

    componentDidMount() {
        this.setState({filteredVenues: this.props.venues})
    }


    highlightMarker = (currentLocation) => {
        let marker = this.props.markers.filter(m => m.id === currentLocation.venue.id)[0]
        window.google.maps.event.trigger(marker, 'click')
    }

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
                <button id="close-sidebar-menu" onClick={this.props.toggleSidebar} name="Close Menu"><i className="fas fa-times"></i></button    >
                <ul className="listPlaces">
                    {this.state.filteredVenues && (this.state.filteredVenues).map((currentLocation, index) =>
                        <li key={index} onClick={() => {this.highlightMarker(currentLocation)}}>
                            <button key={index}><i className="fas fa-landmark"></i>   {currentLocation.venue.name}</button>
                        </li>
                    )}
                </ul>        
            </nav>
        )
    }
}

export default FilterSection
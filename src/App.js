import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import FilterSection from './FilterSection'

class App extends Component {

  state = {
    venues: [],
    isSidebarOpen: false
  }

  componentDidMount() {
    this.markers = []
    this.getVenues()
  }

  /**
 * Create a function called loadScript to simulate adding a script tag in the index.html page
 * <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>
 */
  loadScript = (url) => {
    let index = window.document.getElementsByTagName("script")[0]
    let script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
  }

  renderMap = () => {
    this.loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyABkyhI9EIbhjjP5D-mQTQo-4l-9h34Nm4&callback=initMap")
    window.initMap = this.initMap
  }

  handleFailLoadMap = () => {
    document.getElementById("errorDisplay").style.display = "block"
  }

  getVenues = () => {
    const api = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "I35VHQNE1A5YIW0SCEGXNVAQ4UOVGEORZV5X5V2ABI4PUSCF",
      client_secret:   "TS53QTLYEOVAGUZUPF4EEFZGCMGUZLVJ2G4OPMPWMP5UDPQB",
      query: "poi",
      section: "museum",
      categoryId: "4bf58dd8d48988d181941735",
      ll:"53.55,10",
      radius: "2000",
      v: "20180323"
    }

    axios.get(api + new URLSearchParams(parameters))
      .then(res => {
        this.setState({
          venues: res.data.response.groups[0].items
        }, this.renderMap())
      })
      .catch(error => {
        this.setState({
          venues: []
        }, this.handleFailLoadMap())
      })
  } 


  // This function takes in a COLOR, and then creates a new marker
  // icon of that color. The icon will be 21 px wide by 34 high, have an origin
  // of 0, 0 and be anchored at 10, 34).
  makeMarkerIcon = (markerColor) => {
    var markerImage = new window.google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
      '|40|_|%E2%80%A2',
      new window.google.maps.Size(21, 34),
      new window.google.maps.Point(0, 0),
      new window.google.maps.Point(10, 34),
      new window.google.maps.Size(21,34));
    return markerImage;
  }

  //Create an Infowindow
  createInfoWindow = () => {
    let infowindow = new window.google.maps.InfoWindow()
    return infowindow
  }

  //Style default markers, add content and useful animations
  addMarkers = (map, infowindow) => {
    // Style the markers a bit. This will be our listing marker icon.
    const defaultIcon = this.makeMarkerIcon('ff0000');
    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    const highlightedIcon = this.makeMarkerIcon('0091ff');

    // Display dynamic markers
    this.state.venues && this.state.venues.map(currentPlace => {
      let contentString = `
      <h3 id="placeName">${currentPlace.venue.name}</h4>
      <p><strong>Where? </strong>${currentPlace.venue.location.formattedAddress.map(addressLine => {
        return ` ${addressLine}`
      })}</p>
      <p><strong>Category: </strong>${currentPlace.venue.categories[0].name}</p>
      <p><em>*All Info provided by FourSquare API*</em></p>
      `
      //Create a marker
      let marker = new window.google.maps.Marker({
        position: {lat: currentPlace.venue.location.lat, lng: currentPlace.venue.location.lng},
        map: map,
        id: currentPlace.venue.id,
        name: currentPlace.venue.name,
        animation: window.google.maps.Animation.DROP,
        title: currentPlace.venue.name
      })

      //Set default styled icon for the markers
      marker.setIcon(defaultIcon)
      
      marker.addListener('click', function() {
        //Set content of the infowindow
        infowindow.setContent(contentString)
        //Open it
        infowindow.open(map, marker);
        //Add bounce effect on click
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(function(){ marker.setAnimation(null); }, 1300);
        }
      });

      // Two event listeners - one for mouseover, one for mouseout,
      // to change the colors back and forth.
      marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
      });
      this.markers.push(marker)
      return marker
    })
  }

  //Display a map with markers and their infowindows
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 53.55, lng: 10},
      zoom: 14,
    });
    map.setOptions({styles: this.styles['hide']});
    const infowindow = this.createInfoWindow()
    this.addMarkers(map, infowindow)
  }

  styles = {
    hide: [
      {
        featureType: 'poi',
        stylers: [{visibility: 'off'}]
      }
    ]
  };

  toggleSidebar = () => {
    //Toggle the values of the sidebar's open or not values
    this.setState({ isSidebarOpen: !this.state.isSidebarOpen })
    if(this.state.isSidebarOpen) {
      document.getElementById('canvas-menu').setAttribute("aria-expanded", true)
    } else {
      document.getElementById('canvas-menu').setAttribute("aria-expanded", false)
    }
  }

  render() {
    return (
      <div className="application">
        <header id="appHeader" className={this.state.isSidebarOpen ? "open" : "closed"}>
          <button id="sidebar-menu-icon" onClick={this.toggleSidebar} aria-label="Open Menu">
              <i className="fas fa-bars"></i>
          </button>
          <div className="main-heading">
            <h1>Museums in Hafencity - Hamburg</h1>
          </div>
        </header>
        {
          this.state.venues && this.state.venues.length > 0 && 
          <FilterSection isSidebarOpen={this.state.isSidebarOpen} toggleSidebar={this.toggleSidebar} markers={this.markers} venues={this.state.venues} />
        }
        <main id="appMain" className={this.state.isSidebarOpen ? "open":"closed"}>
          <div id="errorDisplay" style={{display: "none"}}>Sorry, Google Maps was unable to load at this time :(</div>
          <div id="map" role="application" aria-label="map"></div>
        </main>
      </div>
    );
  }
}
 
export default App;
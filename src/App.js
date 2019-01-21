import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {

  state = {
    venues: []
  }

  componentDidMount() {
    this.getVenues()
    this.renderMap()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyABkyhI9EIbhjjP5D-mQTQo-4l-9h34Nm4&callback=initMap")
    window.initMap = this.initMap
  }

  getVenues = () => {
    const api = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "I35VHQNE1A5YIW0SCEGXNVAQ4UOVGEORZV5X5V2ABI4PUSCF",
      client_secret: "TS53QTLYEOVAGUZUPF4EEFZGCMGUZLVJ2G4OPMPWMP5UDPQB",
      query: "museum",
      section: "museum",
      categoryId: "4bf58dd8d48988d181941735",
      near:"Hafencity",
      radius: "2000",
      v: "20180323"
    }

    axios.get(api + new URLSearchParams(parameters))
      .then(res => {
        this.setState({
          venues: res.data.response.groups[0].items
        })
      })
      .catch(error => {
        console.log("Oops! Some error occurred while fetching the Venues from the API " + error)
      })
  } 

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 53.55, lng: 10},
      zoom: 14
    });
  }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    );
  }
}

/**
 * Create a function called loadScript to simulate adding a script tag in the index.html page
 * <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>
 */

 function loadScript(url) {
    let index = window.document.getElementsByTagName("script")[0]
    let script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
 }
 
export default App;

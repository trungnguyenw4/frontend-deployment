import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import './firmCard.css';
import './mapStyling.css';
import { MAP_KEY } from "../../apiConfig";
const libraries = ["places"];

const mapContainerStyle = {
  height: 500,
  width: "100%"

};

// University of Westminster 
const defaultCenter = {
  lat: 51.5194, 
  lng: -0.1418, 
};

const getMarkerIcon = (rating) => ({
  url: `https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png`,
  scaledSize: new window.google.maps.Size(40, 40),
  labelOrigin: new window.google.maps.Point(12, 13),
  label: {
    text: rating.toString(),
    color: "red",
    fontSize: "14px",
    fontWeight: "bold"
  }
});

const CompassControl = ({ panTo, handleSearch }) => {
  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        panTo({ lat: latitude, lng: longitude });
        handleSearch(`${latitude},${longitude}`);
      },
      () => null
    );
  };

  return (
    <button className="compass-control" onClick={handleClick}>
       <img src="/locator.png" alt="compass" />
    </button>
  );
};

const InsuranceBrokers = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: MAP_KEY,
    libraries
  });

  const [map, setMap] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [mapZoom, setMapZoom] = useState(15);

  useEffect(() => {
    const savedSearchResults = localStorage.getItem('searchResults');
    if (savedSearchResults) {
      setSearchResults(JSON.parse(savedSearchResults));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchResults", JSON.stringify(searchResults));
  }, [searchResults]);

  useEffect(() => {
    if (map) {
      const mapCenter = JSON.parse(localStorage.getItem("mapCenter"));
      if (mapCenter) {
        map.setCenter(mapCenter);
      }
    }
  }, [map]);

  useEffect(() => {
    const savedMapZoom = localStorage.getItem('mapZoom');
    if (savedMapZoom) {
      setMapZoom(Number(savedMapZoom));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mapZoom", mapZoom.toString());
  }, [mapZoom]);

  const handleSearch = (address) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        if (map) {
          map.panTo(location);
          const service = new window.google.maps.places.PlacesService(map);
          service.textSearch({
            query: "Insurance Brokers",
            location: location,
            radius: 100
          }, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              const mappedResults = results.map(result => ({
                ...result,
                geometry: {
                  location: {
                    lat: result.geometry.location.lat(),
                    lng: result.geometry.location.lng()
                  }
                }
              }));
              setSearchResults(mappedResults);
              localStorage.setItem("mapCenter", JSON.stringify(location));
            } else {
              console.error("Error fetching nearby places:", status);
            }
          });
        }
      } else {
        console.error("Geocode was not successful for the following reason:", status);
      }
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch(document.getElementById("search-input").value);
    }
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps...";

  return (
    <div className="map-container">
      <input type="text" id="search-input" className="search-input" placeholder="Enter your location" onKeyDown={handleKeyDown} />
      <button onClick={() => handleSearch(document.getElementById("search-input").value)} className="search-button">Search</button>
      
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={mapZoom}
        center={defaultCenter}
        onLoad={(map) => setMap(map)}
        onZoomChanged={() => {
          if (map) {
            setMapZoom(map.getZoom());
          }
        }}
      >
        <CompassControl panTo={(location) => map.panTo(location)} handleSearch={handleSearch} />
        
        {searchResults.map((result, index) => (
          <Marker
            key={index}
            position={{ lat: result.geometry.location.lat, lng: result.geometry.location.lng }}
            icon={getMarkerIcon(result.rating)}
            onClick={() => setSelectedResult(result)}
          />
        ))}
        
        {selectedResult && (
          <InfoWindow position={{ lat: selectedResult.geometry.location.lat, lng: selectedResult.geometry.location.lng }} onCloseClick={() => setSelectedResult(null)}>
            <div className="card">
              <h2 className="card-title">{selectedResult?.name}</h2>
              <p className="card-info">{selectedResult?.formatted_address}</p>
              <p className="card-rating">Rating: {selectedResult?.rating }</p>
              <p className="card-info">Total Rating: {selectedResult?.user_ratings_total}</p>        
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default InsuranceBrokers;

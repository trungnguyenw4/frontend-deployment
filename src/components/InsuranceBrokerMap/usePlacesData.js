// usePlacesData.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useJsApiLoader } from '@react-google-maps/api';

const usePlacesData = (location) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = useLoadScript({
            googleMapsApiKey: 'AIzaSyBWqBghISLmVavA3koRdb8suS9e0GdG77g',
            libraries,
          });

        if (response.data.status === 'OK') {
          const placesData = response.data.results.map(place => ({
            name: place.name,
            address: place.formatted_address,
            phone_number: place.formatted_phone_number,
            website: place.website,
            rating: place.rating,
            num_reviews: place.user_ratings_total
          }));
          setPlaces(placesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [location]);

  return places;
};

export default usePlacesData;

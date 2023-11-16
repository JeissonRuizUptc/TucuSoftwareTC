import React, { useEffect, useState } from 'react';
import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const MapContainer = ({ originAddress, destinationAddress }) => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    const getCoordinates = async (address, setter) => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=AIzaSyBjo57InxDqOEy9gA25itmEssO1o7E7M1A`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch coordinates');
        }

        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setter({ lat, lng });
        } else {
          throw new Error('No results found for the address');
        }
      } catch (error) {
        console.error(error);
        // Handle error, e.g., show an error message to the user
      }
    };

    if (originAddress) {
      getCoordinates(originAddress, setOrigin);
    }

    if (destinationAddress) {
      getCoordinates(destinationAddress, setDestination);
    }
  }, [originAddress, destinationAddress]);

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  const directionsCallback = (response) => {
    if (response !== null && response.status === 'OK') {
      setDirections(response);
    } else {
      console.error('Error fetching directions:', response);
    }
  };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={origin || destination}
      zoom={10}
      options={mapOptions}
    >
      {origin && destination && (
        <React.Fragment>
          <DirectionsService
            options={{
              destination: destination,
              origin: origin,
              travelMode: 'DRIVING',
            }}
            callback={directionsCallback}
          />
          {directions && <DirectionsRenderer directions={directions} />}
        </React.Fragment>
      )}
    </GoogleMap>
  );
};

export default MapContainer;

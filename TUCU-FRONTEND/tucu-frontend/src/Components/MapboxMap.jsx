import React, { useState } from 'react';
import MapboxMap from 'react-map-gl/mapbox-gl';

const MapboxMap = () => {
  const [originAddress, setOriginAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [response, setResponse] = useState(null);

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        console.log('Directions API response:', response);
        setResponse(response);
      } else {
        console.error('Directions API response status:', response.status);
      }
    }
  };

  const getMidpoint = (lat1, lng1, lat2, lng2) => {
    const latMid = (lat1 + lat2) / 2;
    const lngMid = (lng1 + lng2) / 2;
    return { lat: latMid, lng: lngMid };
  };

  return (
    <LoadScript
      mapboxApiKey="YOUR_MAPBOX_API_KEY"
      onLoad={() => {
        setResponse(null);
      }}
    >
      <MapGL
        mapContainerStyle={{ height: '50vh', width: '100%' }}
        zoom={13}
        center={getMidpoint(originAddress.lat, originAddress.lng, destinationAddress.lat, destinationAddress.lng)}
      >
        <DirectionsService
          options={{
            destination: destinationAddress,
            origin: originAddress,
            travelMode: 'DRIVING',
          }}
          callback={directionsCallback}
        />
        {response && (
          <DirectionsRenderer options={{ directions: response.routes[0] }} />
        )}
      </MapGL>
    </LoadScript>
  );
};

export default MapboxMap;

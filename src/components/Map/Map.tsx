'use client';

import env from '@env';
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px',
};

type MapProps = {
  lat: number;
  lng: number;
};

const Map = ({ lat, lng }: MapProps) => {
  const center = { lat, lng };

  return (
    <LoadScriptNext googleMapsApiKey={env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default Map;

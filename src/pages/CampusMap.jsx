import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "70vh",
  borderRadius: "16px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  margin: "2rem 0"
};


// Center on Rivers State University, Port Harcourt, Nigeria
const center = {
  lat: 4.8106, // Rivers State University latitude
  lng: 6.9956 // Rivers State University longitude
};

const markers = [
  { position: { lat: 4.8106, lng: 6.9956 }, label: "Main Gate" },
  { position: { lat: 4.8130, lng: 6.9975 }, label: "Senate Building" },
  { position: { lat: 4.8122, lng: 6.9948 }, label: "Library" },
  // Add more RSU campus locations here
];

export default function CampusMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAU4A3PEyRAbBkVK9KoePB4TWRMdWvRMdY" // TODO: Replace with your API key
  });

  if (loadError) return <div>Map cannot be loaded right now.</div>;
  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Campus Map</h1>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        options={{ mapTypeControl: false, streetViewControl: false }}
      >
        {markers.map((marker, idx) => (
          <Marker key={idx} position={marker.position} label={marker.label} />
        ))}
      </GoogleMap>
      <div className="mt-6 text-center text-gray-500 dark:text-gray-300">
        Click on markers for building info. You can add more locations in the code.
      </div>
      <div className="campus-map-container" style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Campus Map - Rivers State University</h1>
        <iframe
          title="Rivers State University Map"
          src="https://www.openstreetmap.org/export/embed.html?bbox=6.980317314763%2C4.787123456789%2C6.984317314763%2C4.791123456789&layer=mapnik&marker=4.789123456789%2C6.982317314763"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

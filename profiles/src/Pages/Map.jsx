import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useParams } from "react-router-dom";

const MapPage = () => {
  const { city } = useParams(); // Get the current URL location
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    if (city) {
      // Fetch coordinates using Nominatim API (OpenStreetMap API)
      const fetchCoordinates = async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${city}&format=json&addressdetails=1`
          );
          const data = await response.json();
          if (data.length > 0) {
            const { lat, lon } = data[0];
            setCoordinates({ lat, lon });
          }
        } catch (error) {
          console.error("Error fetching coordinates:", error);
        }
      };
      fetchCoordinates();
    }
  }, [city]);

  if (!coordinates) return <div>Loading map...</div>;

  return (
    <div
 className="flex h-screen justify-center items-center"
    >
      <MapContainer
        center={[coordinates.lat, coordinates.lon]}
        zoom={13}
        style={{ height: "80vh", width: "80%", boxShadow:'3px' }} 
      >
        {/* TileLayer - OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Marker for the location */}
        <Marker position={[coordinates.lat, coordinates.lon]}>
          <Popup>{`Location of ${city}`}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapPage;

import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  height: "100vh",
  width: "100%",
};

const defaultCenter = {
  lat: 21.17024,
  lng: 72.831062,
};

function MapGoogle() {
  const [currentPosition, setCurrentPosition] = useState({});

  const success = () => {
    const currentPosition = {
      lat: 21.17024,
      lng: 72.831062,
    };
    setCurrentPosition(currentPosition);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  });

  const getplace = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng });
    console.log(e);
  };

  return (
    <LoadScript googleMapsApiKey={"AIzaSyAEZNHKEmXKDYWfWODtC5_girNDaX4ol5Y"}>
      <GoogleMap
        center={currentPosition}
        mapContainerStyle={containerStyle}
        zoom={13}
      >
        {currentPosition.lat ? (
          <Marker
            position={currentPosition}
            onDragEnd={(e) => getplace(e)}
            draggable={true}
          />
        ) : null}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapGoogle;

//demooo-2

// import React, { useState } from "react";
// import GoogleMapReact from "google-map-react";
// import { GoogleMap } from "google-map-react";

// //import Marker from "react-google-maps/lib/components/Marker";

// const MapGoogle = () => {
//   const [Markers, setMarker] = useState({
//     name: "Current position",
//     position: {
//       lat: 21.17024,
//       lng: 72.831062,
//     },
//   });
//   const makemarker = (map, maps) => {
//     let marker = new maps.Marker({
//       position: Markers.position,
//       zoom: Markers.zoom,
//       draggable: true,
//       dragend: (e) => console.log(e),
//       map,
//       title: "Hello World!",
//     });
//     return marker;
//   };

//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: "AIzaSyAEZNHKEmXKDYWfWODtC5_girNDaX4ol5Y" }}
//         defaultCenter={Markers.position}
//         defaultZoom={16}
//         yesIWantToUseGoogleMapApiInternals
//         onGoogleApiLoaded={({ map, maps }) => makemarker(map, maps)}
//       ></GoogleMapReact>
//     </div>
//   );
// };

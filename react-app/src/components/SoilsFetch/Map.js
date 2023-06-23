import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './Map.css'
//private token
mapboxgl.accessToken = "pk.eyJ1IjoidGF5c3RhY2tzIiwiYSI6ImNsajh5a2R3MjBzaGczaW41YmIwMmpjcDIifQ.b5p7I1Utegs1ltjWasrzyw";

//public token
// mapboxgl.accessToken = "pk.eyJ1IjoidGF5c3RhY2tzIiwiYSI6ImNsajh1eGQ4NjEzODgzZWt4MTMzdmR6enQifQ.TkQPPCuojyM0wguZ3sBLxA";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
  }, []);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(6));
        setLat(map.current.getCenter().lat.toFixed(6));
        setZoom(map.current.getZoom().toFixed(2));
        });
    });


    // console.log(lng)
  return (
    <div>
        <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      <div ref={mapContainer} className="map-container" style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default Map;

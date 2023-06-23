import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './Map.css'

const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-95.274188);
    const [lat, setLat] = useState(39.640484);
    const [zoom, setZoom] = useState(2.74);
    const [marker, setMarker] = useState(null)


    const handleMapClick = (e) => {
        const { lng, lat } = e.lngLat;
        setLng(lng.toFixed(6));
        setLat(lat.toFixed(6));

        if (marker) {
            marker.remove();
        }

        const newMarker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map.current);

        setMarker(newMarker);
    };


  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom,
    });

    map.current.on('click', handleMapClick)

    return () => {
        map.current.off('click', handleMapClick)
    }

}, []);


//works on centering the map over a point, and the point becomes the coordinate
//   useEffect(() => {
//     if (!map.current) return; // wait for map to initialize
//     map.current.on('click', (e) => {
//         setLng(map.current.getCenter().lng.toFixed(6));
//         setLat(map.current.getCenter().lat.toFixed(6));
//         setZoom(map.current.getZoom().toFixed(2));

//         });
//     });

useEffect(() => {
    if (!marker) return;

    return () => {
      marker.remove();
    };
  }, [marker]);

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

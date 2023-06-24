import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './Map.css'



const Map = ({setLatitude, latitude, setLongitude, longitude}) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    // const [longitude, setLongitude] = useState(-95.274188);
    // const [lat, setLatitude] = useState(39.640484);
    const [zoom, setZoom] = useState(2.74);
    const [marker, setMarker] = useState(null)

    console.log("latitude",latitude)
    console.log("longitude",longitude)

    const handleMapClick = async (e) => {
        const { lng, lat } = e.lngLat;

        (setLongitude(lng.toFixed(6)));
        (setLatitude(lat.toFixed(6)));

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
        center: [longitude, latitude],
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
//         setLongitude(map.current.getCenter().longitude.toFixed(6));
//         setLatitude(map.current.getCenter().latitude.toFixed(6));
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
            Longitude: {longitude} | Latitude: {latitude} | Zoom: {zoom}
        </div>
      <div ref={mapContainer} className="map-container" style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default Map;

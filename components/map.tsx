"use client";

import React, { useRef, useEffect, useState } from "react";
import mapboxgl, { Map } from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ3VzdG9uZWNydXNoIiwiYSI6ImNsd2E2cmRxNTBhd3oycW04a3RiM3kzdXoifQ.oY8qZwwcrkFJQRUwKwA77Q";

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef<Map>(null);
  const [lng, setLng] = useState(113.921327);
  const [lat, setLat] = useState(-0.789275);
  const [zoom, setZoom] = useState(4.45);

  useEffect(() => {
    // if (map.current) return; // initialize map only once
    // map.current = new mapboxgl.Map({
    //   container: mapContainer.current,
    //   style: "mapbox://styles/mapbox/streets-v12",
    //   center: [lng, lat],
    //   zoom: zoom,
    // });
    // map.current.on("move", () => {
    //   setLng(map!.current!.getCenter().lng.toFixed(4));
    //   setLat(map!.current!.getCenter().lat.toFixed(4));
    //   setZoom(map!.current!.getZoom().toFixed(2));
    // });
  });

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container h-[700px]" />
    </div>
  );
}

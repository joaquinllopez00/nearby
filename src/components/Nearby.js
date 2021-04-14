import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { setCoords } from "../actions/coordsActions";
import { useDispatch, useSelector } from "react-redux";
import loader from "../assets/loading.gif";
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9hcXVpbmxsb3BlejAwIiwiYSI6ImNrbmdscXVsMjF1NDgycG1pdWRoYWxxYWQifQ.tDXw5R4ecE0ss_PbRxk2_A";
export const Nearby = () => {
  const mapContainerRef = useRef(null);
  const coords = useSelector((state) => state.coordinates.coords);
  const [loading, setLoading] = useState(true);

  const createMap = (coordinates) => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/joaquinllopez00/ckngno15p0wub18ryynldztkt",
      center: coordinates,
      zoom: 12.5,
    });
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    return () => map.remove();
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      createMap(coords);
    }, 5000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <img src={loader} alt="Loading..." />
        </div>
      ) : (
        ""
      )}
      <div className={loading ? "" : "map-container"} ref={mapContainerRef}></div>
    </>
  );
};

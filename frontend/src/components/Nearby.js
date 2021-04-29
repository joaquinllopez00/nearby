import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSelector, useDispatch } from "react-redux";
import loader from "../assets/loading.gif";
import { showEventDetail } from "../actions/eventActions";
import { EventDetail } from "./EventDetail";

// const Events = [
//   {
//     name: "Community Clean-Up",
//     type: "Community",
//     time: "12:05pm",
//     addr: "Indianapolis, IN",
//     id: 1,
//     location: [-86.17434153813191, 39.73411177758943],
//     description: "Farts upon farts",
//   },
//   {
//     name: "Park Clean-Up",
//     type: "Community",
//     time: "12:15pm",
//     addr: "Indianapolis, IN",
//     id: 2,
//     location: [-86.11599638182919, 39.740674968989815],
//     description: "words words words",
//   },
//   {
//     name: "Soup Kitchen",
//     type: "Community",
//     time: "11:05am",
//     addr: "Indianapolis, IN",
//     id: 3,
//     location: [-86.13018582931184, 39.743135826992614],
//     description: "words words words",
//   },
//   {
//     name: "Rebuilding Apartments",
//     type: "Community",
//     time: "10:00am",
//     id: 4,
//     addr: "Indianapolis, IN",
//     location: [-86.1176545496681, 39.74726050336097],
//     description: "words words words",
//   },
//   {
//     name: "Food Drive",
//     type: "Party",
//     time: "2:00pm",
//     addr: "Indianapolis, IN",
//     id: 5,
//     location: [-86.15569846427867, 39.770011077887574],
//     description: "words words words",
//   },
//   {
//     name: "Prayer Walk",
//     type: "Religious",
//     time: "2:00pm",
//     addr: "Indianapolis, IN",
//     id: 6,
//     location: [-86.15369846427867, 39.770011077887674],
//     description: "words words words",
//   },
//   {
//     name: "Neighborhood Bonfire",
//     type: "Party",
//     time: "12:05pm",
//     addr: "Indianapolis, IN",
//     id: 7,
//     location: [-86.15434153813191, 39.73411177758943],
//     description: "Farts upon farts",
//   },
// ];
mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9hcXVpbmxsb3BlejAwIiwiYSI6ImNrbmdscXVsMjF1NDgycG1pdWRoYWxxYWQifQ.tDXw5R4ecE0ss_PbRxk2_A";
export const Nearby = () => {
  const dispatch = useDispatch();
  const mapContainerRef = useRef(null);

  const coords = useSelector((state) => state.coordinates.coords);
  const [loading, setLoading] = useState(true);
  const [id, setEventId] = useState(null);

  let Events = useSelector((state) => state.events.events);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);

      if (window.location.href.split("/")[3] === "nearby") {
        console.log(Events, "nearby useffect");
        createMap(coords);
      } else {
        return;
      }
    }, 2000);
  }, [Events]);

  const createMap = (coordinates) => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/joaquinllopez00/ckngno15p0wub18ryynldztkt",
      center: coordinates,
      zoom: 12.5,
    });

    map.addControl(new mapboxgl.NavigationControl(), "bottom-left");

    map.on("load", async () => {
      map.addSource("CommunityEvents", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: Events.filter((event) => event.type === "Community").map((event) => {
            return {
              type: "Feature",
              properties: {
                description: event.description,
                id: event.id,
              },
              geometry: {
                type: "Point",
                coordinates: event.location,
              },
            };
          }),
        },
      });

      map.addSource("PartyEvents", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: Events.filter((event) => event.type === "Party").map((event) => {
            return {
              type: "Feature",
              properties: {
                description: event.description,
                id: event._id,
              },
              geometry: {
                type: "Point",
                coordinates: event.location,
              },
            };
          }),
        },
      });
      console.log(Events.filter((event) => event.type === "Party"));
      map.addSource("ReligiousEvents", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: Events.filter((event) => event.type === "Religious").map((event) => {
            return {
              type: "Feature",
              properties: {
                description: event.description,
                id: event._id,
              },
              geometry: {
                type: "Point",
                coordinates: event.location,
              },
            };
          }),
        },
      });

      map.addLayer({
        id: "CommunityEvents",
        type: "circle",
        source: "CommunityEvents",
        layout: {
          visibility: "visible",
        },
        paint: {
          "circle-radius": 10,
          "circle-color": "green",
        },
      });

      map.addLayer({
        id: "ReligiousEvents",
        type: "circle",
        source: "ReligiousEvents",
        layout: {
          visibility: "visible",
        },
        paint: {
          "circle-radius": 10,
          "circle-color": "Yellow",
        },
      });

      map.addLayer({
        id: "PartyEvents",
        type: "circle",
        source: "PartyEvents",
        layout: {
          visibility: "visible",
        },
        paint: {
          "circle-radius": 10,
          "circle-color": "pink",
        },
      });
    });

    map.on("click", "PartyEvents", function (e) {
      // let coordinates = e.features[0].geometry.coordinates.slice();
      // let description = e.features[0].properties.description;
      let id = e.features[0].properties.id;
      setEventId(id);
      dispatch(showEventDetail());
      console.log("Hello");
    });
    map.on("mouseenter", "PartyEvents", function () {
      map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "PartyEvents", function () {
      map.getCanvas().style.cursor = "";
    });
    map.on("click", "CommunityEvents", function (e) {
      // let coordinates = e.features[0].geometry.coordinates.slice();
      // let description = e.features[0].properties.description;
      let id = e.features[0].properties.id;
      setEventId(id);
      dispatch(showEventDetail());
      // history.push(`/nearby/${id}`);
    });
    map.on("mouseenter", "CommunityEvents", function () {
      map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "CommunityEvents", function () {
      map.getCanvas().style.cursor = "";
    });

    map.on("click", "ReligiousEvents", function (e) {
      // let coordinates = e.features[0].geometry.coordinates.slice();
      // let description = e.features[0].properties.description;
      let id = e.features[0].properties.id;
      setEventId(id);
      dispatch(showEventDetail());
      // history.push(`/nearby/${id}`);
    });
    map.on("mouseenter", "ReligiousEvents", function () {
      map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "ReligiousEvents", function () {
      map.getCanvas().style.cursor = "";
    });
  };

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <img src={loader} alt="Loading..." />
        </div>
      ) : (
        ""
      )}
      <div className="nearby-container">
        <div className={loading ? "" : "map-container"} ref={mapContainerRef}></div>
        {id && <EventDetail eventId={id} />}
      </div>
    </>
  );
};

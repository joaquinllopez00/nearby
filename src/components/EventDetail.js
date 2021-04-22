import { useEffect, useState } from "react";
// import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { showEventDetail, hideEventDetail } from "../actions/eventActions";
const Events = [
  {
    name: "Community Clean-Up",
    type: "Community",
    time: "12:05pm",
    addr: "Indianapolis, IN",
    id: 1,
    location: [-86.17434153813191, 39.73411177758943],
    description: "Farts upon farts",
  },
  {
    name: "Park Clean-Up",
    type: "Community",
    time: "12:15pm",
    addr: "Indianapolis, IN",
    id: 2,
    location: [-86.11599638182919, 39.740674968989815],
    description: "words words words",
  },
  {
    name: "Soup Kitchen",
    type: "Community",
    time: "11:05am",
    addr: "Indianapolis, IN",
    id: 3,
    location: [-86.13018582931184, 39.743135826992614],
    description: "words words words",
  },
  {
    name: "Rebuilding Apartments",
    type: "Community",
    time: "10:00am",
    id: 4,
    addr: "Indianapolis, IN",
    location: [-86.1176545496681, 39.74726050336097],
    description: "words words words",
  },
  {
    name: "Food Drive",
    type: "Party",
    time: "2:00pm",
    addr: "Indianapolis, IN",
    id: 5,
    location: [-86.15569846427867, 39.770011077887574],
    description: "words words words",
  },
  {
    name: "Neighborhood Bonfire",
    type: "Party",
    time: "12:05pm",
    addr: "Indianapolis, IN",
    id: 6,
    location: [-86.18434153813191, 39.63411177758943],
    description: "Farts upon farts",
  },
];

export const EventDetail = (id) => {
  const { showEvent } = useSelector((state) => state.events);
  const dispatch = useDispatch();
  useEffect(() => {
    let event = Events.filter((event) => id.eventId === event.id);
    setEvent(event);
  }, [id]);

  const [event, setEvent] = useState(null);

  const handleEvent = () => {
    if (showEvent === false) {
      dispatch(showEventDetail());
    } else {
      dispatch(hideEventDetail());
    }
  };

  return (
    <>
      <button className="hide-event" onClick={handleEvent}>
        <FontAwesomeIcon icon={faArrowRight} size="2x" className={showEvent ? "" : "flipped"} />
      </button>
      <div className={`event-detail-container ${showEvent ? "shown" : "arrow-icon"} `}>
        {event ? (
          <>
            <div className="event-header">
              <h2>{event[0].name}</h2>
              <p>{event[0].type}</p>
            </div>
          </>
        ) : (
          <div className="event-header"></div>
        )}
      </div>
    </>
  );
};

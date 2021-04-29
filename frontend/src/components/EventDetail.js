import { useEffect, useState } from "react";
// import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { showEventDetail, hideEventDetail } from "../actions/eventActions";
import { addToParticipants } from "../api";
import locked from "../assets/locked.png";
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

export const EventDetail = (eventDetail) => {
  const { showEvent } = useSelector((state) => state.events);
  const { events } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    let event = events.filter((event) => eventDetail.eventId === event._id);
    setEvent(event);
    console.log(event);
  }, [eventDetail]);

  const [event, setEvent] = useState(null);
  const [password, setPassword] = useState("");
  const handleEvent = () => {
    if (showEvent === false) {
      dispatch(showEventDetail());
    } else {
      dispatch(hideEventDetail());
    }
  };

  const handleSubmit = async () => {
    console.log(event);
    if (password === event[0].password) {
      const data = await addToParticipants(user.id, event[0].eventId, event[0].participants);
      event[0].participants = [...event[0].participants, user.id];
      console.log(data);
      setEvent([data.updatedEvent]);
    } else {
      return;
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
              <h2>{event[0].title}</h2>
              <div className="event-subheader">
                <div className="type-container">
                  <p>Type: &nbsp;</p>
                  <p style={{ color: "Pink" }}> {event[0].type}</p>
                </div>

                <p>Host: {event[0].host}</p>
              </div>
            </div>
            <div className="event-content-container">
              {event[0].participants.includes(user.id) === false && event[0].private === true ? (
                <div className="private-container">
                  <img src={locked} alt="locked-icon" />
                  <p>
                    This Event is private. Please request the password from the host. If you have the password you can
                    enter it below to gain access.
                  </p>
                  <div className="password-container">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    ></input>
                    <button
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ) : (
                <p>This event is not private</p>
              )}
            </div>
          </>
        ) : (
          <div className="event-header"></div>
        )}
      </div>
    </>
  );
};

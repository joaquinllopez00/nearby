import { useEffect, useState } from "react";
// import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { showEventDetail, hideEventDetail } from "../actions/eventActions";
import { addToParticipants } from "../api";
import locked from "../assets/locked.png";

export const EventDetail = (eventDetail) => {
  const { showEvent } = useSelector((state) => state.events);
  const { events } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    let event = events.filter((event) => eventDetail.eventId === event._id);
    setEvent(event);
    let eventType = event[0].type;
    switch (eventType) {
      case "Religious":
        setColor("#FFCC33");
        break;
      case "Party":
        setColor("pink");
        break;
      default:
        setColor("black");
    }
  }, [eventDetail]);

  const [event, setEvent] = useState(null);
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("");
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
              {event[0].private === true ? <p>This event is private</p> : ""}
              <div className="event-subheader">
                <div className="type-container">
                  <p>Type: &nbsp;</p>
                  <p style={{ color: `${color}` }}> {event[0].type}</p>
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
                <div className="public-container">
                  <div className="public-description-container">
                    <h3>Details</h3>
                    <div className="public-details-container">
                      <p>{event[0].description}</p>
                      <div className="public-wwt-container">
                        <h3>When:</h3>
                        <p>{event[0].time}</p>
                      </div>
                      <div className="public-wwt-container">
                        <h3>Where:</h3>
                        <p>{event[0].address}</p>
                      </div>
                    </div>
                  </div>
                </div>
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

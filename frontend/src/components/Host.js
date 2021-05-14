import { useState } from "react";
import { createEvent } from "../api";
import { useSelector } from "react-redux";
export const HostAnEvent = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [privacy, setPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  //checkbox
  const user = useSelector((state) => state.user.user);
  const privacyFunc = (e) => {
    const privateRadio = document.getElementById("privateChecked");
    const publicRadio = document.getElementById("publicChecked");
    const currentEl = e.target;
    console.log(currentEl);
    if (currentEl === privateRadio) {
      if (publicRadio.checked === true) {
        publicRadio.checked = false;
        return setPrivate(true);
      }
    } else {
      if (privateRadio.checked === true) {
        privateRadio.checked = false;
        return setPrivate(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createEvent(title, address, privacy, password, time, type, date, description, user);
    setMessage(res.message);
    setTimeout(() => {
      setMessage("");
    }, 3500);
    console.log(res.message);
  };
  return (
    <div className="host-container">
      <div className="host-content-container">
        <div className="host-header-container">
          <h2>Host an Event</h2>
        </div>
        <div className="host-add-event-container">
          <form onSubmit={(e) => handleSubmit(e)} className="host-form">
            <div className="host-input-container">
              <label htmlFor="title">Title</label>
              <input
                required
                type="text"
                className="host-form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="host-input-container">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="host-form-input"
                value={address}
                placeholder="Street Address, City, State, Zipcode"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="host-input-container">
              <label htmlFor="privacy">Privacy</label>
              <div className="host-radio-container">
                <label htmlFor="private">Public</label>
                <input required type="radio" id="publicChecked" onChange={(e) => privacyFunc(e)} />
              </div>
              <div className="host-radio-container">
                <label htmlFor="private">Private</label>
                <input required id="privateChecked" type="radio" onChange={(e) => privacyFunc(e)} />
              </div>
            </div>
            {privacy === true ? (
              <div className="host-input-container">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  className="host-form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            ) : (
              ""
            )}
            <div className="host-input-container">
              <label htmlFor="time">Time</label>
              <input
                required
                type="text"
                className="host-form-input"
                value={time}
                placeholder="ex. 7:30pm - 8:30pm"
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="host-input-container">
              <label htmlFor="date">Date</label>
              <input
                required
                type="text"
                className="host-form-input"
                value={date}
                placeholder="mm/dd/year"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="host-input-container">
              <label htmlFor="description">Description</label>
              <textarea
                required
                type="textarea"
                value={description}
                placeholder="ex. Come celebrate the New Year with us"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {/* <div className="host-input-container">
              <label htmlFor="privacy">Privacy</label>
              <div className="host-radio-container">
                <label htmlFor="private">Community</label>
                <input type="radio" classname="typeRadio" id="communityChecked" onChange={(e) => typeFunc(e)} />
              </div>
              <div className="host-radio-container">
                <label htmlFor="Religious">Religious</label>
                <input id="religiousChecked" className="typeRadio" type="radio" onChange={(e) => typeFunc(e)} />
              </div>
              <div className="host-radio-container">
                <label htmlFor="Party">Party</label>
                <input id="PartyChecked" className="typeRadio" type="radio" onChange={(e) => typeFunc(e)} />
              </div>
            </div> */}
            <div className="host-input-container">
              <label htmlFor="event type">Event Type</label>
              <select required value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Religious">Religious</option>
                <option value="Community">Community</option>
                <option value="Party">Party</option>
                <option value="Music">Music</option>
              </select>
            </div>
            <input type="submit" />
          </form>
          {message ? <h2> {message}</h2> : ""}
        </div>
      </div>
    </div>
  );
};

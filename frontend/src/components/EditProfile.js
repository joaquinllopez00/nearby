import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { TweenMax, Power3 } from "gsap";
import { useDispatch } from "react-redux";
import { editProfilePage } from "../api";
import { setUser } from "../actions/userActions";

export const EditProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  let editPage = useRef(null);
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [description, setDescription] = useState(user.description);
  const [message, setMessage] = useState("");

  useEffect(() => {
    TweenMax.fromTo(editPage, { y: -40, opacity: 0 }, { y: 0, opacity: 1, ease: Power3.easeIn });
  }, [user]);
  const goBack = () => {
    history.push("/profile");
  };

  const submitEdits = async () => {
    const data = await editProfilePage(user.username, username, name, description);
    console.log(data);
    if (data.message === "Worked") {
      setMessage("Successfully updated your account");
      dispatch(setUser(data.updatedUser));
    }

    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  return (
    <div className="edit-page" ref={(e) => (editPage = e)}>
      <div className="edit-header-container">
        <FontAwesomeIcon
          onClick={() => {
            goBack();
          }}
          className="arrow-left"
          icon={faArrowLeft}
        ></FontAwesomeIcon>
        <h2>Edit Profile</h2>
      </div>
      <div className="edit-content-container">
        <h3>Username</h3>
        <input value={username} onChange={(e) => setUsername(e.target.value)}></input>
      </div>
      <div className="edit-content-container">
        <h3>Name</h3>
        <input value={name} onChange={(e) => setName(e.target.value)}></input>
      </div>
      <div className="edit-content-container">
        <h3>Description</h3>
        <textarea type="textbox" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <p>*Note: If any value is left blank, it will not appear on your profile.</p>
      {message === "" ? "" : <h3>{message}</h3>}
      <button
        type="submit"
        className="edit-profile-submit"
        onClick={() => {
          submitEdits();
        }}
      >
        Submit
      </button>
    </div>
  );
};

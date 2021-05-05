import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { TweenMax, Power3 } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { setUser } from "../actions/userActions";
export const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.user);
  let profile = useRef(null);
  const [pathName, setPathName] = useState("");

  useEffect(() => {
    TweenMax.fromTo(
      profile,
      1,
      {
        y: -40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: Power3.easeInOut,
      },
    );
    if (window.location.href.split("/")[4]) {
      setPathName(window.location.href.split("/")[4]);
    } else {
      setPathName("profile");
    }
  }, [user, pathName]);

  const editProfile = () => {
    history.push("/profile/edit-profile");
  };

  return (
    <div className="profile" ref={(e) => (profile = e)}>
      {user.length !== 0 ? (
        <div className="profile-header-container">
          <h2>{user.username}</h2>
          <h3>{user.name}</h3>
          <div className="description-container">
            <p>Friends: {user.friends}</p>
            <p>Events Completed: {user.eventsCompleted === undefined ? 0 : user.eventCompleted.length() + 1}</p>
          </div>
          <p>{user.description}</p>
          <div className="edit-btn-container">
            <button onClick={() => editProfile()} className="edit-profile">
              Edit Profile
            </button>
            <FontAwesomeIcon icon={faCog} className="settings-btn" onClick={() => dispatch(setUser(""))} />
          </div>
        </div>
      ) : (
        <>
          {pathName === "profile" && (
            <div className="sign-container">
              <div className="profile-nouser-container">
                <h2>Looks like you aren't logged in,</h2>
                <p>
                  Sign in{" "}
                  <Link onClick={() => setPathName("signin")} to="/profile/signin">
                    Here
                  </Link>
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TweenMax, Power3 } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { createUser, signIn } from "../api";
import { setUser } from "../actions/userActions";
import { SignInComponent } from "./SignIn";
import { SignUpComponent } from "./SignUp";
export const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.user);

  let profile = useRef(null);
  const [pathName, setPathName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
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
      console.log("hello");
    } else {
      setPathName("profile");
    }
    console.log(user);
  }, [user, pathName]);

  return (
    <div className="profile" ref={(e) => (profile = e)}>
      {user.length !== 0 ? (
        <h1>PROFILE</h1>
      ) : (
        <>
          {pathName === "profile" && (
            <div className="profile-nouser-container">
              <h2>Looks like you aren't logged in,</h2>
              <p>
                Sign in{" "}
                <Link onClick={() => setPathName("signin")} to="/profile/signin">
                  Here
                </Link>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

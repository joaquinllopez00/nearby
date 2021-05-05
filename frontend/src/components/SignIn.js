import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TweenMax, Power3 } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { signIn } from "../api";
import { setUser } from "../actions/userActions";

export const SignInComponent = () => {
  let signin = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    TweenMax.fromTo(
      signin,
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
  }, []);
  const handleSignIn = async () => {
    console.log("signing in");
    let data = await signIn(username, password);
    console.log(data, "data");
    if (data.user) {
      await dispatch(setUser(data.user));
      console.log("hello");
      history.push("/profile");
    } else {
      setMessage(data.message);
    }
  };
  return (
    <div className="sign-container" ref={(e) => (signin = e)}>
      <div className="profile-container">
        <h2>Sign in</h2>
        <div className="login-container">
          <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
          <div className="profile-password-container">
            <input
              type={visible ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
            <FontAwesomeIcon
              className="icon"
              icon={visible ? faEye : faEyeSlash}
              onClick={() => setVisible(!visible)}
            />
          </div>
          <div className="message-container">
            <p>{message && message}</p>
          </div>
          <button onClick={() => handleSignIn()}>Submit</button>
        </div>
        <p>
          Need to sign up? Click <Link to="/profile/register">Here</Link>
        </p>
      </div>
    </div>
  );
};

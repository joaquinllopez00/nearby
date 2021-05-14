import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TweenMax, Power3 } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { getAddress, signIn } from "../api";
import { setUser } from "../actions/userActions";

export const SignInComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  let signin = useRef(null);
  let backdrop = useRef(null);
  useEffect(() => {
    TweenMax.fromTo(
      signin,
      1,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: Power3.easeInOut,
        boxShadow: "-25px -25px 50px -40px black ",
      },
    );
    TweenMax.fromTo(
      backdrop,
      1,
      {
        y: -20,
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
    let datar = await getAddress();
    console.log(datar);
    if (data.user) {
      await dispatch(setUser(data.user));
      console.log("hello");
      history.push("/profile");
    } else {
      setMessage(data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };
  return (
    <>
      <div className="sign-backdrop" ref={(e) => (backdrop = e)}></div>
      <div className="sign-container">
        <div className="profile-container" ref={(e) => (signin = e)}>
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
    </>
  );
};

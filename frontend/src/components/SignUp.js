import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { TweenMax, Power3 } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { createUser } from "../api";

export const SignUpComponent = () => {
  let signup = useRef(null);
  let backdrop = useRef(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    TweenMax.fromTo(
      signup,
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
  const handleSubmit = async () => {
    let data = await createUser(username, password, email);
    setMessage(data.message);
    setPassword("");

    // setEmail("");
    // setUsername("");
  };
  return (
    <>
      <div className="sign-backdrop" ref={(e) => (backdrop = e)}></div>
      <div className="sign-container">
        <div className="profile-container" ref={(e) => (signup = e)}>
          <h2>Sign Up</h2>
          <div className="signUp-container">
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
            <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username}></input>
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
            <button onClick={() => handleSubmit()}>Submit</button>
          </div>
          <p>
            Need to sign in? Click <Link to="/profile/signin">Here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

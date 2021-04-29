import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { TweenMax, Power3 } from "gsap";
import { useSelector } from "react-redux";
export const Nav = () => {
  const [toggle, setToggle] = useState(false);
  let navBar = useRef(null);
  let user = useSelector((state) => state.user);
  console.log(user);
  useEffect(() => {
    console.log(navBar);
    TweenMax.fromTo(
      navBar,
      0.8,
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
  }, [user]);
  return (
    <nav className="nav-container" ref={(e) => (navBar = e)}>
      <div className="logo">
        <Link to="/" className="logo">
          <h2>NEARBY.</h2>
        </Link>
      </div>
      <div
        className={`burger ${toggle ? "exit" : ""}`}
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        <div className="top-line bun"></div>
        <div className="middle-line bun"></div>
        <div className="bottom-line bun"></div>
      </div>
      <div className={`link-container ${toggle ? "visible" : ""}`}>
        <ul>
          <li className="about">
            <Link to="/what-is-nearby">What is Nearby?</Link>
          </li>
          <li className="nearby">
            <Link to="/nearby">See whats Nearby.</Link>
          </li>
          <li>
            <Link to="/profile">{user.user.length !== 0 ? "Profile" : "Sign In"}</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

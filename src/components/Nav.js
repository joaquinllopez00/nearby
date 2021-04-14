import { useState } from "react";
import { Link } from "react-router-dom";
export const Nav = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="nav-container">
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
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavBottom } from "./NavBottom";

export const NavTop = (props) => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };
  return (
    <>
      <header style={{zIndex:"100"}}>
        <div className="navigation">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <span className="navbar-brand mb-0 h1 logo">Let'sConnect</span>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse justify-content-end "
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav">
                  {window.location.pathname.slice(0, 5) === "/news" && (
                    <>
                      <li className="nav-item">
                        {window.location.pathname === "/news" ? (
                          <Link
                            className="nav-link active"
                            aria-current="page"
                            to="/news"
                          >
                            <span style={{ fontSize: "18px" }}>General</span>
                          </Link>
                        ) : (
                          <Link
                            className="nav-link"
                            aria-current="page"
                            to="/news"
                          >
                            <span style={{ fontSize: "18px" }}>General</span>
                          </Link>
                        )}
                      </li>
                      <li className="nav-item">
                        {window.location.pathname === "/news/business" ? (
                          <Link
                            className="nav-link active"
                            aria-current="page"
                            to="/news/business"
                          >
                            <span style={{ fontSize: "18px" }}>Business</span>
                          </Link>
                        ) : (
                          <Link
                            className="nav-link"
                            aria-current="page"
                            to="/news/business"
                          >
                            <span style={{ fontSize: "18px" }}>Business</span>
                          </Link>
                        )}
                      </li>
                      <li className="nav-item">
                        {window.location.pathname === "/news/entertainment" ? (
                          <Link
                            className="nav-link active"
                            aria-current="page"
                            to="/news/entertainment"
                          >
                            <span style={{ fontSize: "18px" }}>
                              Entertainment
                            </span>
                          </Link>
                        ) : (
                          <Link
                            className="nav-link"
                            aria-current="page"
                            to="/news/entertainment"
                          >
                            <span style={{ fontSize: "18px" }}>
                              Entertainment
                            </span>
                          </Link>
                        )}
                      </li>
                      <li className="nav-item">
                        {window.location.pathname === "/news/health" ? (
                          <Link
                            className="nav-link active"
                            aria-current="page"
                            to="/news/health"
                          >
                            <span style={{ fontSize: "18px" }}>Health</span>
                          </Link>
                        ) : (
                          <Link
                            className="nav-link"
                            aria-current="page"
                            to="/news/health"
                          >
                            <span style={{ fontSize: "18px" }}>Health</span>
                          </Link>
                        )}
                      </li>
                      <li className="nav-item">
                        {window.location.pathname === "/news/science" ? (
                          <Link
                            className="nav-link active"
                            aria-current="page"
                            to="/news/science"
                          >
                            <span style={{ fontSize: "18px" }}>Science</span>
                          </Link>
                        ) : (
                          <Link
                            className="nav-link"
                            aria-current="page"
                            to="/news/science"
                          >
                            <span style={{ fontSize: "18px" }}>Science</span>
                          </Link>
                        )}
                      </li>
                      <li className="nav-item">
                        {window.location.pathname === "/news/sports" ? (
                          <Link
                            className="nav-link active"
                            aria-current="page"
                            to="/news/sports"
                          >
                            <span style={{ fontSize: "18px" }}>Sports</span>
                          </Link>
                        ) : (
                          <Link
                            className="nav-link"
                            aria-current="page"
                            to="/news/sports"
                          >
                            <span style={{ fontSize: "18px" }}>Sports</span>
                          </Link>
                        )}
                      </li>
                      <li className="nav-item">
                        {window.location.pathname === "/news/technology" ? (
                          <Link
                            className="nav-link active"
                            aria-current="page"
                            to="/news/technology"
                          >
                            <span style={{ fontSize: "18px" }}>Technology</span>
                          </Link>
                        ) : (
                          <Link
                            className="nav-link"
                            aria-current="page"
                            to="/news/technology"
                          >
                            <span style={{ fontSize: "18px" }}>Technology</span>
                          </Link>
                        )}
                      </li>
                    </>
                  )}
                  {localStorage.getItem("token") ? (
                    <li className="nav-item">
                      <div
                        className="nav-link"
                        onClick={logOut}
                        style={{ fontSize: "18px", cursor: "pointer" }}
                      >
                        <strong>Log Out</strong>
                      </div>
                    </li>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to="/signin"
                          style={{ fontSize: "18px" }}
                        >
                          <strong>Sign In</strong>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to="/signup"
                          style={{ fontSize: "18px" }}
                        >
                          <strong>Sign Up</strong>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>

        {localStorage.getItem("token") && <NavBottom />}
      </header>
    </>
  );
};

import React, { useContext, useEffect, useState } from "react";
import noProfile from "../img/noProfile.png";
import "../css/Search.css";
import { FollowContext, UserContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const { getUser, userData } = useContext(UserContext);
  const { addRequest, unFollow } = useContext(FollowContext);
  const [search, setSearch] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  const getAllUsers = async () => {
    const response = await fetch("http://localhost:5000/api/user/getallusers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    setAllUsers(await response.json());
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    } else {
      getAllUsers();
      getUser();
    }
  }, [allUsers]);

  return (
    <div className="d-flex flex-column">
      <div className="search-section" style={{ zIndex: "100" }}>
        <form className="search-bar">
          <input
            type="search"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
      <div className="result-body mx-auto" style={{ zIndex: "100" }}>
        {allUsers.map((user) => {
          if (user.name.includes(search) && search !== "") {
            return (
              <div
                key={user._id}
                className="mx-4 my-4 d-flex justify-content-between"
              >
                <div className="d-flex">
                  <img
                    src={user.profilePic || noProfile}
                    className="rounded-circle"
                    width="40px"
                    height="40px"
                    alt="profile"
                  />
                  <div className="mx-4 mt-1" style={{ fontSize: "20px" }}>
                    <strong>{user.name}</strong>
                  </div>
                </div>
                <div className="">
                  <button
                    className="btn btn-primary btn-sm mt-1"
                    onClick={() => {
                      userData.followings.filter((following) => {
                        return following._id === user._id;
                      }).length === 1 ? unFollow(user._id):
                      addRequest(user._id);
                    }}
                    style={
                      user.requests.filter((requestId) => {
                        return requestId._id === userData._id;
                      }).length === 1
                        ? { backgroundColor: "white", color: "black" }
                        : {}
                    }
                  >
                    <strong>
                      {user.requests.filter((requestId) => {
                        return requestId._id === userData._id;
                      }).length === 1
                        ? "Requested"
                        : userData.followings.filter((following) => {
                            return following._id === user._id;
                          }).length === 1 ? "unfollow" : "follow"}
                    </strong>
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

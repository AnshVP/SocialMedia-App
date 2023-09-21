import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "./Post";
import { FollowContext, PostContext, UserContext } from "../context/MyContext";
import "../css/Sidebar.css";
import noProfile from "../img/noProfile.png";
import like from "../img/like.gif";
import unlike from "../img/unlike.gif";

export const Home = () => {
  const { getUser, userData } = useContext(UserContext);
  const { posts, getPosts, editLikes } = useContext(PostContext);
  const { getRecommendedUsers, recommendations, addRequest, addFollower, followBack, removeRequest } =
    useContext(FollowContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    } else {
      getUser();
      getPosts();
      getRecommendedUsers();
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    } else {
      getUser();
    }
  }, [recommendations]);

  function openNav() {
    document.getElementById("mySidebar").style.width = "25%";
    document.getElementById("main").style.display = "none";
  }

  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.display = "block";
  }

  return (
    <>
      <div className="home d-flex">
        <div className="mx-auto" style={{ zIndex: "100" }}>
          {posts.length !== 0
            ? posts.map((data) => {
                let liked = data.likes.filter(
                  (likedBy) => likedBy._id === userData._id
                );
                return (
                  <div
                    key={data._id}
                    className="mx-auto"
                    onDoubleClick={() => {
                      editLikes(data._id);
                      if (liked.length === 0) {
                        document.getElementById(
                          `${data._id}like`
                        ).style.display = "block";
                        setTimeout(() => {
                          document.getElementById(
                            `${data._id}like`
                          ).style.display = "none";
                        }, 1500);
                      } else {
                        document.getElementById(
                          `${data._id}unlike`
                        ).style.display = "block";
                        setTimeout(() => {
                          document.getElementById(
                            `${data._id}unlike`
                          ).style.display = "none";
                        }, 1500);
                      }
                    }}
                    style={{ position: "relative" }}
                  >
                    <div
                      style={{
                        width: "100%",
                        position: "absolute",
                        top: "25%",
                        left: "35%",
                        display: "none",
                      }}
                      id={`${data._id}like`}
                    >
                      <img
                        src={like}
                        width="30%"
                        style={{
                          textAlign: "center",
                        }}
                        alt="liked"
                      ></img>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        position: "absolute",
                        top: "25%",
                        left: "35%",
                        display: "none",
                      }}
                      id={`${data._id}unlike`}
                    >
                      <img
                        src={unlike}
                        width="30%"
                        style={{
                          textAlign: "center",
                        }}
                        alt="disliked"
                      ></img>
                    </div>
                    <Post
                      postData={data}
                      heart={liked}
                      postWidth="450px"
                      font="16px"
                      imageHeight="350px"
                      likedBy={
                        data.likes.length !== 0
                          ? data.likes.length === 1
                            ? [data.likes[0].name]
                            : [data.likes[0].name, data.likes[1].name]
                          : []
                      }
                      profilePic={data.postedBy.profilePic}
                    />
                  </div>
                );
              })
            : ""}
        </div>
        <div
          className="card text-white bg-dark mb-3 "
          style={{
            maxWidth: "25%",
            position: "fixed",
            right: "0px",
            fontFamily: "'Dosis', sans-serif",
          }}
        >
          <h5 className="card-header mx-auto mt-3">Recomendations</h5>

          <div className="card-body">
            <ul
              className="list-group list-group-flush"
              style={{ height: "80vh", width:"23vw" }}
            >
              {recommendations.length
                ? recommendations.map((user) => {
                    return (
                      <li
                        key={user._id}
                        className="list-group-item d-flex justify-content-between my-2"
                        style={{
                          borderRadius: "10px 10px",
                          backgroundColor: "#cbe1f7",
                        }}
                      >
                        <div className="d-flex">
                          <img
                            src={user.profilePic || noProfile}
                            className="rounded-circle"
                            width="40px"
                            height="40px"
                            alt="profile"
                          />
                          <div
                            className="mx-4 mt-1"
                            style={{ fontSize: "20px" }}
                          >
                            <strong>{user.name}</strong>
                          </div>
                        </div>
                        <div className="">
                          <button
                            className="btn btn-primary btn-sm mt-1"
                            onClick={() => {
                              addRequest(user._id);
                            }}
                            style={
                              user.requests.filter((requestId) => {
                                return requestId === userData._id;
                              }).length === 1
                                ? { backgroundColor: "white", color: "black" }
                                : {}
                            }
                          >
                            <strong>
                              {user.requests.filter((requestId) => {
                                return requestId === userData._id;
                              }).length === 1
                                ? "Requested"
                                : "follow"}
                            </strong>
                          </button>
                        </div>
                      </li>
                    );
                  })
                : ""}
            </ul>
          </div>
        </div>

        <div id="mySidebar" className="sidebar">
          <h5 className="text-center mb-4" style={{ color: "white" }}>
            Notifications
          </h5>
          <a className="closebtn" onClick={closeNav}>
            ×
          </a>
          <ul
            className="list-group list-group-flush mx-2"
            style={{ height: "80vh" }}
          >
            {userData.requests ? (
              userData.requests.map((request) => {
                return (
                  <li
                    key={request._id}
                    className="list-group-item my-1"
                    style={{
                      borderRadius: "10px 10px",
                      backgroundColor: "#cbe1f7",
                    }}
                  >
                    <div style={{ fontSize: "18px" }}>
                      <div className="d-flex justify-content-between">
                        <div>
                          <img
                            src={request.profilePic || noProfile}
                            className="rounded-circle"
                            width="30px"
                            height="30px"
                            alt="profile"
                          />
                        </div>
                        <div className="mx-3">
                          <span style={{ color: "rgb(12, 12, 199)" }}>
                            {request.name}
                          </span>
                          <span> requested to follow you</span>
                        </div>
                        <div>
                          <button
                            className="btn btn-primary btn-sm mx-auto"
                            onClick={() =>
                              userData.followers.filter(
                                (follower) => follower.name === request.name
                              ).length === 0
                                ? addFollower(request._id)
                                : userData.followings.filter(
                                  (following) => following.name === request.name
                                ).length === 0 ? followBack(request._id) : removeRequest(request._id)
                            }
                          >
                            {userData.followers.filter((follower) => {
                              return follower._id === request._id;
                            }).length === 0
                              ? "Accept" : userData.followings.filter(
                                (following) => following.name === request.name
                              ).length === 0 ? "FollowBack" : "confirm" }
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })
            ) : (
              <li
                className="list-group-item my-1"
                style={{
                  borderRadius: "10px 10px",
                  backgroundColor: "#cbe1f7",
                }}
              >
                No Notifications Available
              </li>
            )}
          </ul>
        </div>

        <div id="main">
          <button className="openbtn" onClick={openNav}>
            ☰ Notification Section
          </button>
        </div>
      </div>
    </>
  );
};

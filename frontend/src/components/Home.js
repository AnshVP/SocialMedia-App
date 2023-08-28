import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "./Post";
import { PostContext, UserContext } from "../context/MyContext";
import like from "../img/like.gif";
import unlike from "../img/unlike.gif";

export const Home = () => {
  const { getUser, userData } = useContext(UserContext);
  const { posts, getPosts, editLikes } = useContext(PostContext);
  
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    } else {
      getUser();
      getPosts();
    }
  }, []);

  return (
    <>
      <div className="home d-flex">
        <div className="mx-auto" style={{ zIndex: "100" }}>
          {posts.map((data) => {
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
                    document.getElementById(`${data._id}like`).style.display =
                      "block";
                    setTimeout(() => {
                      document.getElementById(`${data._id}like`).style.display =
                        "none";
                    }, 1500);
                  } else {
                    document.getElementById(`${data._id}unlike`).style.display =
                      "block";
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
                />
                
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

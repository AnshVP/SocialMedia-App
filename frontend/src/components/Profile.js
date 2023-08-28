import React, { useContext, useEffect, useState } from "react";
import image from "../img/img2.png";
import { Post } from "./Post";
import { UserContext } from "../context/MyContext";

export const Profile = () => {
  const [allPosts, setAllPosts] = useState([]);
  const { getUser, userData } = useContext(UserContext);

  useEffect(() => {
    getUser();
    const fetchposts = async () => {
      const response = await fetch(
        "http://localhost:5000/api/post/fetchmyposts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const allPosts = await response.json();
      setAllPosts(allPosts);
    };
    fetchposts();
  }, []);

  return (
    <div
      className="d-flex justify-content-center profile"
      style={{ fontFamily: "'Dosis', sans-serif" }}
    >
      <div style={{ zIndex: 100, width: "100%" }}>
        <div
          className="container d-flex profile-details"
          style={{
            background: "white",
            boxShadow: "0px 20px 10px grey",
            zIndex: 100,
          }}
        >
          <div className="d-flex flex-column">
            <img
              src={image}
              className="rounded-circle mx-auto"
              width="50%"
              alt="profile"
            />
            <strong className="mx-auto" style={{ display: "block" }}>
              {userData.name}
            </strong>
          </div>

          <div className="container my-4">
            <div className="d-flex justify-content-around">
              <div className="text-center">
                <div>
                  <>{allPosts.length}</>
                </div>
                <strong>Posts</strong>
              </div>
              <div className="text-center">
                <div>
                  <strong>{allPosts.length}</strong>
                </div>
                <strong>Followers</strong>
              </div>
              <div className="text-center">
                <div>
                  <strong>{allPosts.length}</strong>
                </div>
                <strong>Following</strong>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex my-4">
            <div className="mx-auto" style={{ color: "#3681b4" }}>
              <h1>My Posts</h1>
              <div style={{ border: "2px solid black" }}></div>
            </div>
          </div>

          <div className="largeDevice">
            {allPosts.map((data) => {
              let liked = data.likes.filter((id) => id === userData._id);
              return (
                <div className="mx-auto" key={data._id}>
                  <Post
                    postData={data}
                    postWidth="330px"
                    font="15px"
                    imageHeight="220px"
                    heart={liked}
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
          <div className="smallDevice">
            {allPosts.map((data) => {
              return (
                <div className="mx-auto my-1" key={data._id}>
                  <img
                    src={data.photo}
                    alt="post"
                    style={{
                      width: "30vw",
                      padding: "5px",
                      background: "white",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

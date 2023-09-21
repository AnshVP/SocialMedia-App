import { useState } from "react";
import { FollowContext } from "./MyContext";

const FollowRequest = (props) => {
  const [recommendations, setRecommendations] = useState([]);
  const addRequest = async (userId) => {
    const response = await fetch(
      "http://localhost:5000/api/follow/addrequest",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ userId }),
      }
    );
    const data = await response.json();
    console.log(data);
    getRecommendedUsers();
  };
  const removeRequest = async (userId) => {
    const response = await fetch(
      `http://localhost:5000/api/follow/removerequest/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        }
      }
    );
    const data = await response.json();
    console.log(data);
    getRecommendedUsers();
  };
  
  const addFollower = async (userId) => {
    await fetch("http://localhost:5000/api/follow/addfollower", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ userId }),
    });
    getRecommendedUsers();
  };

  const unFollow = async (userId) => {
    await fetch(`http://localhost:5000/api/follow/unfollow/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    getRecommendedUsers();
  };
 
  const followBack = async (userId) => {
    await fetch("http://localhost:5000/api/follow/followback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ userId }),
    });
    getRecommendedUsers();
  };

  const getRecommendedUsers = async () => {
    const response = await fetch("http://localhost:5000/api/follow/getrecommendedusers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setRecommendations(data);
  };

  return (
    <FollowContext.Provider
      value={{ recommendations, addRequest, getRecommendedUsers, addFollower, followBack, unFollow, removeRequest }}
    >
      {props.children}
    </FollowContext.Provider>
  );
};

export default FollowRequest;

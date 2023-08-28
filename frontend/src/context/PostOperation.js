import { useState } from "react";
import { PostContext } from "./MyContext";

const PostOperation = (props) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await fetch(
      "http://localhost:5000/api/post/fetchallposts",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    setPosts(data);
  };

  const editLikes = async (postId) => {
    await fetch("http://localhost:5000/api/post/likes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ postId }),
    });
    getPosts();
  };

  const addComment = async (postId, comment) => {
    await fetch("http://localhost:5000/api/post/addcomment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ postId, comment }),
    });
    getPosts();
  };

  return (
    <PostContext.Provider value={{ posts, getPosts, editLikes, addComment }}>
      {props.children}
    </PostContext.Provider>
  );
};

export default PostOperation;

import React, { useContext, useEffect, useState } from "react";
import "../css/CreatePost.css";
import { useNavigate } from "react-router-dom"; 
import {ToastContext} from "../context/MyContext";

export const CreatePost = () => {
  const context = useContext(ToastContext);
  const { error, success } = context;
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (imageUrl) {
      async function postData() {
        console.log(location);
        const date = new Date
        const response = await fetch(
          "http://localhost:5000/api/post/createpost",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
              photo: imageUrl,
              caption: caption,
              location: location,
              postedOn: date.toLocaleString()
            }),
          }
        );
        const json = await response.json();
        if (!json.errors) {
          navigate("/");
          success("Succesfully Posted");
        } else if (json.errors) {
          error(json.errors[0].msg);
        }
      }
      postData();
    }
  }, [imageUrl]);

  const postDetails = async (e) => {
    e.preventDefault();
    if (!image) {
      error("Kindly Upload the Photo!!");
    } else {
      const url = "https://api.cloudinary.com/v1_1/letsconnect/image/upload";
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "social-app");
      data.append("cloud_name", "letsconnect");

      const fetched = await fetch(url, {
        method: "post",
        body: data,
      });
      const parsed = await fetched.json();
      setImageUrl(parsed.url);
    }
  };

  const loadFile = function (event) {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src);
    };
  };
  return (
    <>
      <div className="mx-auto my-5 row d-flex justify-content-center">
        <div className="box col-md-6">
          <h2>Create a New Post</h2>
          <form onSubmit={(e) => postDetails(e)}>
            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="img"
                className="btn btn-warning my-3"
                style={{
                  color: "white",
                  width: "40%",
                  margin: "auto",
                }}
              >
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                id="img"
                name="img"
                onChange={(e) => {
                  loadFile(e);
                  setImage(e.target.files[0]);
                }}
                style={{
                  display:"none"
                }}
              />
              <img
                src="https://department.rajasthan.gov.in/SectoralPortal/assets/images/no-img.png"
                id="output"
                alt="post"
                style={{ objectFit: "cover", width: "90%" }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="caption">Caption:</label>
              <textarea
                id="caption"
                name="caption"
                rows="2"
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
              ></textarea>
            </div>

            <button className="btn btn-primary" type="submit">
              <span style={{ fontSize: "21px", fontWeight: "bolder" }}>
                Create Post
              </span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

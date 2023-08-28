import React from "react";

export const NewsItems = (props) => {
  const { title, imageUrl, description, newsUrl, source, date, author } = props;
  return (
    <div>
      <div className="card bg-info my-3 mx-4" style={{ color: "white" }}>
        <img src={imageUrl} className="card-img-top" alt="" />
        <div className="card-body">
          <h5 className="card-title">
            {title}
            <span
              className="badge position-absolute bg-danger border border-light"
              style={{ right: "-7px", top: "-7px" }}
            >
              {source}
            </span>
          </h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              Published by "{author}" on {new Date(date).toGMTString()}
            </small>
          </p>
          <a href={newsUrl} className="btn btn-primary">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

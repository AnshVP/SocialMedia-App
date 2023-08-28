import React, { useEffect, useState } from "react";
import { NewsItems } from "./NewsItems";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "./Spinner";
import LoadingBar from "react-top-loading-bar";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Kalam:wght@700&display=swap');
</style>;

export const News = (props) => {
  // const api_key1 = process.env.REACT_APP_NEWS_API;
  // const api_key2 = "b2c5d4240b514b95a01358116579afc8";
  // const api_key2 = "45c3d78a547542cf82bdaf9822eec363";
  const api_key2 = "05d6fba76c3a41b18da388beacd8fbd0";
  const [articles, setArticles] = useState([]);
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const pageSize = 9;

  const updateNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${api_key2}&category=${props.category}&page=${page}&pageSize=${pageSize}${keyword}`;
    props.setProgress(30);
    setLoading(true);
    let response = await fetch(url);
    props.setProgress(50);
    let parsedData = await response.json();
    document.title = "News-India " + capitalize(props.category);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  const nextPage = async () => {
    setPage(page + 1);
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${api_key2}&category=${props.category}&page=${page+1}&pageSize=${pageSize}${keyword}`;
    setLoading(true);
    let response = await fetch(url);
    let parsedData = await response.json();
    setArticles(articles.concat(parsedData.articles));
    setLoading(false);
  };

  const capitalize = (text) => {
    return text[0].toUpperCase() + text.slice(1);
  };

  const search = () => {
    setPage(1);
    setKeyword(`&q=${text}`);
  };

  useEffect(() => {
    updateNews();
  }, [keyword]);

  return (
    <div className="my-3 mx-2">
      <div className="d-flex justify-content-center mx-4">
        <input
          className="form-control my-3"
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setText(e.target.value)}
          style={{ maxWidth: "600px", height: "40px" }}
        />
        <button
          className="btn btn-outline-primary mx-2 my-3"
          
          onClick={() => search()}
        >
          Search
        </button>
      </div>
      <div className="text-center">{loading && <Spinner />}</div>
       
      <LoadingBar
        height="4px"
        color="rgb(16, 112, 196)"
        progress={props.bar}
      />
      <InfiniteScroll
        dataLength={articles.length}
        next={nextPage}
        hasMore={articles.length !== totalResults}
        style={{ overflow: "hidden" }}
      >
        <div className="row mb-5">
          {articles.map((element) => {
            return (
              <div className="col-lg-4" key={element.title}>
                <NewsItems
                  title={
                    element.title ? element.title : "TITLE NOT AVAILABLE!!!"
                  }
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
                  }
                  description={
                    element.description
                      ? element.description
                      : "NO DESCRIPTION AVAILABLE!!!"
                  }
                  newsUrl={element.url}
                  source={element.source.name}
                  date={
                    element.publishedAt
                      ? element.publishedAt
                      : "Date not Available"
                  }
                  author={element.author ? element.author : "Unknown"}
                />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

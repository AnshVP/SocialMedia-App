import "./App.css";
import { SignIn } from "./components/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from "./components/SignUp";
import { Home } from "./components/Home";
import { NavTop } from "./components/NavTop";
import { Profile } from "./components/Profile";
import { News } from "./components/News";
import { useState } from "react";
import { Background } from "./components/Background";
import { CreatePost } from "./components/CreatePost";
import Toast from "./context/Toast";
import UserData from "./context/UserData";
import PostOperation from "./context/PostOperation";

function App() {
  const api_key = process.env.REACT_APP_NEWS_API;
  const [bar, setBar] = useState(10);
  const setProgress = (progress) => {
    setBar(progress);
  };
  return (
    <Toast>
      <UserData>
        <PostOperation>
          <BrowserRouter>
            <Background />
            <NavTop />

            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/signin" element={<SignIn />} />
              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/addpost" element={<CreatePost />} />
              <Route
                exact
                path="/news"
                element={
                  <News
                    setProgress={setProgress}
                    bar={bar}
                    api_key={api_key}
                    key="general"
                    category="general"
                  />
                }
              />
              <Route
                exact
                path="/news/business"
                element={
                  <News
                    setProgress={setProgress}
                    bar={bar}
                    api_key={api_key}
                    key="business"
                    category="business"
                  />
                }
              />
              <Route
                exact
                path="/news/entertainment"
                element={
                  <News
                    setProgress={setProgress}
                    bar={bar}
                    api_key={api_key}
                    key="entertainment"
                    category="entertainment"
                  />
                }
              />
              <Route
                exact
                path="/news/health"
                element={
                  <News
                    setProgress={setProgress}
                    bar={bar}
                    api_key={api_key}
                    key="health"
                    category="health"
                  />
                }
              />
              <Route
                exact
                path="/news/science"
                element={
                  <News
                    setProgress={setProgress}
                    bar={bar}
                    api_key={api_key}
                    key="science"
                    category="science"
                  />
                }
              />
              <Route
                exact
                path="/news/sports"
                element={
                  <News
                    setProgress={setProgress}
                    bar={bar}
                    api_key={api_key}
                    key="sports"
                    category="sports"
                  />
                }
              />
              <Route
                exact
                path="/news/technology"
                element={
                  <News
                    setProgress={setProgress}
                    bar={bar}
                    api_key={api_key}
                    key="technology"
                    category="technology"
                  />
                }
              />
            </Routes>
            <div style={{ height: "15vh" }}></div>
          </BrowserRouter>
        </PostOperation>
      </UserData>
    </Toast>
  );
}

export default App;

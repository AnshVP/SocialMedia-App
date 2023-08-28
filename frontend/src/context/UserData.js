import { useState } from "react";
import { UserContext } from "./MyContext";

const UserData = (props) => {
  const [userData, setUserData] = useState({});

  const getUser = async () => {
    const response = await fetch("http://localhost:5000/api/auth/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setUserData({_id:data._id,name:data.name});
  };

  return (
    <UserContext.Provider value={{ getUser, userData }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserData;

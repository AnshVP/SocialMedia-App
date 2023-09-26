import React, { useContext, useEffect } from "react";
import { PrettyChatWindow } from "react-chat-engine-pretty";
import { UserContext } from "../context/MyContext";

export const Chat = () => {
  const { getUser, userData } = useContext(UserContext);
  useEffect(() => {
    getUser()
  }, [])
  
  return (
    <div>
      <PrettyChatWindow
        height="88vh"
        projectId="f4169764-6975-44f2-a0e8-f9f4850cb5a6"
        username={userData.name}
        secret={userData._id}
      />
    </div>
  );
};

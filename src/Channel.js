import React from "react";
import Members from "./Members";
import ChanelInfo from "./ChannelInfo";
import Messages from "./Messages";
import ChatInputBox from "./ChatInputBox";

const Channel = ({ user }) => {
  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChanelInfo></ChanelInfo>
        <Messages></Messages>
        <ChatInputBox user={user}></ChatInputBox>
      </div>
      <Members />
    </div>
  );
};

export default Channel;

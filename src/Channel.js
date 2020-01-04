import React from "react";
import Members from "./Members";
import ChanelInfo from "./ChannelInfo";
import Messages from "./Messages";
import ChatInputBox from "./ChatInputBox";

const Channel = ({ user, channelId }) => {
  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChanelInfo channelId={channelId} />
        <Messages channelId={channelId} />
        <ChatInputBox user={user} channelId={channelId} />
      </div>
      <Members />
    </div>
  );
};

export default Channel;

import React from "react";
import useDoc from "./UseDoc";

const ChannelInfo = ({ channelId }) => {
  const channel = useDoc(`chanels/${channelId}`);
  return (
    <div className="ChannelInfo">
      <div className="Topic">
        Topic: <input readOnly className="TopicInput" defaultValue={channel && channel.topic} />
      </div>
      <div className="ChannelName">#{channelId}</div>
    </div>
  );
};

export default ChannelInfo;

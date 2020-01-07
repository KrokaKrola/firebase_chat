import React, { useEffect } from 'react';
import Members from './Members';
import ChanelInfo from './ChannelInfo';
import Messages from './Messages';
import ChatInputBox from './ChatInputBox';
import { db } from './firebase';

const Channel = ({ user, channelId }) => {
  useEffect(() => {
    db.doc(`users/${user.uid}`).update({
      [`chanels.${channelId}`]: true
    });
  }, [user, channelId]);

  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChanelInfo channelId={channelId} />
        <Messages channelId={channelId} />
        <ChatInputBox user={user} channelId={channelId} />
      </div>
      <Members channelId={channelId} />
    </div>
  );
};

export default Channel;

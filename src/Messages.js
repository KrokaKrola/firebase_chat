import React from "react";
import useCollection from './UseCollection';

const Messages = () => {
  const messages = useCollection("chanels/general/messages", 'createdAt');

  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      <div>
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">12/6/2018</div>
          <div className="DayLine" />
        </div>
        {messages &&
          messages.map((message, index) =>
            index === 0 ? (
              <div key={message.id}>
                <div className="Message with-avatar">
                  <div className="Avatar" />
                  <div className="Author">
                    <div>
                      <span className="UserName">Ryan Florence </span>
                      <span className="TimeStamp">
                        {Date(message.createdAt.seconds)}
                      </span>
                    </div>
                    <div className="MessageContent">{message.text}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div key={message.id}>
                <div className="Message no-avatar">
                  <div className="MessageContent">{message.text}</div>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default Messages;

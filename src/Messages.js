import React from "react";
import useCollection from "./UseCollection";
import useDocWithCache from "./UseDocWithCache";
import formatDate from "date-fns/format";
import isSameDay from "date-fns/isSameDay";

const Messages = ({ channelId }) => {
  const messages = useCollection(`chanels/${channelId}/messages`, "createdAt");

  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      <div>
        {messages &&
          messages.map((message, index) => {
            const previous = messages[index - 1];
            const showAvatar = shouldShowAvatar(previous, message);
            const showDay = shouldShowDay(previous, message);

            return showAvatar ? (
              <AvatarMessage
                showDay={showDay}
                key={message.id}
                message={message}
              />
            ) : (
              <div key={message.id}>
                <div className="Message no-avatar">
                  <div className="MessageContent">{message.text}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

function shouldShowAvatar(previous, message) {
  const isFirst = !previous;
  if (isFirst) {
    return true;
  }
  const differentUser = message.user.id !== previous.user.id;
  if (differentUser) {
    return true;
  }

  const hasBeenAwhile =
    message.createdAt.seconds - previous.createdAt.seconds > 180;
  return hasBeenAwhile;
}

function shouldShowDay(previous, message) {
  const isFirst = !previous;
  if (isFirst) {
    return true;
  }

  const isNewDay = !isSameDay(
    previous.createdAt.seconds * 1000,
    message.createdAt.seconds * 1000
  );

  return isNewDay;
}

const AvatarMessage = ({ message, showDay }) => {
  const author = useDocWithCache(message.user.path);

  return (
    <div>
      {showDay && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">
            {formatDate(message.createdAt.seconds * 1000, "do MMMM y")}
          </div>
          <div className="DayLine" />
        </div>
      )}
      <div className="Message with-avatar">
        <div
          className="Avatar"
          style={{
            backgroundImage: author ? `url("${author.photoUrl}")` : ""
          }}
        />
        <div className="Author">
          <div>
            <span className="UserName">{author && author.displayName}</span>{" "}
            <span className="TimeStamp">
              {formatDate(message.createdAt.seconds * 1000, "h:mm a")}
            </span>
          </div>
          <div className="MessageContent">{message.text}</div>
        </div>
      </div>
    </div>
  );
};

export default Messages;

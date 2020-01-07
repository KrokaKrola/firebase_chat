import React, { useEffect, useRef } from 'react';
import useCollection from './UseCollection';
import useDocWithCache from './UseDocWithCache';
import formatDate from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';

function ChatScroller(props) {
  const ref = useRef();
  const shouldScrollRef = useRef(true);

  useEffect(() => {
    if (shouldScrollRef.current) {
      const node = ref.current;
      node.scrollTop = node.scrollHeight;
    }
  });

  const handleScroll = () => {
    const node = ref.current;
    const { scrollTop, clientHeight, scrollHeight } = node;
    const atBottom = scrollHeight === clientHeight + scrollTop;
    shouldScrollRef.current = atBottom;
  };

  return <div {...props} ref={ref} onScroll={handleScroll} />;
}

const Messages = ({ channelId }) => {
  const messages = useCollection(`chanels/${channelId}/messages`, 'createdAt');

  return (
    <ChatScroller className="Messages">
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
    </ChatScroller>
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
            {formatDate(message.createdAt.seconds * 1000, 'do MMMM y')}
          </div>
          <div className="DayLine" />
        </div>
      )}
      <div className="Message with-avatar">
        <div
          className="Avatar"
          style={{
            backgroundImage: author ? `url("${author.photoUrl}")` : ''
          }}
        />
        <div className="Author">
          <div>
            <span className="UserName">{author && author.displayName}</span>{' '}
            <span className="TimeStamp">
              {formatDate(message.createdAt.seconds * 1000, 'h:mm a')}
            </span>
          </div>
          <div className="MessageContent">{message.text}</div>
        </div>
      </div>
    </div>
  );
};

export default Messages;

import React from "react";
import useCollection from "./UseCollection";
import { firebase } from "./firebase";

const Nav = ({ user }) => {
  const channels = useCollection("chanels");

  return (
    <div className="Nav">
      <div className="User">
        <img className="UserImage" alt="whatever" src={user.photoUrl} />
        <div>
          <div>{user.displayName}</div>
          <div>
            <button
              onClick={() => {
                firebase.auth().signOut();
              }}
              className="text-button"
            >
              log out
            </button>
          </div>
        </div>
      </div>
      <nav className="ChannelNav">
        {channels &&
          channels.map(channel => (
            <a href={`/channel/${channel.id}`} key={channel.id}>
              # {channel.id}
            </a>
          ))}
      </nav>
    </div>
  );
};

export default Nav;

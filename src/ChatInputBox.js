import React from "react";
import { db } from "./firebase";

const ChatInputBox = ({ user }) => {
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        const value = event.target.elements[0].value;
        db.collection("chanels")
          .doc("general")
          .collection("messages")
          .add({
            user: db.collection("users").doc(user.uid),
            text: value,
            createdAt: new Date()
          });
        event.target.reset();
      }}
      className="ChatInputBox"
    >
      <input className="ChatInput" placeholder="Message #general" />
    </form>
  );
};

export default ChatInputBox;

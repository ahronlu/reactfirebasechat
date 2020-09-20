import React from "react";
import { db } from "./firebase";

function ChatInputBox({ user, channelId }) {
  const submit = (e) => {
    e.preventDefault();
    const value = e.target.elements[0].value;
    db.collection("channels")
      .doc(channelId)
      .collection("messages")
      .add({
        user: db.collection("users").doc(user.uid),
        text: value,
        createdAt: new Date(),
      });
    e.target.reset();
  };

  return (
    <form onSubmit={submit} className="ChatInputBox">
      <input className="ChatInput" placeholder="Message #general" />
    </form>
  );
}

export default ChatInputBox;

import React from "react";
import styles from "./ChatButton.module.css";

const ChatButton = ({ onClick }) => (
  <button className={styles.chatButton} onClick={onClick}>
    <img src="./src/images/Chat Bubble.png" alt="Chat Bubble" />
  </button>
);

export default ChatButton;
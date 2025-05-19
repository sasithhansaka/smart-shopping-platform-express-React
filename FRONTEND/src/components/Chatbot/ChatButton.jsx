import React from "react";
import styles from "./ChatButton.module.css";
import { FaComment } from "react-icons/fa"; // Import message icon from react-icons

const ChatButton = ({ onClick }) => (
  <button className={styles.chatButton} onClick={onClick}>
    <FaComment className={styles.chatIcon} />
  </button>
);

export default ChatButton;
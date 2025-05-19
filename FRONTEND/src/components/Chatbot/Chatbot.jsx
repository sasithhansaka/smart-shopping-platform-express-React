import React, { useState, useRef, useEffect } from "react";
import styles from "./Chatbot.module.css";

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { 
      from: "bot", 
      text: "Hi! How can I help you today?", 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage = { from: "user", text: input, timestamp };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error(`Server error (${response.status})`);
      }

      const data = await response.json();
      setMessages((msgs) => [
        ...msgs,
        { 
          from: "bot", 
          text: data.answer || "Sorry, no answer received.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
      ]);
    } catch (e) {
      const errorMsg = e.message.includes("Failed to fetch") 
        ? "Cannot connect to server. Please try again later."
        : "Sorry, something went wrong.";
      
      setMessages((msgs) => [
        ...msgs,
        { 
          from: "bot", 
          text: errorMsg,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
      ]);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.chatbotPopup}>
      <div className={styles.header}>
        <span>TradNest</span>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
      </div>
      
      <div className={styles.messages}>
        {messages.map((m, i) => (
          <div key={i} className={m.from === "user" ? styles.userMsgContainer : styles.botMsgContainer}>
            <div className={m.from === "user" ? styles.userMsg : styles.botMsg}>
              {m.text}
              <div className={styles.timestamp}>
                {m.timestamp} {m.from === "bot" && "• Automated"}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className={styles.footer}>
        <div className={styles.contactInfo}>
          Or else you can contact us as follows,<br />
          Phone number: 0777218627<br />
          Email: support@Tradnest.com<br />
          Physical address: Tradnest FLAGSHIP STORE, 29 Visakha Private Road, Colombo, 00500, Sri Lanka.
        </div>
        <div className={styles.inputArea}>
          <input
            type="text"
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write message"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
      
      {error && <div className={styles.errorBanner}>{error}</div>}
    </div>
  );
};

export default Chatbot;
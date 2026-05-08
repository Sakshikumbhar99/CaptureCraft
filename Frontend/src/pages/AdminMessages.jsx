import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact");
      setMessages(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ❌ DELETE FUNCTION
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`);

      // Update UI instantly
      setMessages(messages.filter((msg) => msg._id !== id));

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>📩 Contact Messages</h1>

      {messages.length === 0 ? (
        <p>No messages found</p>
      ) : (
        messages.map((msg) => (
          <div key={msg._id} style={styles.card}>
            <h3>{msg.name}</h3>
            <p><b>Email:</b> {msg.email}</p>
            <p><b>Message:</b> {msg.message}</p>

            <p style={styles.date}>
              {new Date(msg.createdAt).toLocaleString()}
            </p>

            {/* ❌ DELETE BUTTON */}
            <button
              onClick={() => handleDelete(msg._id)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "10px"
  },

  date: {
    fontSize: "12px",
    color: "gray"
  },

  deleteBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    background: "red",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};
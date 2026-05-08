import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import API from "../services/api";
export default function About() {
  const [about, setAbout] = useState(null);
  const [show, setShow] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchAbout();
    setTimeout(() => setShow(true), 200);
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await axios.get("https://capturecraft-backend.onrender.com/api/about");
      setAbout(res.data);
    } catch (err) {
      console.log("Error loading about:", err);
    }
  };

  if (!about) {
    return (
      <div style={{ color: "white", textAlign: "center", padding: "100px" }}>
        Loading About Me...
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          ...styles.page,
          flexDirection: isMobile ? "column" : "row",
          padding: isMobile ? "100px 20px" : "100px 40px",
          gap: "30px", // ✅ fixed gap
          textAlign: isMobile ? "center" : "left",
          justifyContent: "center", // ✅ important
        }}
      >
        {/* IMAGE */}
        <div
          style={{
            ...styles.imageBox,
            opacity: show ? 1 : 0,
            transform: show ? "translateX(0)" : "translateX(-60px)",
            filter: show ? "blur(0px)" : "blur(10px)",
          }}
        >
          {about?.imageUrl ? (
            <img
              src={about.imageUrl}
              alt="photographer"
              style={{
                ...styles.image,
                maxWidth: isMobile ? "220px" : "240px",
              }}
            />
          ) : (
            <p>No Image Found</p>
          )}
        </div>

        {/* CONTENT */}
        <div
          style={{
            ...styles.content,
            opacity: show ? 1 : 0,
            transform: show ? "translateX(0)" : "translateX(60px)",
            filter: show ? "blur(0px)" : "blur(10px)",
            transitionDelay: "0.2s",
          }}
        >
          <h1
            style={{
              ...styles.title,
              fontSize: isMobile ? "28px" : "38px",
            }}
          >
            {about.title}
          </h1>

          <p style={{ ...styles.text, fontSize: isMobile ? "14px" : "15px" }}>
            {about.description1}
          </p>

          <p style={{ ...styles.text, fontSize: isMobile ? "14px" : "15px" }}>
            {about.description2}
          </p>

          <p style={{ ...styles.text, fontSize: isMobile ? "14px" : "15px" }}>
            {about.description3}
          </p>

          <p style={{ ...styles.quote, fontSize: isMobile ? "14px" : "15px" }}>
            {about.quote}
          </p>

          <div
            style={{
              ...styles.tags,
              justifyContent: isMobile ? "center" : "flex-start",
            }}
          >
            <span style={styles.tag}>Flowers</span>
            <span style={styles.tag}>Mountains</span>
            <span style={styles.tag}>Temples</span>
            <span style={styles.tag}>Wildlife</span>
            <span style={styles.tag}>Nature</span>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

/* 🎨 FINAL STYLES */
const styles = {
  page: {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",   // ✅ center layout
  background: "black",
  color: "white",
  padding: "100px 40px",
  gap: "30px",
  flexWrap: "wrap",
  maxWidth: "1100px",         // 👈 IMPORTANT (prevents stretch)
  margin: "0 auto",           // 👈 centers whole section
},

imageBox: {
  flex: "0.3",
  display: "flex",
  justifyContent: "center",   // ✅ keep centered
},

  image: {
    width: "100%",
    maxWidth: "240px",
    height: "auto",
    borderRadius: "6px",
    objectFit: "cover",
    filter: "grayscale(20%)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
  },

  content: {
  flex: "1",
  minWidth: "280px",
  maxWidth: "460px",
},

  title: {
    fontSize: "38px",
    marginBottom: "18px",
  },

  text: {
    fontSize: "15px",
    color: "#aaa",
    lineHeight: "1.7",
    marginBottom: "12px",
  },

  quote: {
    fontSize: "15px",
    color: "#ccc",
    fontStyle: "italic",
    marginTop: "15px",
  },

  tags: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  tag: {
    padding: "5px 12px",
    border: "1px solid #444",
    borderRadius: "20px",
    fontSize: "12px",
    color: "#ccc",
  },
};
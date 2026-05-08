import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../services/api";

export default function ImageSlider() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [fade, setFade] = useState(true);


const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);




  // 📡 Fetch images
  useEffect(() => {
    const fetchImages = async () => {
      const res = await API.get("/slider");
      setImages(res.data);
    };
    fetchImages();
  }, []);

  // 🔥 Auto slider with fade
  useEffect(() => {
    if (!isPlaying || images.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 300);

    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, images]);

  // 👉 Next
  const nextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
      setFade(true);
    }, 200);
  };

  // 👉 Previous
  const prevSlide = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) =>
        prev === 0 ? images.length - 1 : prev - 1
      );
      setFade(true);
    }, 200);
  };

  // 👉 Play / Pause
  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div style={styles.container}>
      {/* 🖼 IMAGE */}
      {images.length > 0 && (
        <>
          <img
            src={images[index].imageUrl}
            alt="slider"
            style={{
              ...styles.image,
              opacity: fade ? 1 : 0,
              transition: "opacity 1s ease-in-out"
            }}
          />

          {/* 🌑 DARK OVERLAY */}
          <div style={styles.overlay}></div>

          {/* ✨ TEXT CONTENT */}
          <div style={styles.textBox}>
            {/* <h1 style={styles.title}> */}
            <h1
  style={{
    ...styles.title,
    ...(isMobile ? styles.titleMobile : {})
  }}
>
              {images[index].title || "Capture Moments"}
            </h1>
            {/* <p style={styles.subtitle}> */}
            <p
  style={{
    ...styles.subtitle,
    ...(isMobile ? styles.subtitleMobile : {})
  }}
>
              Photography that tells a story
            </p>
          </div>
        </>
      )}

      {/* 🎮 CONTROLS */}
      <div style={styles.controls}>
        {/* <button onClick={prevSlide} style={styles.btn}>⏮</button> */}
        <button
  onClick={prevSlide}
  style={{
    ...styles.btn,
    ...(isMobile ? styles.btnMobile : {})
  }}
>⏮</button>

        {/* <button onClick={togglePlay} style={styles.btn}> */}
<button
  onClick={togglePlay}
  style={{
    ...styles.btn,
    ...(isMobile ? styles.btnMobile : {})
  }}
>

          {isPlaying ? "⏸" : "▶"}
        </button>

        {/* <button onClick={nextSlide} style={styles.btn}> */}
        <button
  onClick={nextSlide}
  style={{
    ...styles.btn,
    ...(isMobile ? styles.btnMobile : {})
  }}
>
          ⏭</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    zIndex: 1,
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))",
    zIndex: 2,
  },

  textBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "white",
    zIndex: 3,
  },

  title: {
    fontSize: "48px",
    margin: "0",
    letterSpacing: "2px",
  },

  subtitle: {
    fontSize: "18px",
    marginTop: "10px",
    opacity: 0.8,
  },

  controls: {
    position: "fixed",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    zIndex: 5,
  },

  btn: {
    padding: "10px",
    fontSize: "18px",
    cursor: "pointer",
    background: "rgba(0,0,0,0.5)",
    color: "white",
    border: "none",
    borderRadius: "6px",
  },







  titleMobile: {
  fontSize: "28px",
  letterSpacing: "1px",
},

subtitleMobile: {
  fontSize: "14px",
},

btnMobile: {
  padding: "8px",
  fontSize: "14px",
  width: "36px",
  height: "36px",
  borderRadius: "50%",
   background: "transparent",
    backdropFilter: "blur(2px)"

},





};
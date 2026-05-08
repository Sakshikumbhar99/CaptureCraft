// import React from "react";
// import {
//   FaInstagram,
//   FaFacebookF,
//   FaTwitter,
//   FaEnvelope,
//   FaPhone,
// } from "react-icons/fa";

// export default function SocialSidebar() {
//   return (
//     <div style={styles.container}>
//       {/* 📷 Instagram */}
//       <a
//         href="https://instagram.com/yourusername"
//         target="_blank"
//         rel="noopener noreferrer"
//         style={styles.icon}
//       >
//         <FaInstagram />
//       </a>

//       {/* 📘 Facebook */}
//       <a
//         href="https://facebook.com/yourusername"
//         target="_blank"
//         rel="noopener noreferrer"
//         style={styles.icon}
//       >
//         <FaFacebookF />
//       </a>

//       {/* 🐦 Twitter */}
//       <a
//         href="https://twitter.com/yourusername"
//         target="_blank"
//         rel="noopener noreferrer"
//         style={styles.icon}
//       >
//         <FaTwitter />
//       </a>

//       {/* 📧 Email */}
//       <a href="mailto:capturecraft@gmail.com" style={styles.icon}>
//         <FaEnvelope />
//       </a>

//       {/* 📞 Phone */}
//       <a href="tel:+911234567890" style={styles.icon}>
//         <FaPhone />
//       </a>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     position: "fixed",
//     right: "15px",
//     top: "50%",
//     transform: "translateY(-50%)",
//     display: "flex",
//     flexDirection: "column",
//     gap: "25px",
//     padding: "15px",
//     borderRadius: "15px",

//     background: "transparent",
//     backdropFilter: "blur(10px)",
//     WebkitBackdropFilter: "blur(10px)",

//     boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
//   },
//   container: {
//     position: "fixed",
//     right: "20px",
//     top: "50%",
//     transform: "translateY(-50%)",
//     display: "flex",
//     flexDirection: "column",
//     gap: "20px",
//     zIndex: 20, // 👈 HIGHER THAN SLIDER
//   },
//   icon: {
//     fontSize: "15px",
//     color: "white",
//     textDecoration: "none",
//     transition: "0.3s",
//   },
// };







import React, { useEffect, useState } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

export default function SocialSidebar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ❌ Hide on mobile
  if (isMobile) return null;

  return (
    <div style={styles.container}>
      <a href="https://instagram.com" target="_blank" style={styles.icon}><FaInstagram /></a>
      <a href="https://facebook.com" target="_blank" style={styles.icon}><FaFacebookF /></a>
      <a href="https://twitter.com" target="_blank" style={styles.icon}><FaTwitter /></a>
      <a href="mailto:capturecraft@gmail.com" style={styles.icon}><FaEnvelope /></a>
      <a href="tel:+911234567890" style={styles.icon}><FaPhone /></a>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    right: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    zIndex: 20
  },

  icon: {
    fontSize: "16px",
    color: "white",
    textDecoration: "none",
    transition: "0.3s"
  }
};
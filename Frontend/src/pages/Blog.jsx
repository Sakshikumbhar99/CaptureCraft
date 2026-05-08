// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Footer from "../components/Footer";

// export default function Blog() {
//   const [text, setText] = useState("");
//   const fullText = "Coming Soon...";

//   // ✨ Typing Animation
//   useEffect(() => {
//     let i = 0;
//     const interval = setInterval(() => {
//       setText(fullText.slice(0, i));
//       i++;
//       if (i > fullText.length) clearInterval(interval);
//     }, 100);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//     <div style={styles.page}>

//       {/* 🌈 BACKGROUND GLOW */}
//       <div style={styles.glow}></div>

//       <div style={styles.container}>
//         <h1 style={styles.title}>Blog</h1>

//         <p style={styles.subtitle}>
//           Stories, tips, and photography experiences will be shared here.
//         </p>

//         {/* ✨ CARD */}
//         <div style={styles.card}>
//           <h2 style={styles.typing}>{text}</h2>

//           <p style={styles.desc}>
//             New content is on its way.
//             Stay tuned for updates!
//           </p>

//           <Link to="/" style={styles.button}>
//             Back to Home
//           </Link>
//         </div>
//       </div>

//     </div>
//     <Footer />
//          </>
//   );
// }

// /* 🎨 STYLES */
// const styles = {
//   page: {
//     minHeight: "100vh",
//     background: "black",
//     color: "white",
//     position: "relative",
//     overflow: "hidden",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center"
//   },

//   glow: {
//     position: "absolute",
//     width: "500px",
//     height: "500px",
//     background: "radial-gradient(circle, #ff0080, transparent)",
//     filter: "blur(150px)",
//     animation: "moveGlow 6s infinite alternate"
//   },

//   container: {
//     textAlign: "center",
//     zIndex: 2,
//     animation: "fadeIn 1.5s ease"
//   },

//   title: {
//     fontSize: "50px",
//     marginBottom: "10px"
//   },

//   subtitle: {
//     color: "#aaa",
//     marginBottom: "30px"
//   },

//   card: {
//     padding: "30px",
//     borderRadius: "12px",
//     background: "rgba(255,255,255,0.05)",
//     backdropFilter: "blur(12px)",
//     border: "1px solid rgba(255,255,255,0.1)",
//     transition: "0.3s"
//   },

//   typing: {
//     fontSize: "28px",
//     marginBottom: "10px"
//   },

//   desc: {
//     color: "#ccc",
//     marginBottom: "20px"
//   },

//   button: {
//     padding: "10px 20px",
//     background: "white",
//     color: "black",
//     textDecoration: "none",
//     borderRadius: "5px",
//     transition: "0.3s"
//   }
// };

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Blog() {
  const [text, setText] = useState("");
  const fullText = "Coming Soon...";

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // 📱 Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✨ Typing Animation
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        style={{
          ...styles.page,
          padding: isMobile ? "20px" : "40px",
        }}
      >
        {/* 🌈 BACKGROUND GLOW */}
        <div
          style={{
            ...styles.glow,
            width: isMobile ? "250px" : "500px",
            height: isMobile ? "250px" : "500px",
            filter: isMobile ? "blur(80px)" : "blur(150px)",
          }}
        ></div>

        <div
          style={{
            ...styles.container,
            maxWidth: isMobile ? "100%" : "600px",
          }}
        >
          <h1
            style={{
              ...styles.title,
              fontSize: isMobile ? "32px" : "50px",
            }}
          >
            Blog
          </h1>

          <p
            style={{
              ...styles.subtitle,
              fontSize: isMobile ? "14px" : "16px",
            }}
          >
            Stories, tips, and photography experiences will be shared here.
          </p>

          {/* ✨ CARD */}
          <div
            style={{
              ...styles.card,
              padding: isMobile ? "20px" : "30px",
            }}
          >
            <h2
              style={{
                ...styles.typing,
                fontSize: isMobile ? "20px" : "28px",
              }}
            >
              {text}
            </h2>

            <p
              style={{
                ...styles.desc,
                fontSize: isMobile ? "14px" : "16px",
              }}
            >
              New content is on its way. Stay tuned for updates!
            </p>

            <Link
              to="/"
              style={{
                ...styles.button,
                fontSize: isMobile ? "14px" : "16px",
                padding: isMobile ? "8px 16px" : "10px 20px",
              }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

/* 🎨 STYLES */
const styles = {
  page: {
    minHeight: "100vh",
    background: "black",
    color: "white",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  glow: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background: "radial-gradient(circle, #ff0080, transparent)",
    filter: "blur(150px)",
    animation: "moveGlow 6s infinite alternate",
  },

  container: {
    textAlign: "center",
    zIndex: 2,
    animation: "fadeIn 1.5s ease",
    maxWidth: "600px",
    width: "100%",
  },

  title: {
    fontSize: "50px",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#aaa",
    marginBottom: "30px",
  },

  card: {
    padding: "30px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "0.3s",
  },

  typing: {
    fontSize: "28px",
    marginBottom: "10px",
  },

  desc: {
    color: "#ccc",
    marginBottom: "20px",
  },

  button: {
    padding: "10px 20px",
    background: "white",
    color: "black",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "0.3s",
  },
};
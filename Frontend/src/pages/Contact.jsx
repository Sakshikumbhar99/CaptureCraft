// import React, { useState } from "react";
// import axios from "axios";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import EmailIcon from "@mui/icons-material/Email";
// import FaPhone from "@mui/icons-material/Phone";

// export default function Contact() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Handle input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Handle form submit (CONNECTED TO BACKEND)
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       // 🔥 API CALL
//       await axios.post("https://capturecraft-backend.onrender.com/api/contact", form);

//       setSubmitted(true);

//       // Reset form
//       setForm({
//         name: "",
//         email: "",
//         message: "",
//       });

//       setTimeout(() => setSubmitted(false), 3000);
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.page}>
//       {/* LEFT SIDE */}
//       <div style={styles.left}>
//         <h1 style={styles.title}>Let’s Work Together</h1>

//         <p style={styles.desc}>
//           Have a project in mind or want to collaborate? I’d love to hear from
//           you. Let’s create something beautiful.
//         </p>

//         <div style={styles.info}>
//           <p>📍 Maharashtra, India</p>
//           <p>📧 capturecraft@gmail.com</p>
//         </div>

//         {/* SOCIAL BUTTONS */}
//         <div style={styles.social}>
//           <a
//             href="https://instagram.com"
//             target="_blank"
//             style={styles.icon}
//             onMouseEnter={(e) => (e.currentTarget.style.color = "#ff4081")}
//             onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
//           >
//             <InstagramIcon />
//           </a>

//           <a
//             href="https://instagram.com"
//             target="_blank"
//             style={styles.icon}
//             onMouseEnter={(e) => (e.currentTarget.style.color = "#ff4081")}
//             onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
//           >
//             <FacebookIcon />
//           </a>
//           <a
//             href="https://instagram.com"
//             target="_blank"
//             style={styles.icon}
//             onMouseEnter={(e) => (e.currentTarget.style.color = "#ff4081")}
//             onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
//           >
//             <TwitterIcon />
//           </a>

//           <a
//             href="https://instagram.com"
//             target="_blank"
//             style={styles.icon}
//             onMouseEnter={(e) => (e.currentTarget.style.color = "#ff4081")}
//             onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
//           >
//             <EmailIcon />
//           </a>

//           <a
//             href="tel:+911234567890"
//             style={styles.icon}
//             onMouseEnter={(e) => (e.currentTarget.style.color = "#4caf50")}
//             onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
//           >
//             <FaPhone />
//           </a>
//         </div>
//       </div>

//       {/* RIGHT FORM */}
//       <div style={styles.formBox}>
//         <h2 style={styles.formTitle}>Send Message</h2>

//         <form onSubmit={handleSubmit}>
//           <input
//             name="name"
//             placeholder="Your Name"
//             value={form.name}
//             onChange={handleChange}
//             style={styles.input}
//             required
//           />

//           <input
//             name="email"
//             type="email"
//             placeholder="Your Email"
//             value={form.email}
//             onChange={handleChange}
//             style={styles.input}
//             required
//           />

//           <textarea
//             name="message"
//             placeholder="Your Message..."
//             value={form.message}
//             onChange={handleChange}
//             style={styles.textarea}
//             required
//           />

//           <button type="submit" style={styles.button} disabled={loading}>
//             {loading ? "Sending..." : "Send Message"}
//           </button>

//           {submitted && (
//             <p style={styles.success}>✔ Message sent successfully</p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }

// /* 🎨 STYLES */
// const styles = {
//   page: {
//     minHeight: "100vh",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "60px",
//     flexWrap: "wrap",
//     background: "black",
//     padding: "40px",
//   },

//   left: {
//     maxWidth: "400px",
//   },

//   title: {
//     fontSize: "48px",
//     fontWeight: "600",
//     marginBottom: "20px",
//     color: "white",
//   },

//   desc: {
//     color: "#aaa",
//     lineHeight: "1.7",
//     marginBottom: "25px",
//   },

//   info: {
//     color: "#ccc",
//     marginBottom: "25px",
//     lineHeight: "2",
//   },

//   social: {
//     display: "flex",
//     gap: "12px",
//   },

//   icon: {
//     color: "white",
//     fontSize: "28px",
//     transition: "0.3s",
//     cursor: "pointer",
//   },

//   socialBtn: {
//     padding: "8px 14px",
//     border: "1px solid #444",
//     borderRadius: "20px",
//     color: "white",
//     textDecoration: "none",
//     fontSize: "14px",
//     transition: "0.3s",
//   },

//   formBox: {
//     width: "350px",
//     padding: "30px",
//     borderRadius: "12px",
//     background: "rgba(255,255,255,0.05)",
//     backdropFilter: "blur(12px)",
//     border: "1px solid rgba(255,255,255,0.1)",
//   },

//   formTitle: {
//     marginBottom: "20px",
//     color: "white",
//   },

//   input: {
//     width: "100%",
//     padding: "12px",
//     marginBottom: "12px",
//     background: "transparent",
//     border: "1px solid #444",
//     borderRadius: "6px",
//     color: "white",
//     outline: "none",
//   },

//   textarea: {
//     width: "100%",
//     height: "110px",
//     padding: "12px",
//     marginBottom: "12px",
//     background: "transparent",
//     border: "1px solid #444",
//     borderRadius: "6px",
//     color: "white",
//     outline: "none",
//   },

//   button: {
//     width: "100%",
//     padding: "12px",
//     background: "white",
//     color: "black",
//     border: "none",
//     borderRadius: "6px",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "0.3s",
//   },

//   success: {
//     marginTop: "10px",
//     color: "lightgreen",
//   },
// };






import React, { useState, useEffect } from "react";
import axios from "axios";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import API from "../services/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ MOBILE DETECTION
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await await API.post("/contact", form);

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });

      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        ...styles.page,
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "30px" : "40px",
        padding: isMobile ? "100px 20px" : "80px 40px",
        textAlign: isMobile ? "center" : "left",
      }}
    >
      {/* LEFT */}
      <div style={{ ...styles.left, maxWidth: isMobile ? "100%" : "400px" }}>
        <h1
          style={{
            ...styles.title,
            fontSize: isMobile ? "28px" : "48px",
          }}
        >
          Get in Touch
        </h1>

        <p style={{ ...styles.desc, fontSize: isMobile ? "14px" : "16px" }}>
          For bookings, inquiries, or collaborations, feel free to reach out. I’d love to connect and capture your moments.
        </p>

        <div style={styles.info}>
          <p>📍 Maharashtra, India</p>
          <p>📧 capturecraft@gmail.com</p>
        </div>

        <div
          style={{
            ...styles.social,
            justifyContent: isMobile ? "center" : "flex-start",
          }}
        >
          <a href="https://www.instagram.com/the_pixeldrift/"   target="_blank" style={styles.icon}><InstagramIcon /></a>
          <a href="#" style={styles.icon}><FacebookIcon /></a>
          <a href="#" style={styles.icon}><TwitterIcon /></a>
          <a href="#" style={styles.icon}><EmailIcon /></a>
          <a href="#" style={styles.icon}><PhoneIcon /></a>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div
        style={{
          ...styles.formBox,
          width: isMobile ? "100%" : "350px",
        }}
      >
        <h2 style={styles.formTitle}>Send Message</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message..."
            value={form.message}
            onChange={handleChange}
            style={styles.textarea}
            required
          />

          <button style={styles.button} disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>

          {submitted && (
            <p style={styles.success}>✔ Message sent successfully</p>
          )}
        </form>
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "black",
  },

  left: {},

  title: {
    fontWeight: "600",
    marginBottom: "20px",
    color: "white",
  },

  desc: {
    color: "#aaa",
    lineHeight: "1.7",
    marginBottom: "25px",
  },

  info: {
    color: "#ccc",
    marginBottom: "25px",
    lineHeight: "2",
  },

  social: {
    display: "flex",
    gap: "12px",
  },

  icon: {
    color: "white",
    fontSize: "26px",
    cursor: "pointer",
  },

  formBox: {
    padding: "25px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.1)",
  },

  formTitle: {
    marginBottom: "20px",
    color: "white",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    background: "transparent",
    border: "1px solid #444",
    borderRadius: "6px",
    color: "white",
  },

  textarea: {
    width: "100%",
    height: "110px",
    padding: "12px",
    marginBottom: "12px",
    background: "transparent",
    border: "1px solid #444",
    borderRadius: "6px",
    color: "white",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "white",
    color: "black",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
  },

  success: {
    marginTop: "10px",
    color: "lightgreen",
  },
};
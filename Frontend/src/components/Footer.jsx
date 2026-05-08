import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        {/* LEFT - BRAND */}
        <div style={styles.section}>
          <h2 style={styles.logo}>CaptureCraft</h2>
          <p style={styles.text}>
            Capture moments. Create memories. Showcase your photography with style.
          </p>
        </div>

        {/* CENTER - QUICK LINKS */}
        <div style={styles.section}>
          <h3 style={styles.heading}>Quick Links</h3>
          <ul style={styles.list}>
            <li>Home</li>
            <li>Gallery</li>
            <li>Submit</li>
            <li>About</li>
          </ul>
        </div>

        {/* RIGHT - CONTACT */}
        <div style={styles.section}>
          <h3 style={styles.heading}>Contact</h3>
          
          <div style={styles.iconRow}>
            <EmailIcon />
            <span>capturecraft@gmail.com</span>
          </div>

          <div style={styles.iconRow}>
            <PhoneIcon />
            <span>+91 9876XXXXXX</span>
          </div>

          <div style={styles.social}>
            <InstagramIcon style={styles.icon} />
            <TwitterIcon style={styles.icon} />
            <GitHubIcon style={styles.icon} />
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div style={styles.bottom}>
        © {new Date().getFullYear()} CaptureCraft | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
const styles = {
  footer: {
    background: "rgba(0,0,0,0.9)",
    backdropFilter: "blur(10px)",
    color: "#fff",
    padding: "40px 20px 10px",
    marginTop: "50px",
  },

  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    maxWidth: "1200px",
    margin: "auto",
  },

  section: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },

  text: {
    color: "#aaa",
    fontSize: "14px",
  },

  heading: {
    fontSize: "18px",
    marginBottom: "10px",
  },

  list: {
    listStyle: "none",
    padding: 0,
    lineHeight: "30px",
    cursor: "pointer",
  },

  iconRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#ccc",
  },

  social: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
  },

  icon: {
    cursor: "pointer",
    transition: "0.3s",
  },

  bottom: {
    textAlign: "center",
    borderTop: "1px solid #222",
    marginTop: "20px",
    paddingTop: "10px",
    fontSize: "14px",
    color: "#888",
  },
};
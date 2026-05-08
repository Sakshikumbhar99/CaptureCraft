// import { Link, useLocation } from "react-router-dom";

// function Navbar() {
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   return (
//     <nav style={styles.nav}>

//       {/* 📸 LOGO */}
//       <h2 style={styles.logo}>CaptureCraft</h2>

//       {/* 🔗 NAV LINKS */}
//       <div style={styles.links}>

//         <Link
//           to="/"
//           style={{
//             ...styles.link,
//             color: isActive("/") ? "yellow" : "white"
//           }}
//         >
//           Home
//         </Link>

//         <Link
//           to="/gallery"
//           style={{
//             ...styles.link,
//             color: isActive("/gallery") ? "yellow" : "white"
//           }}
//         >
//           Gallery
//         </Link>

//         <Link
//           to="/submit"
//           style={{
//             ...styles.link,
//             color: isActive("/submit") ? "yellow" : "white"
//           }}
//         >
//           Submit
//         </Link>

//         <Link
//           to="/about"
//           style={{
//             ...styles.link,
//             color: isActive("/about") ? "yellow" : "white"
//           }}
//         >
//           About
//         </Link>

//         <Link
//           to="/blog"
//           style={{
//             ...styles.link,
//             color: isActive("/blog") ? "yellow" : "white"
//           }}
//         >
//           Blog
//         </Link>

//         <Link
//           to="/contact"
//           style={{
//             ...styles.link,
//             color: isActive("/contact") ? "yellow" : "white"
//           }}
//         >
//           Contact
//         </Link>

//       </div>

//     </nav>
//   );
// }

// /* 🎨 STYLES */
// const styles = {
//   nav: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "15px 30px",
//     background: "transparent",     // 👈 transparent navbar
//     color: "white",

//     position: "fixed",             // 👈 KEY FIX
//     top: 0,
//     left: 0,
//     width: "100%",

//     zIndex: 1000                  // 👈 always on top
//   },

//   logo: {
//     margin: 0,
//     fontSize: "22px",
//     fontWeight: "bold",
//     textShadow: "0 0 5px rgba(0,0,0,0.7)" // 👈 better visibility
//   },

//   links: {
//     display: "flex",
//     gap: "20px"
//   },

//   link: {
//     textDecoration: "none",
//     fontSize: "16px",
//     color: "white",
//     transition: "0.3s",
//     textShadow: "0 0 5px rgba(0,0,0,0.7)" // 👈 visible on light images
//   }
// };

// export default Navbar;





import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";

function Navbar() {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // ✅ Handle screen resize (IMPORTANT)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>

      {/* 📸 LOGO */}
      <h2 style={styles.logo}>CaptureCraft</h2>

      {/* 📱 ICONS (ONLY MOBILE) */}
      {isMobile && (
        <div style={styles.icons}>
          
          {/* 🔗 SOCIAL BUTTON */}
          <div onClick={() => setSocialOpen(!socialOpen)}>
            <ShareIcon style={styles.iconBtn} />
          </div>

          {/* 🍔 MENU BUTTON */}
          <div onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <CloseIcon style={styles.iconBtn} />
            ) : (
              <MenuIcon style={styles.iconBtn} />
            )}
          </div>
        </div>
      )}

      {/* 🔗 NAV LINKS */}
      <div
        style={{
          ...styles.links,
          ...(isMobile ? styles.linksMobile : {}),
          ...(menuOpen && isMobile ? styles.linksMobileOpen : {})
        }}
      >
        <Link to="/" style={{ ...styles.link, color: isActive("/") ? "yellow" : "white" }}>Home</Link>
        <Link to="/gallery" style={{ ...styles.link, color: isActive("/gallery") ? "yellow" : "white" }}>Gallery</Link>
        <Link to="/submit" style={{ ...styles.link, color: isActive("/submit") ? "yellow" : "white" }}>Submit</Link>
        <Link to="/about" style={{ ...styles.link, color: isActive("/about") ? "yellow" : "white" }}>About</Link>
        <Link to="/blog" style={{ ...styles.link, color: isActive("/blog") ? "yellow" : "white" }}>Blog</Link>
        <Link to="/contact" style={{ ...styles.link, color: isActive("/contact") ? "yellow" : "white" }}>Contact</Link>
      </div>

      {/* 📱 SOCIAL DROPDOWN (MOBILE ONLY) */}
      {isMobile && socialOpen && (
        <div style={styles.socialDropdown}>
          <a href="https://instagram.com" target="_blank" style={styles.socialItem}>Instagram</a>
          <a href="https://facebook.com" target="_blank" style={styles.socialItem}>Facebook</a>
          <a href="https://twitter.com" target="_blank" style={styles.socialItem}>Twitter</a>
          <a href="mailto:capturecraft@gmail.com" style={styles.socialItem}>Email</a>
          <a href="tel:+911234567890" style={styles.socialItem}>Call</a>
        </div>
      )}

    </nav>
  );
}

/* 🎨 STYLES */
const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    background: "transparent",
    backdropFilter: "blur(2px)"
  },

  logo: {
    margin: 0,
    fontSize: "20px",
    color: "white",
    fontWeight: "bold"
  },

  links: {
    display: "flex",
    gap: "20px"
  },

  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "16px"
  },

  /* 📱 MOBILE LINKS (HIDDEN DEFAULT) */
  linksMobile: {
    display: "none"
  },

  /* 📱 WHEN MENU OPEN */
  linksMobileOpen: {
    display: "flex",
    position: "absolute",
    top: "70px",
    left: 0,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(50px)",
    padding: "20px 0",
    gap: "15px"
  },

  /* 📱 ICONS */
  icons: {
    display: "flex",
    gap: "15px"
  },

  iconBtn: {
    color: "white",
    cursor: "pointer"
  },

  /* 📱 SOCIAL DROPDOWN */
  socialDropdown: {
    position: "absolute",
    top: "100%",
    right: "20px",
    background: "black",
    padding: "10px 15px",
    borderRadius: "0 0 10px 10px",  
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  socialItem: {
    color: "white",
    textDecoration: "none",
    fontSize: "14px" 
  }
};

export default Navbar;
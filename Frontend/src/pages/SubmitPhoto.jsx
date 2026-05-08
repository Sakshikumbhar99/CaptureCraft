import { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Footer from "../components/Footer";
function SubmitPhoto() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    category: "",
    imageUrl: "",
  });

  const [preview, setPreview] = useState(null);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true); // for gallery
  const [submitting, setSubmitting] = useState(false); // for form

const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);




  useEffect(() => {
    fetchImages();
  }, []);

  // const fetchImages = async () => {
  //   const res = await axios.get(
  //     "http://localhost:5000/api/submissions/approved"
  //   );
  //   setImages(res.data);
  // };

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5000/api/submissions/approved",
      );
      setImages(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 DRAG & DROP
  const onDrop = async (files) => {
    const file = files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    const data = new FormData();
    data.append("image", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", data);

      setFormData((prev) => ({
        ...prev,
        imageUrl: res.data.imageUrl,
      }));
    } catch (err) {
      console.log("Upload error", err);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  // // 🔥 SUBMIT
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!formData.imageUrl) {
  //     alert("Upload image first ⚠️");
  //     return;
  //   }

  //   try {
  //     await axios.post(
  //       "http://localhost:5000/api/submissions",
  //       formData
  //     );

  //     setMessage("Submitted ✅");

  //     setFormData({
  //       name: "",
  //       email: "",
  //       contact: "",
  //       category: "",
  //       imageUrl: "",
  //     });

  //     setPreview(null);
  //     fetchImages();
  //   } catch (err) {
  //     console.log(err);
  //     setMessage("Error ❌");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.imageUrl) {
      alert("Upload image first ⚠️");
      return;
    }

    try {
      setSubmitting(true);

      await axios.post("http://localhost:5000/api/submissions", formData);

      setMessage("Submitted ✅");

      setFormData({
        name: "",
        email: "",
        contact: "",
        category: "",
        imageUrl: "",
      });

      setPreview(null);
      fetchImages();
    } catch (err) {
      console.log(err);
      setMessage("Error ❌");
    } finally {
      setSubmitting(false);
    }
  };

  return (
  <>
    {/* <div style={styles.page}> */}
    <div
  style={{
    ...styles.page,
    ...(isMobile ? styles.pageMobile : {})
  }}
>
      {/* FORM */}
      {/* <div style={styles.formBox}> */}
      <div
  style={{
    ...styles.formBox,
    ...(isMobile ? styles.formBoxMobile : {})
  }}
>
        {/* <h1 style={styles.title}> */}
        <h1
  style={{
    ...styles.title,
    ...(isMobile ? styles.titleMobile : {})
  }}
>
          Submit Your Photo 📸</h1>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={styles.input}
          />

          <input
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            style={styles.input}
          />

          <input
            placeholder="Contact"
            value={formData.contact}
            onChange={(e) =>
              setFormData({ ...formData, contact: e.target.value })
            }
            style={styles.input}
          />

          <input
            placeholder="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            style={styles.input}
          />

          {/* DROPZONE */}
          {/* <div {...getRootProps()} style={styles.dropzone}> */}
          <div
  {...getRootProps()}
  style={{
    ...styles.dropzone,
    ...(isMobile ? styles.dropzoneMobile : {})
  }}
>
            <input {...getInputProps()} />
            <p>📤 Drag & Drop or Click to Upload</p>
          </div>

          {/* PREVIEW */}
          {preview && <img src={preview} style={styles.preview} />}

          {/* <button style={styles.button}>Submit</button> */}
          <button style={styles.button}>
            {submitting ? "Uploading..." : "Submit"}
          </button>
        </form>

        <p style={{ textAlign: "center" }}>{message}</p>
      </div>

      {/* GALLERY */}
      {/* <div style={styles.gallery}>
        <h2 style={styles.galleryTitle}>
          Featured photography from talented contributors
        </h2>

        <div style={styles.grid}>
          {images.map((item) => (
            <div key={item._id} style={styles.card}>
              <img src={item.imageUrl} style={styles.image} />

              <div style={styles.overlay}>
                <p style={styles.cardTitle}>{item.title}</p>
                <p style={styles.cardAuthor}>{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      <div style={styles.gallery}>
        <h2 style={styles.galleryTitle}>
          Featured photography from talented contributors
        </h2>

        {loading ? (
          <div style={styles.loader}></div>
        ) : (
          // <div style={styles.grid}>
          <div
  style={{
    ...styles.grid,
    ...(isMobile ? styles.gridMobile : {})
  }}
>
            {images.map((item) => (
              <div key={item._id} style={styles.card}>
                <img src={item.imageUrl} style={styles.image} />

                <div style={styles.overlay}>
                  <p style={styles.cardTitle}>{item.title}</p>
                  <p style={styles.cardAuthor}>{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
     <Footer />
     </>
  );
}

export default SubmitPhoto;

/* 🎨 MODERN STYLES */
const styles = {
  // page: {
  //   minHeight: "100vh",
  //   padding: "100px 120px",
  //   background: "linear-gradient(to bottom, #000, #111)",
  //   color: "white",
  // },

  page: {
    minHeight: "100vh",
    padding: "100px 120px",
    background: "linear-gradient(to bottom, #000, #111)",
    color: "white",
    animation: "fadeIn 0.8s ease",
  },

  loader: {
    width: "50px",
    height: "50px",
    border: "5px solid #333",
    borderTop: "5px solid white",
    borderRadius: "50%",
    margin: "40px auto",
    animation: "spin 1s linear infinite",
  },
  formBox: {
    maxWidth: "500px",
    margin: "auto",
    padding: "25px",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
  },

  title: {
    textAlign: "center",
    marginBottom: "15px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "#222",
    color: "white",
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "white",
    color: "black",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },

  dropzone: {
    border: "2px dashed #777",
    padding: "30px",
    marginBottom: "10px",
    textAlign: "center",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "0.3s",
  },

  preview: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },

  gallery: {
    marginTop: "60px",
  },

  galleryTitle: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#ccc",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "0.4s",
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    transition: "0.4s",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0,0,0,0.6)",
    opacity: 0,
    transition: "0.4s",
  },

  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
  },

  cardAuthor: {
    fontSize: "14px",
    color: "#ddd",
  },





  /* 📱 PAGE */
pageMobile: {
  padding: "90px 15px",   // 👈 remove side space
},

/* 📱 FORM */
formBoxMobile: {
  padding: "20px",
},

titleMobile: {
  fontSize: "22px",
},

/* 📱 DROPZONE */
dropzoneMobile: {
  padding: "20px",
  fontSize: "14px",
},

/* 📱 GRID */
gridMobile: {
  gridTemplateColumns: "1fr",   // 👈 single column
  gap: "15px",
},





};

/* 🔥 HOVER EFFECT */
document.addEventListener("mouseover", (e) => {
  const card = e.target.closest("div");
  if (card && card.style?.position === "relative") {
    const overlay = card.querySelector("div");
    if (overlay) overlay.style.opacity = 1;
  }
});

document.addEventListener("mouseout", (e) => {
  const card = e.target.closest("div");
  if (card && card.style?.position === "relative") {
    const overlay = card.querySelector("div");
    if (overlay) overlay.style.opacity = 0;
  }
});

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`,
  styleSheet.cssRules.length,
);

styleSheet.insertRule(
  `
@keyframes fadeIn {
  from { opacity:0; transform:translateY(20px); }
  to { opacity:1; transform:translateY(0); }
}
`,
  styleSheet.cssRules.length,
);

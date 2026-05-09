import { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

function AdminUpload() {
  const [submissions, setSubmissions] = useState([]);
  const [sliderPhotos, setSliderPhotos] = useState([]);
  const [galleryPhotos, setGalleryPhotos] = useState([]);

  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryImage, setGalleryImage] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState(null);

  const [sliderTitle, setSliderTitle] = useState("");
  const [sliderImage, setSliderImage] = useState(null);
  const [sliderPreview, setSliderPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [galleryCategory, setGalleryCategory] = useState("");
  const categories = [
    "All",
    "Flower",
    "Nature",
    "Sunset",
    "Historical",
    "Wallpaper",
    "Leaf",
  ];

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const [g, s, sub] = await Promise.all([
      axios.get("https://capturecraft-backend.onrender.com/api/photos"),
      axios.get("https://capturecraft-backend.onrender.com/api/slider"),
      axios.get("https://capturecraft-backend.onrender.com/api/submissions"),
    ]);

    setGalleryPhotos(g.data);
    setSliderPhotos(s.data);
    setSubmissions(sub.data);
  };

  // ================= ACTIONS =================
  const deleteGallery = async (id) => {
    await axios.delete(`/api/photos/${id}`);
    fetchAll();
  };

  const deleteSlider = async (id) => {
    await axios.delete(`https://capturecraft-backend.onrender.com/api/slider/${id}`);
    fetchAll();
  };

  const approve = async (id) => {
    await axios.put(`https://capturecraft-backend.onrender.com/api/submissions/approve/${id}`);
    fetchAll();
  };

  const reject = async (id) => {
    await axios.delete(`https://capturecraft-backend.onrender.com/api/submissions/${id}`);
    fetchAll();
  };
  
  // ================= ABOUT ME =================
 const [aboutData, setAboutData] = useState({
  title: "",
  description1: "",
  description2: "",
  description3: "",
  quote: "",
  imageUrl: "",
});

const [aboutPreview, setAboutPreview] = useState(null);

// IMAGE UPLOAD (reuse your /api/upload)
const onAboutDrop = async (files) => {
  const file = files[0];
  if (!file) return;

  setAboutPreview(URL.createObjectURL(file));

  const formData = new FormData();
  formData.append("image", file);

  // upload image to backend upload API
  const uploadRes = await axios.post(
    "https://capturecraft-backend.onrender.com/api/upload",
    formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

  setAboutData((prev) => ({
    ...prev,
    imageUrl: uploadRes.data.imageUrl,
  }));
};

const { getRootProps: aboutRoot, getInputProps: aboutInput } = useDropzone({
  onDrop: onAboutDrop,
  accept: { "image/*": [] },
});


const uploadAbout = async (e) => {
  e.preventDefault();

  await axios.put("https://capturecraft-backend.onrender.com/api/about", aboutData);

  alert("About Updated ✅");

  setAboutPreview(null);
};

  // ================= GALLERY DROP =================
  const onGalleryDrop = (files) => {
    const file = files[0];
    if (!file) return;

    setGalleryImage(file);
    setGalleryPreview(URL.createObjectURL(file));
  };

  const { getRootProps: gRoot, getInputProps: gInput } = useDropzone({
    onDrop: onGalleryDrop,
    accept: { "image/*": [] },
  });

  const uploadGallery = async (e) => {
    e.preventDefault();

    if (!galleryImage) return alert("Upload image first");

    const formData = new FormData();
    formData.append("title", galleryTitle);
    formData.append("category", galleryCategory); 
    formData.append("image", galleryImage);

    await axios.post("https://capturecraft-backend.onrender.com/api/photos", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

    setGalleryTitle("");
    setGalleryCategory("");
    setGalleryImage(null);
    setGalleryPreview(null);

    fetchAll();
  };

  // ================= SLIDER DROP =================
  const onSliderDrop = (files) => {
    const file = files[0];
    if (!file) return;

    setSliderImage(file);
    setSliderPreview(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onSliderDrop,
    accept: { "image/*": [] },
  });

  const uploadSlider = async (e) => {
    e.preventDefault();

    if (!sliderImage) return alert("Upload image first");

    const formData = new FormData();
    formData.append("title", sliderTitle);
    formData.append("image", sliderImage);

    await axios.post("https://capturecraft-backend.onrender.com/api/slider", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

    setSliderTitle("");
    setSliderImage(null);
    setSliderPreview(null);
    setShowModal(false);

    fetchAll();
  };

  return (
    <div className="page">
      <h1 className="mainTitle">Admin Panel 🔐</h1>

      {/* ================= GALLERY ================= */}
      <section className="section">
        <h2 className="title">Upload Gallery Images</h2>

        <form onSubmit={uploadGallery} className="formBox">
          <input
            className="input"
            placeholder="Image Title"
            value={galleryTitle}
            onChange={(e) => setGalleryTitle(e.target.value)}
          />

          <select
            className="input"
            value={galleryCategory}
            onChange={(e) => setGalleryCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Flower">Flower</option>
            <option value="Nature">Nature</option>
            <option value="Sunset">Sunset</option>
            <option value="Historical">Historical</option>
            <option value="Wallpaper">Wallpaper</option>
            <option value="Leaf">Leaf</option>
          </select>

          <div {...gRoot()} className="dropzone">
            <input {...gInput()} />
            <p>📤 Drag & Drop or Click to Upload</p>
          </div>

          {galleryPreview && <img src={galleryPreview} className="preview" />}

          <button type="submit" className="submitBtn">Upload</button>
        </form>

        <div className="grid">
          {galleryPhotos.map((img) => (
            <div className="card" key={img._id}>
              <img src={img.imageUrl} />

              <button className="delete" onClick={() => deleteGallery(img._id)}>
                ✖
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= USER ================= */}
      <section className="section">
        <h2 className="title">User Submissions</h2>

        <div className="grid">
          {submissions.map((item) => (
            <div className="card" key={item._id}>
              <img src={item.imageUrl} />

              <div className="overlay">
                <p>{item.title}</p>

                <div className="btnRow">
                  {!item.approved && (
                    <button
                      className="approve"
                      onClick={() => approve(item._id)}
                    >
                      Approve
                    </button>
                  )}

                  <button className="reject" onClick={() => reject(item._id)}>
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SLIDER ================= */}
      <section className="section">
        <div className="sliderHeader">
          <h2 className="title">Slider Images</h2>

          <button className="addBtn" onClick={() => setShowModal(true)}>
            + Add Slider
          </button>
        </div>

        <div className="grid">
          {sliderPhotos.map((img) => (
            <div className="card" key={img._id}>
              <img src={img.imageUrl} />

              <button className="delete" onClick={() => deleteSlider(img._id)}>
                ✖
              </button>
            </div>
          ))}
        </div>
      </section>


 {/* ================= For AboutMe page ================= */}

<section className="section">
  <h2 className="title">About Me Editor 🧑‍🎨</h2>

  <form className="formBox" onSubmit={uploadAbout}>
    
    <input
      className="input"
      placeholder="Title"
      value={aboutData.title}
      onChange={(e) =>
        setAboutData({ ...aboutData, title: e.target.value })
      }
    />

    <input
      className="input"
      placeholder="Description 1"
      value={aboutData.description1}
      onChange={(e) =>
        setAboutData({ ...aboutData, description1: e.target.value })
      }
    />

    <input
      className="input"
      placeholder="Description 2"
      value={aboutData.description2}
      onChange={(e) =>
        setAboutData({ ...aboutData, description2: e.target.value })
      }
    />

    <input
      className="input"
      placeholder="Description 3"
      value={aboutData.description3}
      onChange={(e) =>
        setAboutData({ ...aboutData, description3: e.target.value })
      }
    />

    <input
      className="input"
      placeholder="Quote"
      value={aboutData.quote}
      onChange={(e) =>
        setAboutData({ ...aboutData, quote: e.target.value })
      }
    />

    {/* IMAGE UPLOAD */}
    <div {...aboutRoot()} className="dropzone">
      <input {...aboutInput()} />
      <p>📤 Drag & Drop About Image</p>
    </div>

    {aboutPreview && (
      <img src={aboutPreview} className="preview" />
    )}

    <button type="submit" className="submitBtn">Update About</button>
  </form>
</section>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="modalBg">
          <form className="modernForm" onSubmit={uploadSlider}>
            <button
              type="button"
              className="closeBtn"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h2 className="formTitle">Upload Slider 📸</h2>

            <input
              className="input"
              placeholder="Title"
              value={sliderTitle}
              onChange={(e) => setSliderTitle(e.target.value)}
            />

            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <p>📤 Drag & Drop or Click to Upload</p>
            </div>

            {sliderPreview && <img src={sliderPreview} className="preview" />}

            <button type="submit" className="submitBtn">Upload</button>
          </form>
        </div>
      )}

      {/* ================= STYLES ================= */}
      <style>{`
.page{
  padding:100px 120px;
  background:linear-gradient(to bottom,#000,#111);
  color:white;
  min-height:100vh;
}

.mainTitle{
  text-align:center;
  font-size:32px;
  margin-bottom:80px;
}

.section{
  max-width:1100px;
  margin:auto;
  margin-bottom:120px;
}

.title{
font-size: 30px;
  text-align:center;
  color:#ccc;
  margin-bottom:40px;
}

/* FORM */
.formBox, .modernForm{
  max-width:420px;
  margin:0 auto 40px;
  padding:30px;
  border-radius:16px;
  background:rgba(255,255,255,0.05);
  backdrop-filter:blur(15px);
  border:1px solid rgba(255,255,255,0.1);
  display:flex;
  flex-direction:column;
  gap:15px;
  position:relative;
}

.input{
  padding:12px;
  border-radius:10px;
  border:1px solid #333;
  background:#1a1a1a;
  color:#eee;
}

.dropzone{
  border:2px dashed #555;
  padding:25px;
  text-align:center;
  border-radius:10px;
  cursor:pointer;
}

.preview{
  width:100%;
  height:200px;
  object-fit:cover;
  border-radius:10px;
}

.submitBtn{
  padding:12px;
  border:none;
  border-radius:10px;
  background:white;
  color:black;
  font-weight:bold;
  cursor:pointer;
}

/* GRID */
.grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
}

.card{
  position:relative;
  aspect-ratio:1/1;
  border-radius:12px;
  overflow:hidden;
}

.card img{
  width:100%;
  height:100%;
  object-fit:cover;
}

/* BUTTONS */
.delete{
  position:absolute;
  top:10px;
  right:10px;
  background:rgba(0,0,0,0.6);
  border:none;
  color:white;
  width:30px;
  height:30px;
  border-radius:50%;
}

.overlay{
  position:absolute;
  bottom:0;
  width:100%;
  background:rgba(0,0,0,0.7);
  text-align:center;
  padding:10px;
}

.btnRow{
  display:flex;
  justify-content:center;
  gap:10px;
}

.approve{background:#00c853;border:none;padding:5px 10px;color:white;}
.reject{background:red;border:none;padding:5px 10px;color:white;}

.sliderHeader{
  position:relative;
}

.addBtn{
  position:absolute;
  right:0;
  top:0;
  background:#1976d2;
  padding:8px 16px;
  border:none;
  color:white;
  border-radius:6px;
}

/* MODAL */
.modalBg{
  position:fixed;
  top:0;left:0;
  width:100%;height:100%;
  background:rgba(0,0,0,0.8);
  display:flex;
  justify-content:center;
  align-items:center;
}

.closeBtn{
  position:absolute;
  top:10px;
  right:10px;
  background:red;
  border:none;
  width:30px;
  height:30px;
  border-radius:50%;
  color:white;
}
      `}</style>
    </div>
  );
}

export default AdminUpload;

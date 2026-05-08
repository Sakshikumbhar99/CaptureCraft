import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import API from "../services/api";

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const [selectedIndex, setSelectedIndex] = useState(null);

  // ✅ NEW LOADING STATE
  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "Flower",
    "Nature",
    "Sunset",
    "Historical",
    "Wallpaper",
    "Leaf",
  ];

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const res = await API.get("/photos");
      setPhotos(res.data);
      setFilteredPhotos(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  // const filterCategory = (category) => {
  //   setActiveCategory(category);

  //   if (category === "All") {
  //     setFilteredPhotos(photos);
  //   } else {
  //     const filtered = photos.filter((item) => item.category?.toLowerCase() === category.toLowerCase());
  //     setFilteredPhotos(filtered);
  //   }
  // };

  const filterCategory = (category) => {
    setActiveCategory(category);

    if (category === "All") {
      setFilteredPhotos(photos);
    } else {
      const filtered = photos.filter(
        (item) =>
          item.category &&
          item.category.toLowerCase() === category.toLowerCase(),
      );

      setFilteredPhotos(filtered);
    }
  };

  // ✅ DOWNLOAD FIX
  const handleDownload = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log("Download failed", error);
    }
  };

  const nextImage = () => {
    setSelectedIndex((prev) =>
      prev === filteredPhotos.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? filteredPhotos.length - 1 : prev - 1,
    );
  };

  return (
    <>
      <div className="galleryPage">
        {/* CATEGORY */}
        <div className="filterBar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => filterCategory(cat)}
              className={`filterBtn ${activeCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 🔥 LOADER */}
        {loading ? (
          <div className="loader"></div>
        ) : (
          <div className="masonry">
            {filteredPhotos.map((item, index) => (
              <div
                key={item._id}
                className="card fadeIn"
                onClick={() => setSelectedIndex(index)}
              >
                <img src={item.imageUrl} alt="" />
              </div>
            ))}
          </div>
        )}

        {/* 🔥 LIGHTBOX */}
        {selectedIndex !== null && (
          <div className="lightbox">
            <div
              className="blurBg"
              style={{
                backgroundImage: `url(${filteredPhotos[selectedIndex].imageUrl})`,
              }}
            />

            <div className="topBar">
              <button
                className="download"
                onClick={() =>
                  handleDownload(filteredPhotos[selectedIndex].imageUrl)
                }
              >
                ⬇
              </button>

              <button className="close" onClick={() => setSelectedIndex(null)}>
                ✖
              </button>
            </div>

            <button className="nav prev" onClick={prevImage}>
              ❮
            </button>

            <img
              src={filteredPhotos[selectedIndex].imageUrl}
              className="lightImg"
            />

            <button className="nav next" onClick={nextImage}>
              ❯
            </button>
          </div>
        )}

        {/* ================= CSS ================= */}
        <style>{`
        .galleryPage{
          padding:120px 120px;
          background:#0b0b0b;
          min-height:100vh;
          animation:pageFade 0.5s ease;
        }

        /* FILTER */
        .filterBar{
          display:flex;
          justify-content:center;
          gap:15px;
          margin-bottom:40px;
          flex-wrap:wrap;
        }

        .filterBtn{
          background:none;
          border:none;
          color:#aaa;
          font-size:15px;
            font-family: 'Montserrat', sans-serif;
            font-style: italic;
          cursor:pointer;
          padding:5px 10px;
          transition:0.3s;
        }

        .filterBtn:hover{
          color:white;
        }

        .active{
          color:white;
          border-bottom:1.5px solid white;
        }

        /* HOVER DIM */
        .masonry:hover .card{
          opacity:0.3;
          transition:0.3s;
        }

        .masonry .card:hover{
          opacity:1;
        }

        /* GRID */
        .masonry{
          column-count:3;
          column-gap:15px;
        }

        .card{
          margin-bottom:15px;
          break-inside:avoid;
          cursor:pointer;
          overflow:hidden;
        }

        .card img{
          width:100%;
          display:block;
        }

        /* FADE-IN IMAGE */
        .fadeIn{
          animation:fadeIn 0.6s ease;
        }

        /* LOADER */
        .loader{
          width:50px;
          height:50px;
          border:4px solid #333;
          border-top:4px solid white;
          border-radius:50%;
          margin:100px auto;
          animation:spin 1s linear infinite;
        }

        @keyframes spin{
          to{ transform:rotate(360deg); }
        }

        @keyframes fadeIn{
          from{ opacity:0; transform:translateY(10px); }
          to{ opacity:1; transform:translateY(0); }
        }

        @keyframes pageFade{
          from{ opacity:0; }
          to{ opacity:1; }
        }

        /* LIGHTBOX */
        .lightbox{
          position:fixed;
          top:0;
          left:0;
          width:100%;
          height:100%;
          display:flex;
          justify-content:center;
          align-items:center;
          z-index:999;
        }

        .blurBg{
          position:absolute;
          width:100%;
          height:100%;
          background-size:cover;
          background-position:center;
          filter:blur(30px) brightness(0.3);
          transform:scale(1.2);
        }

        .lightImg{
          max-width:70%;
          max-height:60%;
          position:relative;
          z-index:2;
        }

        .topBar{
          position:absolute;
          top:80px;
          right:80px;
          display:flex;
          gap:12px;
          z-index:3;
        }

        .close{
          font-size:22px;
          background:rgba(255,255,255,0.1);
          border:none;
          color:white;
          width:40px;
          height:40px;
          border-radius:50%;
          cursor:pointer;
        }

        .download{
          background:rgba(255,255,255,0.1);
          border:none;
          color:white;
          font-size:18px;
          padding:8px 12px;
          border-radius:6px;
          cursor:pointer;
        }

        .nav{
          position:absolute;
          top:50%;
          transform:translateY(-50%);
          font-size:30px;
          background:rgba(0,0,0,0.5);
          color:white;
          border:none;
          width:50px;
          height:60px;
          cursor:pointer;
          z-index:3;
        }

        .prev{ left:40px; }
        .next{ right:40px; }

        .nav:hover,
        .close:hover,
        .download:hover{
          background:rgba(255,255,255,0.2);
        }

        /* RESPONSIVE */
        @media(max-width:900px){
          .masonry{ column-count:2; }
        }

        @media(max-width:500px){
          .masonry{ column-count:1; }
          .galleryPage{ padding:100px 20px; }
        }
      `}</style>
      </div>
      <Footer />
    </>
  );
}

export default Gallery;

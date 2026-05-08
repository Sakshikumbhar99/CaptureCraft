import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Gallery from "./pages/Gallery";
import SubmitPhoto from "./pages/SubmitPhoto";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import AdminUpload from "./pages/AdminUpload";
import AdminMessages from "./pages/AdminMessages";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/submit" element={<SubmitPhoto />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin-messages" element={<AdminMessages />} />
        {/* 📝 BLOG ROUTE FIXED */}
        <Route path="/blog" element={<Blog />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/admin-upload" element={<AdminUpload />} />
      </Routes>

    
    </BrowserRouter>
  );
}

export default App;

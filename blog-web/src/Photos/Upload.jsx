import React, { useState } from 'react';
import "../Photos/Upload.css";
import axios from 'axios';

function Upload() {
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 👇 get logged-in user and token from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Only allow admin to access this page
  if (!user || user.role !== "admin") {
    return <div className="text-center mt-5 text-light">Only admin can upload blogs.</div>;
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image or video");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);        // Must match multer.single("image")
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await axios.post(
        "https://personal-blog-web-backend.onrender.com",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // 👈 send JWT token
          },
        }
      );

      console.log("Blog Uploaded:", response.data);
      alert("Blog uploaded successfully!");

      // Clear form
      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Error uploading blog:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to upload blog");
    }
  };

  return (
    <div className="background">
      <div className="box">
        <form onSubmit={handleSubmit}>

          {/* IMAGE UPLOAD */}
          <div className="circle-upload">
            {preview ? (
              <img src={preview} alt="preview" className="preview-img" />
            ) : (
              <span className="upload-text">UPLOAD</span>
            )}
            <input
              type="file"
              className="file-input-circle"
              onChange={handleFileChange}
              accept="image/*,video/*"
              required
            />
          </div>

          <br /><br />

          {/* BLOG TITLE */}
          <label className="text-light">BLOG TITLE</label>
          <input
            className="ms-2 form-control"
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <br /><br />

          {/* DESCRIPTION */}
          <label className="text-light">DESCRIPTION</label>
          <textarea
            className="dep ms-2 form-control"
            placeholder="Write as much as you wish..."
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <button type="submit" className="mt-4 btn btn-success w-100">
            UPLOAD
          </button>

        </form>
      </div>
    </div>
  );
}

export default Upload;

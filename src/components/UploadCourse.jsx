import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/UploadCourse.css";
import { FaTrash, FaPlus, FaUpload, FaVideo, FaImage } from "react-icons/fa";

const UploadCourse = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [videos, setVideos] = useState([{ id: Date.now(), file: null }]);
    const [keyLearnings, setKeyLearnings] = useState([""]);
    const [requirements, setRequirements] = useState([""]); // ✅ Now used properly
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [thumbnailProgress, setThumbnailProgress] = useState(0);
    const [videoProgress, setVideoProgress] = useState(0);
    const navigate = useNavigate();

    const categories = [
        "Web Development", "DSA", "React", "Python", 
        "Machine Learning", "AI", "Blockchain", 
        "Cyber Security", "DevOps", "UI/UX"
    ];

    const handleCreateCourse = async () => {
        try {
            setUploading(true);
            setMessage("");
            setThumbnailProgress(0);
            setVideoProgress(0);

            const { data } = await axios.post(
                "http://localhost:3000/api/createCourse",
                { title, description, longDescription, price, category, keyLearnings, requirements }, // ✅ Requirements included
                { withCredentials: true }
            );

            const courseId = data.course._id;

            if (thumbnail) {
                const formData = new FormData();
                formData.append("thumbnail", thumbnail);

                await axios.put(
                    `http://localhost:3000/api/upload-thumbnail/${courseId}`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                        withCredentials: true,
                        onUploadProgress: (progressEvent) => {
                            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            setThumbnailProgress(percentCompleted);
                        },
                    }
                );
            }

            const selectedVideos = videos.filter((video) => video.file !== null);
            if (selectedVideos.length > 0) {
                const videoFormData = new FormData();
                selectedVideos.forEach((video) => videoFormData.append("videos", video.file));

                await axios.put(
                    `http://localhost:3000/api/upload-videos/${courseId}`,
                    videoFormData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                        withCredentials: true,
                        onUploadProgress: (progressEvent) => {
                            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            setVideoProgress(percentCompleted);
                        },
                    }
                );
            }

            setMessage("✅ Course uploaded successfully!");
            navigate("/");
        } catch (error) {
            setMessage("❌ Failed to upload course", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="upload-course-container">
            <h2 className="upload-course-heading">Upload Course</h2>

               {/* Category Dropdown */}
               <label className="upload-dropdown-label">Select Course Category </label>
                <select className="upload-dropdown" value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="" disabled>Select Category</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>
            {message && <p className="upload-message">{message}</p>}

            {/* Basic Details Section */}
            <div className="upload-section">
                <h3 className="upload-subheading">Course Details</h3>
                <input type="text" className="upload-input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="text" className="upload-input" placeholder="Short Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <textarea className="upload-textarea" placeholder="Long Description" value={longDescription} onChange={(e) => setLongDescription(e.target.value)} required />
                <input type="number" className="upload-input" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />

             
            </div>

            {/* Key Learnings Section */}
            <div className="upload-section">
                <h3 className="upload-subheading">Key Learnings</h3>
                {keyLearnings.map((learning, index) => (
                    <div key={index} className="input-group">
                        <input type="text" className="upload-input" placeholder="Key Learning" value={learning} onChange={(e) => {
                            const updatedArr = [...keyLearnings];
                            updatedArr[index] = e.target.value;
                            setKeyLearnings(updatedArr);
                        }} required />
                        <FaTrash className="icon delete" onClick={() => setKeyLearnings(keyLearnings.filter((_, i) => i !== index))} />
                    </div>
                ))}
                <button className="add-button" onClick={() => setKeyLearnings([...keyLearnings, ""])}><FaPlus /> Add Learning</button>
            </div>

            {/* Course Requirements Section */}
            <div className="upload-section">
                <h3 className="upload-subheading">Course Requirements</h3>
                {requirements.map((requirement, index) => (
                    <div key={index} className="input-group">
                        <input type="text" className="upload-input" placeholder="Requirement" value={requirement} onChange={(e) => {
                            const updatedArr = [...requirements];
                            updatedArr[index] = e.target.value;
                            setRequirements(updatedArr);
                        }} required />
                        <FaTrash className="icon delete" onClick={() => setRequirements(requirements.filter((_, i) => i !== index))} />
                    </div>
                ))}
                <button className="add-button" onClick={() => setRequirements([...requirements, ""])}><FaPlus /> Add Requirement</button>
            </div>

            {/* Thumbnail Upload Section */}
            <div className="upload-section">
                <h3 className="upload-subheading">Thumbnail Upload</h3>
                <div className="input-group">
                    <input type="file" className="upload-file-input" onChange={(e) => setThumbnail(e.target.files[0])} accept="image/*" required />
                    <FaImage className="icon upload-icon" />
                </div>
                <progress value={thumbnailProgress} max="100"></progress>
            </div>

            {/* Video Upload Section */}
            <div className="upload-section">
                <h3 className="upload-subheading">Course Videos</h3>
                {videos.map((video, index) => (
                    <div key={video.id} className="input-group">
                        <input type="file" className="upload-file-input" accept="video/*" onChange={(e) => {
                            setVideos(videos.map((v) => (v.id === video.id ? { ...v, file: e.target.files[0] } : v)));
                        }} required />
                        {index > 0 && <FaTrash className="icon delete" onClick={() => setVideos(videos.filter((v) => v.id !== video.id))} />}
                    </div>
                ))}
                <button className="add-button" onClick={() => setVideos([...videos, { id: Date.now(), file: null }])}><FaVideo /> Add Video</button>
                <progress value={videoProgress} max="100"></progress>
            </div>

            {/* Upload Button */}
            <div className="upload-actions">
                <button className="upload-button" onClick={handleCreateCourse} disabled={uploading}>
                    <FaUpload /> {uploading ? "Uploading..." : "Upload Course"}
                </button>
            </div>
        </div>
    );
};

export default UploadCourse;

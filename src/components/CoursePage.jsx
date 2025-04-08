import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/CoursePage.css";

const CoursePage = () => {
  const { id } = useParams(); // Get course ID from URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/fetchCourse/${id}`, {
          withCredentials: true, // ✅ Include authentication credentials (cookies, session)
        });
        setCourse(response.data.course); // Save fetched course
      } catch (err) {
        console.error("❌ Error fetching course:", err);
        setError("Course Not Found ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <h3 className="loading-message">Loading Course... ⏳</h3>;
  if (error) return <h3 className="error-message">{error}</h3>;

  return (
    <div className="course-page">
      {/* Header Section */}
      <div className="course-header">
        <h1 className="course-title">{course.title}</h1>
        <p className="course-description">{course.description}</p>
      </div>

      {/* Course Content Section */}
      <div className="course-content">
        <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
        <div className="course-details">
          <h3 className="course-price">Price: ₹{course.price}</h3>
        </div>
      </div>

      {/* Additional Details */}
      <div className="course-extra">
        <h2>What You Will Learn</h2>
        <ul className="course-learnings">
          {course.keyLearnings.map((learning, index) => (
            <li key={index}>{learning}</li>
          ))}
        </ul>

        <h2>Requirements</h2>
        <ul className="course-requirements">
          {course.requirements.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          ))}
        </ul>

        <h2>Course Details</h2>
        <p className="long-description">{course.longDescription}</p>
      </div>

      {/* Course Videos Section */}
      <div className="course-videos">
        <h2 className="videos-header">Course Videos</h2>
        {course.videos && course.videos.length > 0 ? (
          course.videos.map((videoUrl, index) => (
            <div key={index} className="video-wrapper">
              <label className="video-label">Video {index + 1}: Lesson {index + 1}</label>
              <video controls className="course-video" preload="metadata">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))
        ) : (
          <p className="no-videos">No Videos Available</p>
        )}
      </div>
    </div>
  );
};

export default CoursePage;

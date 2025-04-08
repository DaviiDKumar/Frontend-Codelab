import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../CSS/Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const id  = user._id

  useEffect(() => {
    if (user) {
      setUserData(user);
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUserData(storedUser.user);
      } else {
        navigate("/login");
      }
    }
  }, [user, navigate]);

  const handleNavigate = () => {
    navigate("/updateProfile");
  };

  const handleUploadCourse = () => {
    navigate("/uploadcourse");

   };

   const handleDeleteNavigate = () => {
    navigate(`/deleteButton/${id}`); // Redirect to delete page
};

 

 
  if (!userData) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="sidebar">
          <h1 className="profile-title">Your Profile</h1>
          <div className="profile-img-container">
            <img className="imageinprofile" src={userData.profilePicture} alt="Profile" />
          </div>
          <button className="sidebar-btn" onClick={handleNavigate}>Update Profile</button>
          <button className="sidebar-btn" onClick={handleDeleteNavigate}>Delete Account</button>
        
          <button className="sidebar-btn" onClick={handleUploadCourse}>Upload Course</button>
          <button className="sidebar-btn" onClick={() => alert("View Orders")}>View Orders</button>
          <button className="sidebar-btn" onClick={() => alert("Payment History")}>Payment History</button>
        </div>

        <div className="profile-card">
          <div className="profile-info-container">
            <div className="profile-info-field">
              Name: <p className="profile-info-text">{userData.name}</p>
            </div>
            <div className="profile-info-field">
              Email: <p className="profile-info-text">{userData.email}</p>
            </div>
            <div className="profile-info-field">
              Phone: <p className="profile-info-text">{userData.phone || "Not Provided"}</p>
            </div>
            <div className="profile-info-field">
              Address: <p className="profile-info-text">{userData.address || "Not Provided"}</p>
            </div>
            <div className="profile-info-field">
              Bio: <p className="profile-info-text">{userData.bio || "No Bio Available"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

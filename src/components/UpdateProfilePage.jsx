import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import "../css/UpdateProfile.css";
import {  useNavigate } from "react-router-dom";

function UpdateProfilePage() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setBio(user.bio || "");
      setProfilePicPreview(user.profilePicture || "");
    }
  }, [user, user?._id]); // 👈 This will force re-render every time user ID changes


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    if (file) {
      setProfilePicPreview(URL.createObjectURL(file)); // Preview
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    if (profilePicture) {
      formData.append("image", profilePicture);
    }

    try {
      setLoading(true);

      // Update User Data
      const updateResponse = await axios.put(
        `https://backend-codelab.onrender.com/api/updateUser/${user._id}`,
        { name, email, phone, address, bio },
        { withCredentials: true }
      );

      if (updateResponse.data.user) {
        let updatedUser = updateResponse.data.user;

        // Upload Profile Picture
        if (profilePicture) {
          const uploadResponse = await axios.post(
            `https://backend-codelab.onrender.com/api/upload/${user._id}`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
              withCredentials: true,
            }
          );

          if (uploadResponse.data.url) {
            updatedUser.profilePicture = uploadResponse.data.url;
          }
        }

        // 💪 Save to Local Storage FIRST
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // 🚀 Dispatch after Local Storage Update
        dispatch(setUser(updatedUser));


        // Refill Inputs without Refresh
        setName(updatedUser.name);
        setEmail(updatedUser.email);
        setPhone(updatedUser.phone);
        setAddress(updatedUser.address);
        setBio(updatedUser.bio);
        setProfilePicPreview(updatedUser.profilePicture);

        console.log("Profile Updated Successfully", updatedUser);

        navigate("/profile");
      }
    } catch (error) {
      setError("Failed to update profile");
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="update-profile-container">
      <div className="update-profile-title">Update Profile</div>
      {error && <div className="update-profile-error">{error}</div>}

      <form onSubmit={handleProfileUpdate} className="update-profile-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell something about yourself"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {profilePicPreview && (
          <div className="profile-pic-preview">
            <img src={profilePicPreview} alt="Profile Preview" />
          </div>
        )}

        <div className="update-profile-btn">
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfilePage;

import { useSelector } from "react-redux";
import "../css/Welcome.css";

const Welcome = () => {
  const { user } = useSelector((state) => state.user);
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const userData = user || (storedUser ? storedUser.user : null);

  if (!userData) {
    return <p className=" welcome-banner notloggedin-msg">Hello, Welcome  <br /> Create an account to access all features ... </p>;
  }

  return (
    <div className="welcome-banner">
      <img
        src={userData.profilePicture } // Default Profile Pic
        alt="Profile"
        className="profile-pic"
      />
      <div className="welcome-text">
        <h2>Welcome Back, <span className="Higlight-Name">{userData.name}</span> 👋</h2>
        <p>We are excited to have you back! Explore our latest courses and boost your skills today.</p>
      </div>
    </div>
  );
};

export default Welcome;

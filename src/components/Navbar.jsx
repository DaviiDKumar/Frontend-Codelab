import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { clearCart, saveCart } from "../redux/cartSlice";
import {
  FaHome,
  FaSignInAlt,
  FaUserPlus,
  FaTachometerAlt,
  FaSignOutAlt,
  FaShoppingCart,
  FaBook,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "../css/Navbar.css";
import { useState } from "react";
// import { savemyLearn } from "../redux/myLearningSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const totalQuantity = useSelector((state) =>
    state.cart.cart.reduce((total, item) => total + item.quantity, 0)
  );
  const myLearningCount = useSelector((state) => state.myLearning.myLearning.length); // My Learning Count
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cart);
  // const myLearningItems = useSelector((state) => state.myLearning.myLearning);

  const handleLogout = async () => {
    try {
      await dispatch(saveCart({ userId: user._id, cartItems }));
      // await dispatch(savemyLearn({ userId: user._id, myLearningItems }));
      console.log("Logging out...", user.name);

      const response = await axios.post(
        "http://localhost:3000/api/logout",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        dispatch(clearCart());
        dispatch(logout());
        localStorage.removeItem("cartItems");
        console.log("Successfully Logged Out");
        navigate("/login");
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  return (
    <div className="navbar">
      <div className="logo">
        <FaBook /> CODE LAB
      </div>

      <div className={`nav-links ${menuOpen ? "show" : ""}`}>
        <Link to="/" className="nav-item" onClick={() => setMenuOpen(false)}>
          <FaHome className="nav-icon" /> Home
        </Link>

        <Link to="/cart" className="nav-item" onClick={() => setMenuOpen(false)}>
          <FaShoppingCart className="nav-icon" />
          Cart
          {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
        </Link>

        {user && (
          <Link to="/my-Learning" className="nav-item" onClick={() => setMenuOpen(false)}>
            <FaBook className="nav-icon" /> My Learning
            {myLearningCount > 0 && <span className="cart-badge">{myLearningCount}</span>}
          </Link>
        )}

        {!user ? (
          <>
            <Link to="/login" className="nav-item" onClick={() => setMenuOpen(false)}>
              <FaSignInAlt className="nav-icon" /> Login
            </Link>
            <Link to="/signup" className="nav-item" onClick={() => setMenuOpen(false)}>
              <FaUserPlus className="nav-icon" /> Signup
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="nav-item" onClick={() => setMenuOpen(false)}>
              <FaTachometerAlt className="nav-icon" /> Profile
            </Link>

            <button onClick={handleLogout} className="nav-item logout-btn">
              <FaSignOutAlt className="nav-icon" /> Logout
            </button>
          </>
        )}
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </div>
  );
};

export default Navbar;

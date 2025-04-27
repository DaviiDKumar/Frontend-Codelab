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

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const totalQuantity = useSelector((state) =>
    state.cart.cart.reduce((total, item) => total + item.quantity, 0)
  );
  const myLearningCount = useSelector((state) => state.myLearning.myLearning.length);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Added loading state
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cart);

  const handleLogout = async () => {
    setIsLoggingOut(true); // Set loading state to true

    try {
      await dispatch(saveCart({ userId: user._id, cartItems }));
      console.log("Logging out...", user.name);

      const response = await axios.post(
        "https://backend-codelab.onrender.com/api/logout",
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
    } finally {
      setIsLoggingOut(false); // Reset loading state when done
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbarNav">
      <div className="logoNav">
        <h1><FaBook /> CODE LAB</h1>
      </div>

      <div className={`nav-linksNav ${menuOpen ? "showNav" : ""}`}>
        <Link to="/" className="nav-itemNav" onClick={() => setMenuOpen(false)}>
          <FaHome className="nav-iconNav" /> Home
        </Link>

        <Link to="/cart" className="nav-itemNav" onClick={() => setMenuOpen(false)}>
          <FaShoppingCart className="nav-iconNav" />
          Cart
          {totalQuantity > 0 && <span className="cart-badgeNav">{totalQuantity}</span>}
        </Link>

        {user && (
          <Link to="/my-Learning" className="nav-itemNav" onClick={() => setMenuOpen(false)}>
            <FaBook className="nav-iconNav" /> My Learning
            {myLearningCount > 0 && <span className="cart-badgeNav">{myLearningCount}</span>}
          </Link>
        )}

        {!user ? (
          <>
            <Link to="/login" className="nav-itemNav" onClick={() => setMenuOpen(false)}>
              <FaSignInAlt className="nav-iconNav" /> Login
            </Link>
            <Link to="/signup" className="nav-itemNav" onClick={() => setMenuOpen(false)}>
              <FaUserPlus className="nav-iconNav" /> Signup
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="nav-itemNav" onClick={() => setMenuOpen(false)}>
              <FaTachometerAlt className="nav-iconNav" /> Profile
            </Link>

            <button onClick={handleLogout} className="nav-itemNav logout-btnNav">
              {isLoggingOut ? (
                <>
                  <span>Logging out...</span> {/* Show "Logging out..." when logging out */}
                </>
              ) : (
                <>
                  <FaSignOutAlt className="nav-iconNav" /> Logout
                </>
              )}
            </button>
          </>
        )}
      </div>

      <div className="hamburgerNav" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </div>
  );
};

export default Navbar;

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { clearCart, } from "../redux/cartSlice";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export const useHandleLogout = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    // const cartItems = useSelector((state) => state.cart.cart);

    const handleLogout = async () => {
        if (!user) return; // Prevents execution if user is null

        try {
            console.log("Logging out...", user.name);


            // Send logout request
            const response = await axios.post(
                "http://localhost:3000/api/logout",
                {},
                { withCredentials: true }
            );

            if (response.status === 200) {
                dispatch(clearCart()); // Clear cart after logout
                dispatch(logout()); // Clear user session
                localStorage.removeItem("cartItems"); // Clear local storage
                console.log("Successfully Logged Out");

               
            } else {
                console.log("Logout failed");
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return handleLogout;
};

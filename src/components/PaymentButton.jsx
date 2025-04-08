import { createOrder } from "../api/Api.js";
import axios from "axios";
import PropTypes from "prop-types";
import "../css/PaymentButton.css";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice.js";
import { addToLearning } from "../redux/myLearningSlice.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

const PaymentButton = ({ amount }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true); // Start loading
    try {
      const order = await createOrder(amount);
      if (!order) {
        alert("Failed to create order!");
        setLoading(false);
        return;
      }

      console.log("Order Created:", order);

      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        handler: async (response) => {
          console.log("Payment Response:", response);

          const verify = await axios.post(
            "http://localhost:3000/api/verify-payment",
            response,
            { withCredentials: true }
          );

          if (verify.data.message === "Payment Verified Successfully") {
            alert(verify.data.message);
            
            dispatch(addToLearning(cart));    // Move to My Learning
            dispatch(clearCart()); // Clear Cart
            navigate("/SaveMyLearningButton")
          } else {
            alert("Payment Verification Failed!");
          }
        },
        prefill: {
          name: "David",
          email: "david@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: () => {
            console.log("Payment Cancelled");
            setLoading(false); // Stop loading if user closes the popup
          },
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
      setLoading(false); // Revert back text as soon as Razorpay box opens
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment Failed!");
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <button onClick={handlePayment} className="payment-button" disabled={loading}>
      {loading ? "Please wait..." : `Pay Now ₹${amount}`}
    </button>
  );
};

PaymentButton.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default PaymentButton;

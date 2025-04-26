import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper Function to Get Cart from Local Storage
const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  if (!cart || cart === "undefined") {
    return []; // If no cart is found or undefined, return an empty array
  }
  try {
    return JSON.parse(cart); // Parse cart data if valid
  } catch (error) {
    console.error("Error parsing cart data from LocalStorage:", error);
    return []; // Return empty array if JSON parsing fails
  }
};

// Async Thunk to Save Cart to Backend
export const saveCart = createAsyncThunk(
  "cart/saveCart",
  async ({ userId, cartItems }) => {
    try {
      console.log("Saving cart items to the backend:", cartItems);

      // Make sure cartItems is always an array
      const updatedCartItems = Array.isArray(cartItems) ? cartItems : [cartItems];

      // Ensure the payload has quantity
      const finalCartItems = updatedCartItems.map(item => ({
        ...item,
        quantity: item.quantity || 1, // Ensure quantity is included
      }));

      const response = await axios.put(
        `http://localhost:3000/api/savethecart/${userId}`, 
        { cartItems: finalCartItems }, // Send cartItems with quantity
        { withCredentials: true }
      );

      if (response.data.message === "Cart items updated successfully") {
        console.log("✅ Cart Items Saved Successfully");
      
      }
    } catch (error) {
      console.error("❌ Error saving cart items to the backend:", error);
    }
  }
);



const initialState = {
  cart: getCartFromLocalStorage(), // Initialize cart from LocalStorage
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add Product to Cart
    addToCart(state, action) {
      const existing = state.cart.find((item) => item._id === action.payload._id);
      if (existing) {
        existing.quantity += 1; // Increase quantity if product already exists
      } else {
        state.cart.push({ ...action.payload, quantity: 1 }); // Add new product with quantity 1
      }
      localStorage.setItem("cart", JSON.stringify(state.cart)); // Sync cart with LocalStorage
    },

    // Remove Product from Cart
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart)); // Sync cart with LocalStorage
    },


    // Update Product Quantity
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.cart.find((item) => item._id === id);
      if (item) {
        item.quantity = quantity; // Update quantity if product exists
        if (quantity <= 0) {
          state.cart = state.cart.filter((item) => item._id !== id); // Remove product if quantity is zero or less
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.cart)); // Sync cart with LocalStorage
    },

    // Set Cart Items Directly (Useful on Login Fetch)
    setCart: (state, action) => {
      state.cart = action.payload; // Replace cart with payload data
      localStorage.setItem("cart", JSON.stringify(state.cart)); // Sync cart with LocalStorage
    },

    // Clear Cart on Logout or After Payment
    clearCart(state) {
      state.cart = []; // Reset cart array
      localStorage.removeItem("cart"); // Remove cart from LocalStorage
    },
  },
});

// Export Actions
export const { addToCart, removeFromCart, updateQuantity, clearCart, setCart } =
  cartSlice.actions;

// Export Reducer
export default cartSlice.reducer;

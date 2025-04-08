import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/Cart.css";
import PaymentButton from "../components/PaymentButton";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();

  // Filtered cart items by matching cart IDs with courses
  const { totalCourses } = useSelector((state) => state.course);

  const cartItems = cart.map((cartItem) => {
    const course = totalCourses.find((course) => course._id === cartItem._id); // Match from totalCourses
    return course ? { ...course, quantity: cartItem.quantity } : null;
  }).filter((item) => item !== null); // Filter out null items

  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.error("Item removed from cart ❌");
  };

  const handleQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemove(id);
    } else {
      dispatch(updateQuantity({ id, quantity }));
      toast.info("Quantity Updated 🔄");
    }
  };


  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty 😢</p>
      ) : (
        cartItems.map((item) => (
          <div key={item._id} className="cart-item">
            <div className="cart-item-wrapper">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="cart-item-image"
              />

              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <h4>{item.description}</h4>
                <p className="cart-item-price">₹{item.price}</p>
              </div>
            </div>

            <div className="cart-item-quantity">
              <button onClick={() => handleQuantity(item._id, item.quantity - 1)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantity(item._id, item.quantity + 1)}>
                +
              </button>
            </div>

            <button className="cart-item-remove" onClick={() => handleRemove(item._id)}>
              Remove
            </button>
          </div>
        ))
      )}
      <h3 className="cart-total">Total: ₹{getTotal()}</h3>

      {cartItems.length > 0 && <PaymentButton amount={getTotal()} />}
    </div>
  );
};

export default Cart;

import { useEffect, useState } from "react";
import "./Cart.css";
import Lock from "../../assets/lockic.svg";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const removeFromCart = (flowerId) => {
    const updatedCart = cartItems.filter(item => item.flowerId !== flowerId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be signed in to checkout");
      return;
    }

    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/stripe/create-checkout-session`;
      console.log("🚀 Sending checkout request to:", apiUrl);

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartItems }),
      });

      const contentType = res.headers.get("content-type");
      if (!res.ok) {
        const text = await res.text();
        console.error("❌ Server error:", text);
        alert("Failed to create checkout session");
        return;
      }

      const data = contentType.includes("application/json") ? await res.json() : {};
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("❌ No URL in Stripe response:", data);
      }
    } catch (err) {
      console.error("❌ Error creating Stripe session:", err);
    }
  };

  if (cartItems.length === 0) {
    return <div className="empty-cart">Your cart is empty.</div>;
  }

  return (
    <div className="cart-container">
      {cartItems.map(item => (
        <div className="cart-item" key={item.flowerId}>
          <div className="cart-img-n-q">
            <img src={item.image} alt={item.name} className="cart-img" />
            <div className="cart-name-q">
              <h3>{item.name}</h3>
              <p>Quantity ({item.quantity})</p>
            </div>
            <div className="cart-info">
              <div className="cart-price"><p>${item.price}</p></div>
            </div>
          </div>
          <hr />
          <div className="sub-total">
            <p>SubTotal: </p><p>${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <div className="shipping">
            <p>Shipping</p> <p className="nextstep">Calculated at next step</p>
          </div>
          <hr />
          <span
            className="delete-icon material-symbols-outlined"
            onClick={() => removeFromCart(item.flowerId)}
          >
            delete
          </span>
        </div>
      ))}
      <div className="total">
        <h3>Total:</h3><h3>${total.toFixed(2)}</h3>
      </div>
      <div className="cart-btn">
        <button onClick={handleCheckout}>CHECK OUT</button>
      </div>
      <div className="cart-footer">
        <h5>Secure Checkout</h5> <img src={Lock} alt="Lock icon" />
      </div>
    </div>
  );
};

export default Cart;

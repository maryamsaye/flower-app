import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Product.css";
import { HashLink } from "react-router-hash-link";

const Product = () => {
  const { id } = useParams();
  const [flower, setFlower] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [count, setCount] = useState(1);
  const [randomFlowers, setRandomFlowers] = useState(null);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });



  const showPopup = (message, type) => {
    setPopup({ show: true, message, type });
    setTimeout(() => {
      setPopup({ show: false, message: "", type: "" });
    }, 3000);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    showPopup("Please sign in to add items to your basket.", "error");
    localStorage.setItem("redirectAfterLogin", window.location.pathname);
    return;
  }

  const cartItem = {
    flowerId: flower._id,
    name: flower.name,
    image: flower.image,
    price: flower.price,
    quantity: count,
  };

  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItemIndex = existingCart.findIndex(item => item.flowerId === cartItem.flowerId);

  if (existingItemIndex !== -1) {
    existingCart[existingItemIndex].quantity += count;
  } else {
    existingCart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(existingCart));
  showPopup("Flower added to basket!", "success");
};


  useEffect(() => {
    const fetchFlower = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/flowers/${id}`);
        const data = await res.json();
        setFlower(data);
      } catch (err) {
        setError("Failed to load Flower details.");
      } finally {
        setLoading(false);
      }
    };
    fetchFlower();
  }, [id]);

  useEffect(() => {
    const fetchRandomFlowers = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/flowers/random`);
        const data = await res.json();
        setRandomFlowers(data.flowers);
      } catch (err) {
        setError("Failed to fetch flowers.");
      } finally {
        setLoading(false);
      }
    };
    fetchRandomFlowers();
  }, []);

  if (loading) return <div className="flowerloading">Flower Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!flower) return <div className="noflowersmsg">Flower not Found</div>;

  return (
    <>
      {popup.show && (
        <div className={`popup-message ${popup.type}`}>
          {popup.message}
        </div>
      )}

      <div className="flower-detail-page">
        <div className="product-card" id="product-card">
          <div className="product-image">
            <img src={flower.image} alt="flower pic" className="flower-image" />
            <h5 className="producttext hh5">BOUQUETS FRESH FLOWERS / QUICK ORDER</h5>
            <h3 className="producttext hh3">{flower.name} - ${flower.price}</h3>
          </div>

          <div className="product-details">
            <p className="producttext pp">{flower.description}</p>
          </div>

          <div className="flower-quantity">
            <h3 className="qh">Quantity</h3>
            <div className="quantity-flex">
              <button className="incdec" onClick={decrementCount}>-</button>
              <div className="count-display">{count}</div>
              <button className="incdec" onClick={incrementCount}>+</button>
            </div>
          </div>

          <div className="add-basket">
            <button className="add-basket-btn" onClick={handleAddToCart}>
              ADD TO BASKET
            </button>
          </div>
        </div>

        {/* 1440 screen */}
        <div className="container-1440" id="container-1440">
          <div className="image-1140">
            <img src={flower.image} alt="flower pic" className="flower-image" />
          </div>
          <div className="details-1440">
            <h5 className="producttext hh5">BOUQUETS FRESH FLOWERS / QUICK ORDER</h5>
            <h3 className="producttext hh3">{flower.name} - ${flower.price}</h3>
            <p className="producttext pp">{flower.description}</p>
            <div className="qfl">
              <h3 className="qh">Quantity</h3>
              <div className="qbtn">
                <button className="incdec" onClick={decrementCount}>-</button>
                <div className="count-display"><span className="count">{count}</span></div>
                <button className="incdec" onClick={incrementCount}>+</button>
              </div>
            </div>
            <div className="add-basket-con">
              <button className="add-basket-btn" onClick={handleAddToCart}>
                ADD TO BASKET
              </button>
            </div>
          </div>
        </div>

        <div className="ymal">
          <h3>You may also like…</h3>
        </div>

        <div className="suggestions">
          {randomFlowers && randomFlowers.map((flower) => (
            <HashLink to={`/product/${flower._id}#product-card`} key={flower._id}>
              <div className="random-flower">
                <img src={flower.image} alt={flower.name} />
                <h5 className="rh5">{flower.name}</h5>
                <p className="rp">${flower.price}</p>
              </div>
            </HashLink>
          ))}
        </div>

        <div className="suggestions-1440">
          {randomFlowers && randomFlowers.map((flower) => (
            <HashLink to={`/product/${flower._id}#container-1440`} key={flower._id}>
              <div className="random-flower">
                <img src={flower.image} alt={flower.name} />
                <h5 className="rh5">{flower.name}</h5>
                <p className="rp">${flower.price}</p>
              </div>
            </HashLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
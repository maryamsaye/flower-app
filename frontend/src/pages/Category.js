import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './Category.css';
import { Link } from "react-router-dom";
import StampImage from "../assets/fresh-hero.png"


const Category = () => {
  const { categoryType } = useParams();
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categoryMap = {
    fresh: "Fresh Flowers",
    dried: "Dried Flowers",
    live: "Live Plants",
    aroma: "Aroma Candels",
    fresheners: "Fresheners",
  };

  const categoryName = categoryMap[categoryType];


  useEffect(() => {
    if (!categoryName) {
      setError("Invalid category");
      setLoading(false);
      return;
    }

    const fetchFlowers = async () => {
  try {
    const res = await fetch('https://flower-app-jp7a.onrender.com/api/flowers');
    const data = await res.json();

    console.log("API Response:", data); // inspect this in console

    // FIX: Remove .flowers if the response is an array
    const filtered = data.filter(
      (flower) => flower.category === categoryName
    );

    setFlowers(filtered);
  } catch (err) {
    setError("Error fetching flowers.");
    console.error(err);
  } finally {
    setLoading(false);
  }
};

    fetchFlowers();
  }, [categoryName]);

  if (loading) {
    return <div className="flowerloading">Loading flowers...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (flowers.length === 0) {
    return <div className="noflowersm">No flowers found in the "{categoryName}" category.</div>;
  }

  return (
    <>
    <div className="category-page">
        <div className="category-stamp-img">
            <img className="category-stamp" src={StampImage} alt="stamp" />
            <h3>{categoryName}</h3>
        </div>

        <div className="flowers-grid">
            {flowers.map((flower) => (
                <Link to={`/product/${flower._id}`} key={flower._id}>
                    <div className="flower-item">
                        <img src={flower.Image} alt={flower.title} />
                        <div className="flower-np">
                            <h6>{flower.title}</h6>
                            <p>Price: ${flower.price}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      </div>    
      </>
  );
};

export default Category;
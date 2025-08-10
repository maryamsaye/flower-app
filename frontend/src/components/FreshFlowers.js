// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import freshBanner from '../assets/freshBanner.png';
// import './FreshFlowers.css';

// const freshFlowerIds = [
//   '67db3c72e2f589125d1b94ed',
//   '67db3fbce2f589125d1b94ef',
//   '67db4063e2f589125d1b94f1',
//   '67db4544e2f589125d1b94f5',
//   '682bac84474321f8f20d56f4',
//   '682fa1eed4428c990f757894',
//   '683f9845c75fe331b7003b20',
//   '684e20f90f7e9f19147263f4',
//   '684ec3cf8984e8ed69783135',
//   '684ec45f8984e8ed69783137'
// ];

// const FreshFlowers = () => {
//   const [flowers, setFlowers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFlowers = async () => {
//       try {
//         const responses = await Promise.all(
//           freshFlowerIds.map(id =>
//             axios.get(`https://flower-delivery-app.onrender.com/api/flowers/${id}`)
//           )
//         );
//         setFlowers(responses.map(res => res.data));
//       } catch (error) {
//         console.error('Error fetching fresh flowers:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFlowers();
//   }, []);

//   return (
//     <section className="freshflower-wrapper">
//       <h1 className="section-title">Fresh Flowers</h1>

//       {loading ? (
//         <p className="loading-text">Loading fresh flowers...</p>
//       ) : (
//         <div className="content-layout">
//           <div className="banner-container">
//             <img src={freshBanner} alt="Fresh Flowers Banner" className="banner-image" />
//           </div>

//           <div className="flower-grid">
//             {flowers.map(flower => (
//               <Link to={`/product/${flower._id}`} key={flower._id} className="flower-card">
//                 <img src={flower.image} alt={flower.name} className="flower-image" />
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default FreshFlowers;
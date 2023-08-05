// frontend/src/components/SpotDetails/index.js
import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotDetails } from '../../store/spot';
import './SpotDetails.css';


const SpotDetails = () => {
  console.log('Test');
};


// const SpotDetails = () => {
//   const { spotId } = useParams();
// // IN OTHER SITES, THE STATE.SPOT.DETAILS NEEDS TO MATCH THE PROPERTY IN THE REDUCER
//   const spot = useSelector((state) => state.spot.details);
//   const dispatch = useDispatch();

//   // console.log("HEYYYYYY GURLLL");

//   useEffect(() => {
//     dispatch( getSpotDetails(spotId));
//   }, [dispatch, spotId]);

//   if (!spot) {
//     // Render a loading state or return null when the data is still loading
//     return <div>Loading...</div>;
//   }

//   const handleReserveClick = () => {
//     alert('Feature coming soon');
//   };

//   //SHOW ALL RATINGS AND REVIEWS FOR THE SPOT

//   // IF THE USER IS NOT THE OWNER OF THE SPOT,
//   // SHOW THE REVIEWFORMMODALBUTTON
//   // ADD ${spot?.country} AFTER ADDING COUNTRY TO SPOT MODEL AND MIGRATION AND SEEDERS



//   return (
//     <div className="spot-details-container">
//       <div className="spot-details-heading">
//         <h1>{spot?.name}</h1>
//         <h2>Location: {`${spot?.city}, ${spot?.state}`}</h2>
//       </div>
//       <div className="spot-details-icons">
//         <div className="spot-details-large-icon">
//           <img src={spot?.largeImage} alt={`Large image of ${spot?.name}`} />
//         </div>
//         <div className="spot-details-small-icons">
//           {spot?.smallImages.map((image, index) => (
//             <div key={index}>
//               <img src={image} alt={`Small image ${index + 1} of ${spot?.name}`} />
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="spot-details-host">
//         <h3>Hosted by {`${spot?.user.firstName} ${spot?.user.lastName}`}</h3>
//       </div>
//       <div className="spot-details-description">
//         <p>{spot?.description}</p>
//       </div>
//       <div className="spot-details-callout">
//         <p>Price: ${spot?.price} per night</p>
//         <button onClick={handleReserveClick}>Reserve</button>
//       </div>
//     </div>
//   );
// };

export default SpotDetails;

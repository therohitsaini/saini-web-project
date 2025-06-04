// import React, { useState } from "react";
// import {
//     CountryDropdown,
//     StateDropdown,
//     CityDropdown,
// } from "react-country-state-city";

// const ReactCityState = () => {
//     const [country, setCountry] = useState(null);
//     const [state, setState] = useState(null);
//     const [city, setCity] = useState(null);

//     return (
//         <div>
//             <CountryDropdown
//                 value={country}
//                 onChange={(e, value) => setCountry(value)}
//             />
//             <StateDropdown
//                 country={country}
//                 value={state}
//                 onChange={(e, value) => setState(value)}
//             />
//             <CityDropdown
//                 country={country}
//                 state={state}
//                 value={city}
//                 onChange={(e, value) => setCity(value)}
//             />
//         </div>
//     );
// };

// export default ReactCityState;
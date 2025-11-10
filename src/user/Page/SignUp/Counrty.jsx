import React, { useState, useEffect } from "react";
import { State, City } from "country-state-city";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [currency, setCurrency] = useState("");
  const [phoneCode, setPhoneCode] = useState("");

useEffect(() => {
  fetch("https://restcountries.com/v3.1/all?fields=name,idd")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data)) {
        throw new Error("Unexpected API response format");
      }

      const countryPhoneCodes = data.map((country) => {
        const name = country.name?.common || "Unknown";
        const root = country.idd?.root || "";
        const suffixes = country.idd?.suffixes || [""];
        const phoneCodes = suffixes.map((suffix) => `${root}${suffix}`);
        return { name, phoneCodes };
      });

      setCountries(countryPhoneCodes);
    })
    .catch((error) => console.error("Error fetching countries:", error));
}, []);

  const handleCountryChange = (e) => {
    const isoCode = e.target.value;
    const country = countries.find((c) => c.isoCode === isoCode);
    setSelectedCountry(isoCode);
    setCurrency(country ? country.currency : "");
    setPhoneCode(country ? country.phoneCode : "");
    setStates(State.getStatesOfCountry(isoCode));
    setCities([]);
  };

  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    setSelectedState(stateCode);
    setCities(City.getCitiesOfState(selectedCountry, stateCode));
  };

  return (
    <div>
      <h2>Select Country, State, City with Currency and Phone Code</h2>

      <label>Country:</label>
      <select value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name}
          </option>
        ))}
      </select>

      {selectedCountry && (
        <>
          <p>Currency: {currency}</p>
          <p>Phone Code: +{phoneCode}</p>
        </>
      )}

      {states.length > 0 && (
        <>
          <label>State:</label>
          <select value={selectedState} onChange={handleStateChange}>
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </>
      )}

      {cities.length > 0 && (
        <>
          <label>City:</label>
          <select>
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default LocationSelector;

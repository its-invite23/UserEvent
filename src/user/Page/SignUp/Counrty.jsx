import React, { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';

const LocationSelector = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [currency, setCurrency] = useState('');
    const [phoneCode, setPhoneCode] = useState('');

    useEffect(() => {
        // Fetch country data with currency and phone code
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                const formattedCountries = data.map(country => ({
                    name: country.name.common,
                    isoCode: country.cca2,
                    currency: country.currencies ? Object.keys(country.currencies)[0] : 'N/A',
                    phoneCode: country.idd.root ? country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : '') : 'N/A'
                }));
                setCountries(formattedCountries);
            })
            .catch(error => console.error("Error fetching countries:", error));
    }, []);

    const handleCountryChange = (e) => {
        const isoCode = e.target.value;
        const country = countries.find(c => c.isoCode === isoCode);
        setSelectedCountry(isoCode);
        setCurrency(country ? country.currency : '');
        setPhoneCode(country ? country.phoneCode : '');
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
                {countries.map(country => (
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
                        {states.map(state => (
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
                        {cities.map(city => (
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

import React, { useEffect, useState } from "react";
import searchIcon from "../images/home/search.png";
import "../helper/helper.css";
import { useNavigate } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import { toast, ToastContainer } from "react-toastify";
const SearchProperty = ({ onSearch, placeHolderTitle }) => {
const navigate = useNavigate();
const [searchValue, setSearchValue] = useState("");

  const SearchProperty = () => {
    navigate(`/properties?search=${searchValue}&property_type=sale`);
  };
  useEffect(() => {
    const initAutocomplete = () => {
      const input = document.getElementById("address-input");
      const options = {
        types: ["address"],
        componentRestrictions: { country: "US" },
      };
      new window.google.maps.places.Autocomplete(input, options);
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBJ79HBANEvKnm6Jin3sxjD2E29tena1Ic&libraries=places`;
    script.async = true; // Set the async attribute to load the script asynchronously
    script.onload = initAutocomplete;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="search_div">
      <img src={searchIcon} className="search_icon" />
      {/* <Autocomplete
        apiKey="AIzaSyBJ79HBANEvKnm6Jin3sxjD2E29tena1Ic"
        onPlaceSelected={(place) => {
          setSearchValue(place?.formatted_address);
        }}
        placeholder={placeHolderTitle ? placeHolderTitle : "Search..."}
        className="search_input"
        options={{
          types: ["address"],
          componentRestrictions: { country: "us" },
        }}
      /> */}
      <input
        id="address-input"
        type="text"
        placeholder="start searching..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="search_input"
      />

      <button className="input_btn" onClick={SearchProperty}>
        Search
      </button>
      {/* <button
        className="input_btn"
        onClick={() => {
         
            toast.warning("Please select value from list");
          
        }}
      >
        Search
      </button> */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default SearchProperty;

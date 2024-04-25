import React from "react";
import { useState, useRef, useEffect } from "react";
import { Range } from "react-range";
import Select from "react-select";
import SvgIcon from "./SvgIcon";
import close from "../images/auth/close.png";
import { useLocation, useNavigate } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import { BASE_URL } from "../route/BaseUrl";
import WebsiteLoader from "./WebsiteLoader";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const PropertySearchFilter = ({ placeHolderTitle }) => {
  const filterRef = useRef(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const propertyType = searchParams.get("property_type");

  const websiteSettingData = useSelector(
    (state) => state?.websiteSetting?.data?.data[0]
  );

  //get current location

  const [address, setAddress] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBJ79HBANEvKnm6Jin3sxjD2E29tena1Ic`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch address");
        }

        const data = await response.json();
        const formattedAddress = data.results[0].formatted_address;
        setAddress(formattedAddress);
      } catch (error) {}
    });
  }, []);

  const [loading, setLoading] = useState();

  const [showFilter, setShowFilter] = useState(false);
  const [showBath, setShowBath] = useState(false);

  const [showPrice, setShowPrice] = useState(false);
  const [showHomeType, setShowHomeType] = useState(false);
  const [showSale, setShowSale] = useState(false);
  const [selectedSaleOption, setSelectedSaleOption] = useState(
    propertyType || "sale"
  );
  const [maxPriceArr, setMaxPriceArr] = useState([] ?? null);

  const handleSaleOptionChange = (event) => {
    setSelectedSaleOption(event.target.value);
  };

  const saleOptionTextMap = {
    sale: "For Sale",
    rental: "For Rent",
    // sold: "Sold",
  };

  //other option

  const [selectedOption, setSelectedOption] = useState(null);

  const bathArr = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
  ];

  const bedArr = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
  ];

  const minPriceArr = [
    { label: "0", value: "0" },
    { label: "200", value: "200" },
    { label: "400", value: "400" },
    { label: "600", value: "600" },
    { label: "800", value: "800" },
    { label: "1000", value: "1000" },
    { label: "1200", value: "1200" },
    { label: "1400", value: "1400" },
    { label: "1600", value: "1600" },
    { label: "1800", value: "1800" },
    { label: "2000", value: "2000" },
    { label: "2200", value: "2200" },
    { label: "2400", value: "2400" },
    { label: "2600", value: "2600" },
    { label: "2800", value: "2800" },
    { label: "3000", value: "3000" },
    { label: "3500", value: "3500" },
    { label: "4000", value: "4000" },
    { label: "4500", value: "4500" },
    { label: "5000", value: "5000" },
    { label: "5500", value: "5500" },
    { label: "6000", value: "6000" },
    { label: "7000", value: "7000" },
    { label: "8000", value: "8000" },
    { label: "9000", value: "9000" },
    { label: "10000", value: "10000" },
  ];

  const generateMaxPriceArr = (selectedMinValue) => {
    setMinPrice(selectedMinValue);
    const minPriceIndex = minPriceArr.findIndex(
      (item) => item.value === selectedMinValue.value
    );
    if (minPriceIndex === -1) {
      return [];
    }
    const maxPriceArr = minPriceArr.slice(minPriceIndex + 1);
    if (maxPriceArr.length > 0) {
      maxPriceArr[maxPriceArr.length - 1].label = "10000+";
    }
    setMaxPriceArr(maxPriceArr);
  };
  const saleMinPriceArr = [
    { label: "0$", value: "0" },
    { label: "50000", value: "50000" },
    { label: "100000", value: "100000" },
    { label: "150000", value: "150000" },
    { label: "200000", value: "200000" },
    { label: "250000", value: "250000" },
    { label: "300000", value: "300000" },
    { label: "350000", value: "350000" },
    { label: "400000", value: "400000" },
    { label: "450000", value: "450000" },
    { label: "500000", value: "500000" },
    { label: "550000", value: "550000" },
    { label: "600000", value: "600000" },
    { label: "650000", value: "650000" },
    { label: "700000", value: "700000" },
    { label: "750000", value: "750000" },
    { label: "800000", value: "800000" },
    { label: "850000", value: "850000" },
    { label: "900000", value: "900000" },
    { label: "950000", value: "950000" },
    { label: "1000000", value: "1000000" },
  ];

  const generateSaleMaxPriceArr = (selectedMinValue) => {
    setMinPrice(selectedMinValue);
    const minPriceIndex = saleMinPriceArr.findIndex(
      (item) => item.value === selectedMinValue.value
    );
    if (minPriceIndex === -1) {
      return [];
    }
    const maxPriceArr = saleMinPriceArr.slice(minPriceIndex + 1);
    if (maxPriceArr.length > 0) {
      maxPriceArr[maxPriceArr.length - 1].label = "1000000+";
    }
    setMaxPriceArr(maxPriceArr);
  };
  //filter mobile
  const [showMobilesale, setShowMobileSale] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  //filter Work
  const homeTypeOptions = [
    { value: "Single Family Residential", label: "Single Family Residential" },
    { value: "Country Homes/Acreage", label: "Country Homes/Acreage" },
    { value: "Lots", label: "Lots" },
    { value: "Mid/Hi-Rise Condo", label: "Mid/Hi-Rise Condo" },
    { value: "Multi-Family", label: "Multi-Family" },
    { value: "Townhouse/Condo", label: "Townhouse/Condo" },
    { value: "Twinhome", label: "Twinhome" },
  ];
  //location

  const searchValue = new URLSearchParams(location.search).get("search");

  const [searchInputValue, setSearchInputValue] = useState(searchValue);
  const [selectedBedrooms, setSelectedBedrooms] = useState(null);
  const [selectedBathrooms, setSelectedBathrooms] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedHomeTypes, setSelectedHomeTypes] = useState([] ?? null);
  const [keywords, setKeywords] = useState("");
  const [squareFeetMin, setSquareFeetMin] = useState(null);
  const [squareFeetMax, setSquareFeetMax] = useState(null);
  const [lotSizeMin, setLotSizeMin] = useState(null);
  const [lotSizeMax, setLotSizeMax] = useState(null);
  const [yearBuiltMin, setYearBuiltMin] = useState("");
  const [yearBuiltMax, setYearBuiltMax] = useState();
  const [listingDays, setListingDays] = useState(null);

  const handleHomeTypeChange = (value) => {
    if (selectedHomeTypes.includes(value)) {
      setSelectedHomeTypes(selectedHomeTypes.filter((type) => type !== value));
    } else {
      setSelectedHomeTypes([...selectedHomeTypes, value]);
    }
  };

  const isActiveFilterBed = selectedBedrooms || selectedBathrooms;
  const isActiveFilterPrice = maxPrice;
  const isActiveFilterHome = selectedHomeTypes.length > 0 ? true : false;
  const isActiveMoreFilter =
    keywords ||
    squareFeetMin ||
    squareFeetMax ||
    lotSizeMin ||
    lotSizeMax ||
    yearBuiltMin ||
    yearBuiltMax ||
    listingDays;

  const saveSearch = async () => {
    const bedroomsValue = selectedBedrooms ? selectedBedrooms.label : "";
    const bathroomsValue = selectedBathrooms ? selectedBathrooms.label : "";
    const squareFeetMinValue = squareFeetMin ? squareFeetMin.label : "";
    const squareFeetMaxValue = squareFeetMax ? squareFeetMax.label : "";
    const lotSizeMinValue = lotSizeMin ? lotSizeMin.label : "";
    const lotSizeMaxValue = lotSizeMax ? lotSizeMax.label : "";
    // const yearBuiltMinValue = yearBuiltMin ? yearBuiltMin.label : "";
    const yearBuiltMaxValue = yearBuiltMax ? yearBuiltMax.label : "";
    const listingDaysValue = listingDays ? listingDays.label : "";

    const userDetailsString = localStorage.getItem("userDetails");
    const userDetails = JSON.parse(userDetailsString)?.token;

    if (!userDetails) {
    } else {
      const savedSearchData = {
        name: searchName,
        route: `search?pageNumber=1&pageSize=10&location=${searchInputValue}&property_type=${selectedSaleOption}&baths=${bathroomsValue}&beds=${bedroomsValue}&listprice=${minPrice}:${maxPrice}&home_type=${selectedHomeTypes}&keyword=${keywords}&square_feet=${squareFeetMinValue}:${squareFeetMaxValue}&lot_size=${lotSizeMinValue}:${lotSizeMaxValue}year_built=${yearBuiltMin}:${yearBuiltMax}&daysOnMarket=${listingDaysValue}`,
      };

      const savedSearchOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userDetails}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(savedSearchData).toString(),
      };
      try {
        const response = await fetch(
          `${BASE_URL}/api/property/save-search`,
          savedSearchOptions
        );
        const result = await response.json();
        if (result.result == "failed") {
        } else {
          toast.success("Search Saved Successfully");
          setShowSearchName(false);
          setSearchInputValue("");
          setSelectedBathrooms("");
          setSelectedBedrooms("");
          setMinPrice("");
          setMaxPrice("");
          setSelectedHomeTypes("");
          setKeywords("");
          setSquareFeetMin("");
          setSquareFeetMax("");
          setLotSizeMin("");
          setLotSizeMax("");
          setYearBuiltMin("");
          setYearBuiltMax("");
          setListingDays("");
          setSearchName("");
        }
      } catch (error) {}
    }
  };

  const squareData = [
    { label: "500", value: "500" },
    { label: "750", value: "750" },
    { label: "1,000", value: "1000" },
    { label: "1,250", value: "1250" },
    { label: "1,500", value: "1500" },
    { label: "1,750", value: "1750" },
    { label: "2,000", value: "2000" },
    { label: "2,250", value: "2250" },
    { label: "2,500", value: "2500" },
    { label: "2,750", value: "2750" },
    { label: "3,000", value: "3000" },
    { label: "3,500", value: "3500" },
    { label: "4,000", value: "4000" },
    { label: "5,000", value: "5000" },
    { label: "6,000", value: "6000" },
    { label: "7,000", value: "7000" },
    { label: "7,500", value: "7500" },
  ];

  const lotSizeArr = [
    { label: "1,000 sqft", value: "1000" },
    { label: "2,000 sqft", value: "2000" },
    { label: "3,000 sqft", value: "3000" },
    { label: "4,000 sqft", value: "4000" },
    { label: "5,000 sqft", value: "5000" },
    { label: "6,000 sqft", value: "6000" },
    { label: "7,000 sqft", value: "7000" },
    { label: "8,000 sqft", value: "8000" },
    { label: "9,000 sqft", value: "9000" },
    { label: "10,000 sqft", value: "10000" },
    { label: "1 acre", value: "43560" },
    { label: "2 acre", value: "87120" },
    { label: "5 acre", value: "217800" },
    { label: "10 acre", value: "435600" },
    { label: "20 acre", value: "871200" },
    { label: "50 acre", value: "2178000" },
    { label: "100 acre", value: "4356000" },
  ];

  const listingDaysArr = [
    { label: "No Min", value: "" },
    { label: "1 day", value: "1" },
    { label: "7 days", value: "7" },
    { label: "14 days", value: "14" },
    { label: "30 days", value: "30" },
    { label: "90 days", value: "90" },
    { label: "6 months", value: "182" },
    { label: "12 months", value: "365" },
    { label: "24 months", value: "730" },
    { label: "36 months", value: "1095" },
  ];

  const navigate = useNavigate();
  const bedroomsValue = selectedBedrooms ? selectedBedrooms.label : "";
  const bathroomsValue = selectedBathrooms ? selectedBathrooms.label : "";
  const squareFeetMinValue = squareFeetMin ? squareFeetMin.label : "";
  const squareFeetMaxValue = squareFeetMax ? squareFeetMax.label : "";
  const lotSizeMinValue = lotSizeMin ? lotSizeMin.label : "";
  const lotSizeMaxValue = lotSizeMax ? lotSizeMax.label : "";
  // const yearBuiltMinValue = yearBuiltMin ? yearBuiltMin.label : ""; these are not the options
  // const yearBuiltMaxValue = yearBuiltMax ? yearBuiltMax.label : "";
  const listingDaysValue = listingDays ? listingDays.label : "";

  useEffect(() => {
    // if (bedroomsValue || bathroomsValue) {
    //   navigate(
    //     `/${
    //       websiteSettingData?.footer_home_links[1]?.home_link
    //     }?pageNumber=1&location=${
    //       searchInputValue ? searchInputValue : ""
    //     }&pageSize=10&property_type=${selectedSaleOption}&baths=${bathroomsValue}&beds=${bedroomsValue}`
    //   );
    // } else if (minPrice || maxPrice) {
    //   navigate(
    //     `/${
    //       websiteSettingData?.footer_home_links[1]?.home_link
    //     }?pageNumber=1&location=${
    //       searchInputValue ? searchInputValue : ""
    //     }&pageSize=10&property_type=rental&baths=${bathroomsValue}&beds=${bedroomsValue}&min_price=${minPrice}&max_price= ${maxPrice}`
    //   );
    // } else {
    navigate(
      `/${
        websiteSettingData?.footer_home_links[1]?.home_link
      }?pageNumber=1&location=${
        searchInputValue ? searchInputValue : ""
      }&pageSize=10&property_type=${selectedSaleOption}&baths=${
        bathroomsValue ? bathroomsValue : ""
      }&beds=${bedroomsValue ? bedroomsValue : ""}&min_price=${
        minPrice.value ? minPrice.value : ""
      }&max_price=${maxPrice.value ? maxPrice.value : ""}&home_type=${
        selectedHomeTypes ? selectedHomeTypes : ""
      }&keyword=${keywords ? keywords : ""}&min_size=${
        squareFeetMinValue ? squareFeetMinValue : ""
      }&max_size=${squareFeetMaxValue ? squareFeetMaxValue : ""}&min_lotsize=${
        lotSizeMinValue ? lotSizeMinValue : ""
      }&max_lotsize=${lotSizeMaxValue ? lotSizeMaxValue : ""}&min_yearBuilt=${
        yearBuiltMin ? yearBuiltMin : ""
      }&max_yearBuilt=${yearBuiltMax ? yearBuiltMax : ""}&listing_days=${
        listingDaysValue ? listingDaysValue : ""
      }
        `
    );
    //}
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        // Click occurred outside of the filter, close the filters
        setShowPrice(false);
        setShowBath(false);
        setShowSale(false);
        setShowHomeType(false);
        setShowFilter(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [
    searchInputValue,
    selectedSaleOption,
    bedroomsValue,
    bathroomsValue,
    minPrice,
    maxPrice,
    selectedHomeTypes,
    keywords,
    squareFeetMinValue,
    squareFeetMaxValue,
    lotSizeMinValue,
    lotSizeMaxValue,
    yearBuiltMin,
    yearBuiltMax,
    listingDaysValue,
  ]);
  useEffect(() => {
    if (propertyType === "sale") {
      setSelectedHomeTypes(["Single Family Residential"]);
    } else {
      setSelectedHomeTypes([]);
    }
  }, [propertyType]);

  const [showSearchName, setShowSearchName] = useState(false);
  const [searchName, setSearchName] = useState();

  return (
    <>
      {loading && (
        <section className="pre_loader">
          <div>
            <WebsiteLoader />
          </div>
        </section>
      )}
      <section
        className="property_search_section mobile_padding filter-mobile_none"
        ref={filterRef}
      >
        <div className="container-fluid desktop-filter-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="search_filter_form">
                {showSearchName && (
                  <input
                    type="text"
                    className="input_text location_text input_name_text"
                    placeholder="search name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                )}

                <Autocomplete
                  apiKey="AIzaSyBJ79HBANEvKnm6Jin3sxjD2E29tena1Ic"
                  value={searchInputValue}
                  onPlaceSelected={(place) => {
                    setSearchInputValue(place?.formatted_address);
                  }}
                  placeholder={
                    placeHolderTitle ? placeHolderTitle : "Search..."
                  }
                  className="input_text location_text"
                  options={{
                    types: ["address"],
                    componentRestrictions: { country: "us" },
                  }}
                  // onChange={(e) => {
                  //   if (e.key === "Enter") {
                  //     setSearchInputValue(e.target.value);
                  //   }
                  // }}
                  onChange={(e) => setSearchInputValue(e.target.value)}
                />
                <div>
                  <div
                    className="sale_dropdown_bath more_filter active_filter"
                    onClick={() => {
                      setShowPrice(false);
                      setShowBath(false);
                      setShowSale(true);
                      setShowHomeType(false);
                      setShowFilter(false);
                    }}
                  >
                    <p className="more_filter_para">
                      {saleOptionTextMap[selectedSaleOption]}
                    </p>
                    <SvgIcon />
                  </div>
                  {showSale && (
                    <div className="popup_filter_div sale_filter_popup ">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="radio-container">
                            <input
                              type="radio"
                              name="saleStatus"
                              id="sale"
                              value="sale"
                              checked={selectedSaleOption === "sale"}
                              onChange={handleSaleOptionChange}
                            />
                            <label htmlFor="For Sale" className="filter_lable">
                              For Sale
                            </label>
                          </div>
                          <div className="radio-container">
                            <input
                              type="radio"
                              name="saleStatus"
                              id="rental"
                              value="rental"
                              checked={selectedSaleOption === "rental"}
                              onChange={handleSaleOptionChange}
                            />
                            <label htmlFor="For Rent" className="filter_lable">
                              Fore Rent
                            </label>
                          </div>
                          {/* <div className="radio-container">
                            <input
                              type="radio"
                              name="saleStatus"
                              id="sold"
                              value="sold"
                              checked={selectedSaleOption === "sold"}
                              onChange={handleSaleOptionChange}
                            />
                            <label htmlFor="Sold" className="filter_lable">
                              Sold
                            </label>
                          </div> */}

                          <button
                            className="carousel_btn filter_btn filter_width"
                            onClick={() => {
                              setShowSale(false);
                            }}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <div
                    className={`sale_dropdown_bath more_filter ${
                      isActiveFilterBed ? "active_filter_bed" : ""
                    }`}
                    onClick={() => {
                      setShowPrice(false);
                      setShowBath(true);
                      setShowSale(false);
                      setShowHomeType(false);
                      setShowFilter(false);
                    }}
                  >
                    <p className="more_filter_para">
                      {selectedBedrooms ? `(${selectedBedrooms.label})` : ""}{" "}
                      Beds &{" "}
                      {selectedBathrooms ? `(${selectedBathrooms.label})` : ""}{" "}
                      Bath
                    </p>
                    <SvgIcon />
                  </div>
                  {showBath && (
                    <div className="popup_filter_div_bed bath_filter_popup">
                      <div className="row">
                        <div className="col-lg-6 martop">
                          <h3 className="fiter_popup_heading">Bedrooms</h3>
                          <Select
                            placeholder="No Min"
                            value={selectedBedrooms}
                            options={bedArr}
                            className="sale_dropdown_price filter_dropdownwidth"
                            onChange={(selectedOption) =>
                              setSelectedBedrooms(selectedOption)
                            }
                          />
                        </div>
                        <div className="col-lg-6 martop">
                          <h3 className="fiter_popup_heading">Bathrooms</h3>
                          <Select
                            placeholder="No Min"
                            value={selectedBathrooms}
                            options={bathArr}
                            className="sale_dropdown_price filter_dropdownwidth"
                            onChange={(selectedOption) =>
                              setSelectedBathrooms(selectedOption)
                            }
                          />
                        </div>
                        <div className="col-lg-12 mt-3">
                          <button
                            className="carousel_btn filter_btn filter_width"
                            onClick={() => {
                              setShowBath(!showBath);
                            }}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <div
                    className={`sale_dropdown_bath more_filter ${
                      isActiveFilterPrice ? "active_filter_price" : ""
                    }`}
                    onClick={() => {
                      setShowPrice(true);
                      setShowBath(false);
                      setShowSale(false);
                      setShowHomeType(false);
                      setShowFilter(false);
                    }}
                  >
                    <p className="more_filter_para">
                      Price
                      {minPrice && maxPrice
                        ? `($${minPrice.value} - $${maxPrice.value})`
                        : ""}
                    </p>
                    <SvgIcon />
                  </div>
                  {showPrice && (
                    <div className="popup_filter_div price_filter_popup">
                      <div className="row">
                        <div className="col-lg-6">
                          <h3 className="fiter_popup_heading">Minimum Price</h3>
                          <Select
                            placeholder="No Min"
                            value={minPrice}
                            options={
                              propertyType == "rental"
                                ? minPriceArr
                                : saleMinPriceArr
                            }
                            className="sale_dropdown_price filter_dropdownwidth"
                            onChange={(selectedOption) => {
                              if (propertyType == "rental") {
                                generateMaxPriceArr(selectedOption);
                              } else {
                                generateSaleMaxPriceArr(selectedOption);
                              }
                            }}
                          />
                        </div>
                        <div className="col-lg-6">
                          <h3 className="fiter_popup_heading">Maximum Price</h3>
                          <Select
                            placeholder="No Min"
                            value={maxPrice}
                            options={maxPriceArr}
                            className="sale_dropdown_price filter_dropdownwidth"
                            onChange={(selectedOption) =>
                              setMaxPrice(selectedOption)
                            }
                          />
                        </div>
                        <div className="col-lg-12 mt-3">
                          <button
                            className="carousel_btn filter_btn filter_width"
                            onClick={() => {
                              setShowPrice(false);
                            }}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <div
                    className={`sale_dropdown_bath more_filter ${
                      isActiveFilterHome ? "active_filter_bed" : ""
                    }`}
                    onClick={() => {
                      setShowPrice(false);
                      setShowBath(false);
                      setShowSale(false);
                      setShowHomeType(true);
                      setShowFilter(false);
                    }}
                  >
                    {selectedHomeTypes.length > 0
                      ? ` Home Type: (${selectedHomeTypes.length})`
                      : "Home Type"}
                    <SvgIcon />
                  </div>
                  {showHomeType && (
                    <div className="popup_filter_div price_filter_popup hometype_filter_popup">
                      <div className="row">
                        <div className="col-lg-12">
                          {homeTypeOptions.map((option, index) => {
                            return (
                              <div key={index}>
                                <input
                                  type="checkbox"
                                  className="sale_box"
                                  checked={selectedHomeTypes.includes(
                                    option.value
                                  )}
                                  onChange={() =>
                                    handleHomeTypeChange(option.value)
                                  }
                                />
                                <label className="filter_lable">
                                  {option.label}
                                </label>
                              </div>
                            );
                          })}

                          <button
                            className="carousel_btn filter_btn filter_width"
                            onClick={() => {
                              setShowHomeType(false);
                            }}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <div
                    className={`sale_dropdown_bath more_filter ${
                      isActiveMoreFilter ? "active_filter_price" : ""
                    }`}
                    onClick={() => {
                      setShowPrice(false);
                      setShowBath(false);
                      setShowSale(false);
                      setShowHomeType(false);
                      setShowFilter(true);
                    }}
                  >
                    <p className="more_filter_para">More</p>
                    <SvgIcon />
                  </div>
                  {showFilter && (
                    <div className="popup_filter_div">
                      <div className="row  ">
                        <div className="col-lg-12">
                          <h3 className="fiter_popup_heading">Keywords</h3>
                          <input
                            type="text"
                            className="filter_popup_text"
                            placeholder="MLS #, zip code"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row mt-2">
                        <h3 className="fiter_popup_heading">Square Feet</h3>
                        <div className="col-lg-6">
                          <Select
                            placeholder="No Min"
                            value={squareFeetMin}
                            options={squareData}
                            className="sale_dropdown_price filter_dropdownwidth"
                            onChange={(selectedOption) =>
                              setSquareFeetMin(selectedOption)
                            }
                          />
                        </div>
                        <div className="col-lg-6 ">
                          <Select
                            placeholder="No Max"
                            value={squareFeetMax}
                            options={squareData}
                            className="sale_dropdown_price filter_dropdownwidth"
                            onChange={(selectedOption) =>
                              setSquareFeetMax(selectedOption)
                            }
                          />
                        </div>
                      </div>
                      <div className="row mt-2">
                        <h3 className="fiter_popup_heading">Lot Size</h3>
                        <div className="col-lg-6">
                          <Select
                            placeholder="No Min"
                            value={lotSizeMin}
                            options={lotSizeArr}
                            className="sale_dropdown_price filter_dropdownwidth"
                            onChange={(selectedOption) =>
                              setLotSizeMin(selectedOption)
                            }
                          />
                        </div>
                        <div className="col-lg-6 ">
                          <Select
                            placeholder="No Max"
                            value={lotSizeMax}
                            options={lotSizeArr}
                            className="sale_dropdown_price filter_dropdownwidth"
                            onChange={(selectedOption) =>
                              setLotSizeMax(selectedOption)
                            }
                          />
                        </div>
                      </div>
                      <div className="row  mt-2">
                        <h3 className="fiter_popup_heading">Year Built</h3>
                        <div className="col-lg-6">
                          <input
                            placeholder="No Min"
                            type="text"
                            className="filter_popup_text"
                            value={yearBuiltMin}
                            onChange={(e) => setYearBuiltMin(e.target.value)}
                          />
                        </div>
                        <div className="col-lg-6 ">
                          <input
                            placeholder="No Max"
                            type="text"
                            className="filter_popup_text"
                            value={yearBuiltMax}
                            onChange={(e) => setYearBuiltMax(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row mt-2">
                        <h3 className="fiter_popup_heading">Listing Days</h3>
                        <div className="col-lg-12">
                          <Select
                            placeholder="Any"
                            value={listingDays}
                            options={listingDaysArr}
                            className="sale_dropdown_price filter_dropdownwidth"
                            onChange={(selectedOption) =>
                              setListingDays(selectedOption)
                            }
                          />
                        </div>
                      </div>
                      <button
                        className="carousel_btn filter_btn filter_width mt-3"
                        onClick={() => {
                          setShowFilter(false);
                        }}
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                <button
                  className="carousel_btn filter_btn"
                  onClick={() => {
                    if (!searchName) {
                      setShowSearchName(true);
                      toast.warning("please enter the search name");
                      setShowPrice(false);
                      setShowBath(false);
                      setShowSale(false);
                      setShowHomeType(false);
                      setShowFilter(false);
                    } else {
                      saveSearch();
                    }
                  }}
                >
                  Save Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mobile_search">
        <div className="container">
          <div className="row">
            <div className="mobile_div">
              <div
                className="sale_dropdown_bath more_filter_mobile "
                onClick={() => {
                  setShowMobileSale(true);
                }}
              >
                <p className="more_filter_para">
                  {" "}
                  {saleOptionTextMap[selectedSaleOption]}
                </p>
                <SvgIcon />
              </div>

              <div
                className="sale_dropdown_bath more_filter_mobile"
                onClick={() => {
                  setShowMobileFilter(true);
                }}
              >
                <p className="more_filter_para">Filters</p>
                <SvgIcon />
              </div>

              <button
                className="carousel_btn filter_btn filter_width"
                onClick={() => {
                  if (!searchInputValue) {
                    toast.warning("enter the location");
                  } else {
                    setShowPrice(false);
                    setShowBath(false);
                    setShowSale(false);
                    setShowHomeType(false);
                    setShowFilter(false);
                    saveSearch();
                  }
                }}
              >
                Saved
              </button>
            </div>
          </div>
        </div>
      </section>

      {showMobilesale && (
        <section className="modal_section_filter">
          <div>
            <div className="container-fluid zero-padding">
              <div className="row login_modal">
                <div className="col-lg-6 ">
                  <img
                    src={close}
                    className="close_btn filter_close"
                    onClick={() => {
                      setShowMobileSale(false);
                    }}
                  />
                  <h2 className="text-center mb-3 hr_mobile">Property Type</h2>
                  <div className="salemobile_div">
                    <div>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="saleStatus"
                          id="sale"
                          value="sale"
                          checked={selectedSaleOption === "sale"}
                          onChange={handleSaleOptionChange}
                        />
                        <label htmlFor="For Sale" className="filter_lable">
                          For Sale
                        </label>
                      </div>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="saleStatus"
                          id="rental"
                          value="rental"
                          checked={selectedSaleOption === "rental"}
                          onChange={handleSaleOptionChange}
                        />
                        <label htmlFor="For Rent" className="filter_lable">
                          Fore Rent
                        </label>
                      </div>
                      {/* <div className="radio-container">
                        <input
                          type="radio"
                          name="saleStatus"
                          id="sold"
                          value="sold"
                          checked={selectedSaleOption === "sold"}
                          onChange={handleSaleOptionChange}
                        />
                        <label htmlFor="Sold" className="filter_lable">
                          Sold
                        </label>
                      </div> */}
                    </div>
                    <div>
                      <button className="carousel_btn filter_btn filter_width">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {showMobileFilter && (
        <section className="modal_section_filter">
          <div>
            <div className="container-fluid zero-padding">
              <div className="row login_modal">
                <div className="col-lg-6 ">
                  <img
                    src={close}
                    className="close_btn filter_close"
                    onClick={() => {
                      setShowMobileFilter(false);
                    }}
                  />
                  {/* <h2 className="text-center mb-3 hr_mobile">0 Results</h2> */}

                  <div className="salemobile_div">
                    <div>
                      <div className="col-lg-12 filter_col">
                        <h3 className="mobile_keyword_filter">Keywords</h3>
                        <input
                          type="text"
                          className="filter_popup_text"
                          placeholder="MLS #, zip code"
                          value={keywords}
                          onChange={(e) => setKeywords(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-12 filter_col">
                        <h3 className="mobile_keyword_filter">Location</h3>
                        <Autocomplete
                          apiKey="AIzaSyBJ79HBANEvKnm6Jin3sxjD2E29tena1Ic"
                          value={searchInputValue}
                          onPlaceSelected={(place) => {
                            setSearchInputValue(place?.formatted_address);
                          }}
                          placeholder={
                            placeHolderTitle ? placeHolderTitle : "Search..."
                          }
                          className="filter_popup_text"
                          options={{
                            types: ["(cities)"],
                            componentRestrictions: { country: "us" },
                          }}
                          onChange={(e) => setSearchInputValue(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6 martop">
                        <h3 className="mobile_keyword_filter">Bedrooms</h3>
                        <Select
                          placeholder="No Min"
                          value={selectedBedrooms}
                          options={bedArr}
                          className="sale_dropdown_price filter_dropdownwidth"
                          onChange={(selectedOption) =>
                            setSelectedBedrooms(selectedOption)
                          }
                        />
                      </div>
                      <div className="col-lg-6 martop">
                        <h3 className="mobile_keyword_filter">Bathrooms</h3>

                        <Select
                          placeholder="No Min"
                          value={selectedBathrooms}
                          options={bathArr}
                          className="sale_dropdown_price filter_dropdownwidth"
                          onChange={(selectedOption) =>
                            setSelectedBathrooms(selectedOption)
                          }
                        />
                      </div>
                      <div className="col-lg-6 martop">
                        <h3 className="mobile_keyword_filter">Min Price</h3>

                        <input
                          placeholder="No Min"
                          type="number"
                          className="filter_popup_text"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6 martop">
                        <h3 className="mobile_keyword_filter">Max Price</h3>

                        <input
                          placeholder="No Max"
                          type="number"
                          className="filter_popup_text"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6 martop">
                        <h3 className="mobile_keyword_filter">Home Type</h3>

                        {homeTypeOptions.map((option, index) => {
                          return (
                            <div key={index}>
                              <input
                                type="checkbox"
                                className="sale_box"
                                checked={selectedHomeTypes.includes(
                                  option.value
                                )}
                                onChange={() =>
                                  handleHomeTypeChange(option.value)
                                }
                              />
                              <label className="filter_lable">
                                {option.label}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                      <div className="col-lg-6 martop">
                        <h3 className="mobile_keyword_filter">Square Feet</h3>
                        <Select
                          placeholder="No Min"
                          value={squareFeetMin}
                          options={squareData}
                          className="sale_dropdown_price filter_dropdownwidth"
                          onChange={(selectedOption) =>
                            setSquareFeetMin(selectedOption)
                          }
                        />

                        <Select
                          placeholder="No Max"
                          value={squareFeetMax}
                          options={squareData}
                          className="sale_dropdown_price filter_dropdownwidth"
                          onChange={(selectedOption) =>
                            setSquareFeetMax(selectedOption)
                          }
                        />
                      </div>
                      <div className="col-lg-6 martop">
                        <h3 className="mobile_keyword_filter">LotSize</h3>
                        <Select
                          placeholder="No Min"
                          value={lotSizeMin}
                          options={lotSizeArr}
                          className="sale_dropdown_price filter_dropdownwidth"
                          onChange={(selectedOption) =>
                            setLotSizeMin(selectedOption)
                          }
                        />
                        <Select
                          placeholder="No Max"
                          value={lotSizeMax}
                          options={lotSizeArr}
                          className="sale_dropdown_price filter_dropdownwidth"
                          onChange={(selectedOption) =>
                            setLotSizeMax(selectedOption)
                          }
                        />
                      </div>
                      <div className="col-lg-6 martop">
                        <h3 className="mobile_keyword_filter">Year Built</h3>

                        <input
                          placeholder="No Min"
                          type="text"
                          className="filter_popup_text"
                          value={yearBuiltMin}
                          onChange={(e) => setYearBuiltMin(e.target.value)}
                        />
                        <input
                          placeholder="No Max"
                          type="text"
                          className="filter_popup_text mt-2"
                          value={yearBuiltMax}
                          onChange={(e) => setYearBuiltMax(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6 martop">
                        <h3 className="mobile_keyword_filter">Listing Days</h3>
                        <Select
                          placeholder="Any"
                          value={listingDays}
                          options={listingDaysArr}
                          className="sale_dropdown_price filter_dropdownwidth"
                          onChange={(selectedOption) =>
                            setListingDays(selectedOption)
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        className="carousel_btn filter_btn filter_width"
                        onClick={() => {
                          setShowMobileFilter(false);
                        }}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <ToastContainer
        position="bottom-right"
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
    </>
  );
};

export default PropertySearchFilter;

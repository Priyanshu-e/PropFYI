import React, { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  MarkerClusterer,
  AdvancedMarker,
} from "@react-google-maps/api";

import "../buy/buy.css";
import PropertySearchFilter from "../../helper/PropertySearchFilter";
import mapImage from "../../images/buy/map.png";
import greenFlag from "../../images/buy/green.png";
import blueFlag from "../../images/buy/blue.png";

import propertyOneImage from "../../images/home/property-one.png";
import bed from "../../images/home/bed.png";
import bath from "../../images/home/bath.png";
import square from "../../images/home/square.png";
import { BiSolidLike } from "react-icons/bi";
import PropertyModal from "../propertymodal/PropertyModal";
import ContactModal from "../propertymodal/ContactModal";
import mapMarker from "../../images/buy/map-marker.svg";
import mapMarkerRent from "../../images/buy/map-marker-rent.svg";
import { BASE_URL } from "../../route/BaseUrl";
import WebsiteLoader from "../../helper/WebsiteLoader";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import errorImage from "../../images/otherpages/404.svg";
import { FaRegBookmark } from "react-icons/fa6";

import BedImage from "../../helper/BedImage";
import BathImage from "../../helper/BathImage";
import SizeImage from "../../helper/SizeImage";
import Login from "../auth/Login";
import Signup from "../auth/Signup";

const Properties = ({ pageType }) => {
  const [clickButton, setClickButton] = useState();

  let customPropertyPrice = 10000;
  const [userIn, setUserIn] = useState();

  const getCurrentUser = () => {
    const userDetailsString = localStorage.getItem("userDetails");
    setUserIn(JSON.parse(userDetailsString)?.token);
  };

  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // Extracting values from the slug

  const locationValue = searchParams.get("location");

  const propertyType = searchParams.get("property_type");

  const baths = searchParams.get("baths");
  const beds = searchParams.get("beds");

  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");

  const homeType = searchParams.get("home_type");

  const listing_days = searchParams.get("listing_days");

  const min_lotsize = searchParams.get("min_lotsize");
  const max_lotsize = searchParams.get("max_lotsize");

  const min_yearBuilt = searchParams.get("min_yearBuilt");
  const max_yearBuilt = searchParams.get("max_yearBuilt");

  const min_size = searchParams.get("min_size");
  const max_size = searchParams.get("max_size");

  const keyword = searchParams.get("keyword");

  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBJ79HBANEvKnm6Jin3sxjD2E29tena1Ic",
  });

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  //get property data
  const [centerLongitude, setCenterLongitude] = useState();
  const [centerLatitude, setCenterLatitude] = useState();
  const [propertyData, setPropertyData] = useState();

  const [propertyTotalData, setPropertyTotalData] = useState("");

  // console.log(propertyTotalData, " propertytotaldata");
  const [secondLoader, setSecondLoader] = useState(false);
  const getPropertyData = async () => {
    try {
      // setLoading(true);
      setSecondLoader(true);
      const requestAvtarOptions = {
        method: "GET",
      };

      let url = `${BASE_URL}/api/property/search?pageNumber=1&box=33.52760363659399,-93.24710436165333,27.592276400578733,-97.41302154958248&location=${locationValue}&pageSize=500&property_type=${propertyType}`;

      // console.log(url);
      // return false;
      if (baths !== null && baths !== undefined) {
        url += `&baths=${baths}`;
      }

      if (beds !== null && beds !== undefined) {
        url += `&beds=${beds}`;
      }

      if (minPrice !== null && minPrice !== undefined) {
        url += `&min_price=${minPrice}`;
      }

      if (maxPrice !== null && maxPrice !== undefined) {
        url += `&max_price=${maxPrice}`;
      }

      if (homeType !== null && homeType !== undefined) {
        url += `&home_type=${homeType}`;
      }

      if (listing_days !== null && listing_days !== undefined) {
        url += `&daysOnMarket=${listing_days}`;
      }

      if (min_lotsize !== null && min_lotsize !== undefined) {
        url += `&min_lotsize=${min_lotsize}`;
      }

      if (max_lotsize !== null && max_lotsize !== undefined) {
        url += `&max_lotsize=${max_lotsize}`;
      }

      if (min_yearBuilt !== null && min_yearBuilt !== undefined) {
        url += `&min_yearBuilt=${min_yearBuilt}`;
      }

      if (max_yearBuilt !== null && max_yearBuilt !== undefined) {
        url += `&max_yearBuilt=${max_yearBuilt}`;
      }

      if (min_size !== null && min_size !== undefined) {
        url += `&min_size=${min_size}`;
      }

      if (max_size !== null && max_size !== undefined) {
        url += `&max_size=${max_size}`;
      }

      if (keyword !== null && keyword !== undefined) {
        url += `&keyword=${keyword}`;
      }

      const response = await fetch(url, requestAvtarOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPropertyTotalData(data?.result?.total);

      setPropertyData(data.result.listings);
      setCenterLongitude(data.result.listings[0].coordinates.longitude);
      setCenterLatitude(data.result.listings[0].coordinates.latitude);
    } catch (error) {
    } finally {
      setSecondLoader(false);
    }
  };

  const center = {
    lat: centerLatitude,
    lng: centerLongitude,
  };
  useEffect(() => {
    getCurrentUser();
    getPropertyData();
  }, [
    locationValue,
    propertyType,
    baths,
    beds,
    minPrice,
    maxPrice,
    homeType,
    listing_days,
    min_lotsize,
    max_lotsize,
    min_yearBuilt,
    max_yearBuilt,
    min_size,
    max_size,
    keyword,
  ]);

  //show map onclick
  const [showMap, setShowMap] = useState(false);
  const [liveLatitude, setLiveLatitude] = useState();
  const [liveLogintude, setLiveliveLogintude] = useState();
  const liveCenter = {
    lat: liveLatitude,
    lng: liveLogintude,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      setLiveLatitude(position.coords.latitude);
      setLiveliveLogintude(position.coords.longitude);
    });
  }, []);

  function formatPrice(price) {
    if (price >= 1000) {
      return price / 1000 + "k";
    } else {
      return price.toString();
    }
  }

  const [showModal, setShowModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const openSignupModal = () => {
    setShowSignupModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  // get liked data
  const [likedData, setLikedData] = useState();
  const getLikedData = async () => {
    const userDetailsString = localStorage.getItem("userDetails");
    const userDetails = JSON.parse(userDetailsString)?.token;
    try {
      const requestAvtarOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userDetails}`,
          "Access-Control-Allow-Credentials": true,
        },
      };
      const response = await fetch(
        `${BASE_URL}/api/property/user-liked-properties`,
        requestAvtarOptions
      );
      const data = await response.json();
      setLikedData(data.data);
    } catch (error) {}
  };

  //saved like
  const saveLikes = async (id) => {
    const userDetailsString = localStorage.getItem("userDetails");
    const userDetails = JSON.parse(userDetailsString)?.token;

    if (!userDetails) {
      setShowModal(true);
    } else {
      const savedPropertiesData = {
        mls_id: id,
      };

      // console.log(savedPropertiesData);

      const savedPropertiesOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userDetails}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(savedPropertiesData).toString(),
      };
      try {
        // setLoading(true);
        const response = await fetch(
          `${BASE_URL}/api/property/like-property`,
          savedPropertiesOptions
        );
        const result = await response.json();
        if (result.result == "failed") {
          // console.log(result.message);
        } else {
          // console.log(result.message);
          getLikedData();
        }
      } catch (error) {
        // console.log("error");
      }
    }
  };

  const removeLikes = async (id) => {
    const userDetailsString = localStorage.getItem("userDetails");
    const userDetails = JSON.parse(userDetailsString)?.token;

    if (!userDetails) {
      setShowModal(true);
    } else {
      const savedPropertiesData = {
        mls_id: id,
      };

      // console.log(savedPropertiesData);

      const savedPropertiesOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userDetails}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(savedPropertiesData).toString(),
      };
      try {
        const response = await fetch(
          `${BASE_URL}/api/property/remove-like-property`,
          savedPropertiesOptions
        );
        const result = await response.json();
        if (result.result == "failed") {
          // console.log(result.message);
        } else {
          // console.log(result.message);
        }
      } catch (error) {
        // console.log("error");
      }
    }
    getLikedData();
  };

  useEffect(() => {
    getLikedData();
  }, []);

  useEffect(() => {
    if (propertyTotalData === 1) {
      if (propertyData && propertyData.length > 0) {
        setShowPropertyModal(true);
        navigate(`/properties/${propertyData[0].id}`);
        setSelectedPropertyId(propertyData[0]?.id);
      }
    }
  }, [propertyTotalData]);
  const [map, setMap] = useState(null);
  console.log(map);
  const onLoad = (map) => {
    setMap(map);
    map.addListener("zoom_changed", () => {
      console.log("Zoom Level:", map.getZoom());
    });
  };
  return (
    <>
      <PropertySearchFilter />
      <section>
        {loading && (
          <section className="pre_loader">
            <div>
              <WebsiteLoader />
            </div>
          </section>
        )}
        <div className="container-fluid">
          <div className="row">
            {propertyTotalData == 0 ||
            typeof propertyTotalData === "undefined" ? (
              <div
                className={`col-lg-6 px-0 filter-mobile-none ${
                  secondLoader ? "loader_opacity_two" : ""
                }`}
              >
                {isLoaded ? (
                  <>
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={liveCenter}
                      zoom={15}
                    >
                      <Marker
                        position={{
                          lat: liveLatitude,
                          lng: liveLogintude,
                        }}
                        icon={{
                          url:
                            propertyType == "rental"
                              ? mapMarkerRent
                              : mapMarker,
                          scaledSize: new window.google.maps.Size(40, 40),
                          origin: new window.google.maps.Point(0, 0),
                          anchor: new window.google.maps.Point(20, 40),
                        }}
                        className="marker_property shadow_map"
                      ></Marker>
                    </GoogleMap>
                  </>
                ) : (
                  <img src={mapImage} />
                )}
              </div>
            ) : (
              <div
                className={`col-lg-6 px-0 filter-mobile-none ${
                  secondLoader ? "loader_opacity" : ""
                }`}
              >
                {isLoaded ? (
                  <>
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={center}
                      zoom={7}
                      onLoad={onLoad}
                    >
                      <MarkerClusterer
                        options={{
                          imagePath:
                            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
                          styles: [
                            {
                              url:
                                propertyType === "rental"
                                  ? blueFlag
                                  : greenFlag,
                              height: 50,
                              width: 50,
                            },
                          ],
                        }}
                      >
                        {(clusterer) =>
                          propertyData?.map((data) => {
                            return (
                              <Marker
                                key={data?.id}
                                position={{
                                  lat: data.coordinates.latitude,
                                  lng: data.coordinates.longitude,
                                }}
                                clusterer={clusterer}
                                onClick={() => {
                                  setSelectedProperty(data);
                                }}
                                icon={{
                                  url:
                                    propertyType === "rental"
                                      ? mapMarkerRent
                                      : mapMarker,
                                  scaledSize: new window.google.maps.Size(
                                    40,
                                    40
                                  ),
                                  origin: new window.google.maps.Point(0, 0),
                                  anchor: new window.google.maps.Point(20, 40),
                                }}
                                className="marker_property"
                              >
                                {selectedProperty &&
                                  selectedProperty?.id === data?.id && (
                                    <InfoWindow
                                      position={{
                                        lat: data?.Latitude,
                                        lng: data?.Longitude,
                                      }}
                                      onCloseClick={() =>
                                        setSelectedProperty(null)
                                      }
                                      className="map_pointer_div"
                                    >
                                      <div>
                                        {selectedProperty.images ? (
                                          <img
                                            src={selectedProperty.images[0]}
                                            className="map_pointer_image"
                                            onClick={() => {
                                              setShowPropertyModal(true);
                                              setSelectedPropertyId(
                                                selectedProperty?.id
                                              );
                                              navigate(
                                                `/properties/${data.id}`
                                              );
                                            }}
                                          />
                                        ) : (
                                          <img
                                            src={propertyOneImage}
                                            className="map_pointer_image"
                                            onClick={() => {
                                              setShowPropertyModal(true);
                                              setSelectedPropertyId(
                                                selectedProperty?.id
                                              );
                                              navigate(
                                                `/properties/${data.id}`
                                              );
                                            }}
                                          />
                                        )}
                                        <div className="aminities_div_two">
                                          <p className="aminities_para">
                                            <div className="aminities_img bed_svg">
                                              <BedImage />{" "}
                                              {selectedProperty?.beds ? (
                                                <>
                                                  {selectedProperty?.beds} Bed
                                                </>
                                              ) : (
                                                "-- Beds"
                                              )}
                                            </div>
                                          </p>
                                          <p className="aminities_para">
                                            <div className="aminities_img">
                                              <BathImage />{" "}
                                              {selectedProperty?.baths
                                                ?.total ? (
                                                <>
                                                  {
                                                    selectedProperty?.baths
                                                      ?.total
                                                  }{" "}
                                                  Baths
                                                </>
                                              ) : (
                                                "-- Baths"
                                              )}
                                            </div>
                                          </p>
                                          <p className="aminities_para">
                                            <div
                                              className="aminities_img"
                                              style={{
                                                height: "10px;!important",
                                              }}
                                            >
                                              <SizeImage />{" "}
                                              {/* {selectedProperty?.lotSize?.sqft ? (
                                          <>
                                            {selectedProperty?.lotSize?.sqft} Sq
                                            Ft
                                          </>
                                        ) : (
                                          "-- Sq Ft"
                                        )} */}
                                              {selectedProperty?.propertyType ===
                                                "Rental" ||
                                              selectedProperty?.propertyType ===
                                                "Single Family Residential" ||
                                              selectedProperty?.propertyType ===
                                                "Multi-Family" ||
                                              selectedProperty?.propertyType ===
                                                "Mid/Hi-Rise Condo" ||
                                              selectedProperty?.propertyType ===
                                                "Townhouse/Condo" ||
                                              selectedProperty?.propertyType ===
                                                "Twinhome" ? (
                                                <>
                                                  {selectedProperty?.size > 0
                                                    ? selectedProperty?.size.toLocaleString()
                                                    : "---"}{" "}
                                                  Sq Ft
                                                </>
                                              ) : null}
                                              {selectedProperty?.propertyType ===
                                                "Country Homes/Acreage" ||
                                              selectedProperty?.propertyType ===
                                                "Lots" ? (
                                                <>
                                                  {selectedProperty?.lotSize
                                                    ?.acres > 0
                                                    ? selectedProperty?.lotSize
                                                        .acres
                                                    : "---"}{" "}
                                                  acres
                                                </>
                                              ) : null}
                                            </div>
                                          </p>
                                        </div>
                                        <h2 className="map_pointer_heading onmarker_hover">
                                          <MdOutlineLocationOn className="location_icon_hover" />
                                          {/* {selectedProperty?.address
                                        ?.deliveryLine &&
                                        `${selectedProperty?.address?.deliveryLine} `} */}
                                          {selectedProperty?.address
                                            ?.deliveryLine &&
                                            `${selectedProperty.address.deliveryLine} `}
                                          {selectedProperty?.address?.city &&
                                            `${selectedProperty.address.city} `}
                                          {selectedProperty?.address?.state &&
                                            `${selectedProperty.address.state} `}
                                          {selectedProperty?.address?.zip &&
                                            `${selectedProperty.address.zip}`}
                                        </h2>
                                        <div className="price_div_buy">
                                          <h3 className="property_price map_price">
                                            $
                                            {selectedProperty?.listPrice >
                                            customPropertyPrice
                                              ? `${(
                                                  selectedProperty?.listPrice /
                                                  1000
                                                ).toFixed(0)}K`
                                              : selectedProperty?.listPrice}
                                          </h3>
                                          <button
                                            className="carousel_btn map_btn"
                                            onClick={() => {
                                              setShowContactModal(true);
                                              setClickButton("contact");
                                            }}
                                          >
                                            Contact Us
                                          </button>
                                        </div>
                                      </div>
                                    </InfoWindow>
                                  )}
                              </Marker>
                            );
                          })
                        }
                      </MarkerClusterer>
                    </GoogleMap>
                  </>
                ) : (
                  <img src={mapImage} />
                )}
              </div>
            )}

            {propertyTotalData == 0 ||
            typeof propertyTotalData === "undefined" ? (
              <div
                className={`col-lg-6 px-0 scroll_list ${
                  secondLoader ? "loader_opacity_two" : ""
                }`}
              >
                <div className=" blank_property_div">
                  <div className="no_property_div">
                    {/* <img src={errorImage} style={{ width: "30%" }} /> */}
                    <h1 className="no_listing_heading">Rental Listings</h1>
                    <p className="matching_p mt-3">No matching results</p>
                    <p className="matching_p">Try changing your search</p>
                    <hr className="no_listing_hr" />
                    <h1 className="no_listing_heading search_heading">
                      Search Tips
                    </h1>
                    <div className="search_div_no_property">
                      <div>
                        <FaRegBookmark className="save_no_property_icon" />
                      </div>
                      <div>
                        <p className="heading_p">
                          Decrease the number of filters
                        </p>
                        <p className="paragraphp_p">
                          Adjust your criteria to be less restrictive, or remove
                          very specific ones.
                        </p>
                      </div>
                    </div>
                    <div className="search_div_no_property">
                      <div>
                        <FaRegBookmark className="save_no_property_icon" />
                      </div>
                      <div>
                        <p className="heading_p">
                          Increase the scope of your search
                        </p>
                        <p className="paragraphp_p">
                          Search in a wider area (e.g., ZIP code to city), or
                          move or zoom out on the map.
                        </p>
                      </div>
                    </div>
                    <div className="search_div_no_property">
                      <div>
                        <FaRegBookmark className="save_no_property_icon" />
                      </div>
                      <div>
                        <p className="heading_p">
                          Enter home features and a location, or a school name
                        </p>
                        <p className="paragraphp_p">
                          3 bedrom townhouses with fireplace in Seattle, WA
                        </p>
                      </div>
                    </div>
                    <hr className="no_listing_hr" />
                    <p className="matching_p">
                      <span
                        className="remove_filter"
                        onClick={() => {
                          alert("remove filters");
                        }}
                      >
                        Remove
                      </span>{" "}
                      this filter to get listings
                    </p>
                    <p className="paragraphp_p">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`col-lg-6 px-0  ${
                  secondLoader ? "loader_opacity" : ""
                }`}
              >
                <div className="scroll_list scroll_height">
                  {propertyData?.map((data) => {
                    return (
                      <div
                        className="listing_div -----------------"
                        onClick={() => {
                          setShowPropertyModal(true);
                          setSelectedPropertyId(data?.id);
                          navigate(`/properties/${data.id}`);
                        }}
                      >
                        <div className="row">
                          <div className="col-lg-6 px-0">
                            {data?.images ? (
                              <img
                                src={data.images[0]}
                                className="buy_listing_image"
                              />
                            ) : (
                              <img
                                src={propertyOneImage}
                                className="buy_listing_image"
                              />
                            )}

                            <div className="like_div">
                              {likedData && likedData.includes(data.id) ? (
                                <div
                                  className="like_icon_after"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeLikes(data.id);
                                  }}
                                >
                                  <BiSolidLike className="like_btn_color_after" />
                                </div>
                              ) : (
                                <div
                                  className="like_icon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    saveLikes(data.id);
                                  }}
                                >
                                  <BiSolidLike className="like_btn_color" />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-lg-6 px-0">
                            <div className="aminities_div_two">
                              <p className="aminities_para">
                                <div className="aminities_img bed_svg">
                                  <BedImage />{" "}
                                  {data?.beds ? (
                                    <>{data?.beds} Bed</>
                                  ) : (
                                    "-- Beds"
                                  )}
                                </div>
                              </p>
                              <p className="aminities_para">
                                <div className="aminities_img">
                                  <BathImage />{" "}
                                  {data?.baths?.total ? (
                                    <>{data?.baths?.total} Baths</>
                                  ) : (
                                    "-- Baths"
                                  )}
                                </div>
                              </p>
                              <p className="aminities_para">
                                <div className="aminities_img">
                                  <SizeImage />{" "}
                                  {data?.propertyType === "Rental" ||
                                  data?.propertyType ===
                                    "Single Family Residential" ||
                                  data?.propertyType === "Multi-Family" ||
                                  data?.propertyType === "Mid/Hi-Rise Condo" ||
                                  data?.propertyType === "Townhouse/Condo" ||
                                  data?.propertyType === "Twinhome" ? (
                                    <>
                                      {data?.size > 0
                                        ? data?.size.toLocaleString()
                                        : "---"}{" "}
                                      Sq Ft
                                    </>
                                  ) : null}
                                  {data?.propertyType ===
                                    "Country Homes/Acreage" ||
                                  data?.propertyType === "Lots" ? (
                                    <>
                                      {data?.lotSize?.acres > 0
                                        ? data?.lotSize.acres
                                        : "---"}{" "}
                                      acres
                                    </>
                                  ) : null}
                                </div>
                              </p>
                            </div>
                            <h3 className="property_price buy_page">
                              {`$${data?.listPrice}`.replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ","
                              )}
                            </h3>
                            <p className="property_para buy_propery_para">
                              <MdOutlineLocationOn className="location_icon" />
                              {data?.address?.deliveryLine &&
                                `${data.address.deliveryLine} `}
                              {data?.address?.city && `${data.address.city} `}
                              {data?.address?.state && `${data.address.state} `}
                              {data?.address?.zip && `${data.address.zip}`}
                            </p>
                            <div className="price_div_buy">
                              {/* <p className="property_name_buy listing_email">
                              <FaRegUser className="location_icon" />
                              {data?.listingAgent?.id}
                            </p> */}

                              <button
                                className="carousel_btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowContactModal(true);
                                  setClickButton("contact");
                                }}
                              >
                                Contact Us
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="property_copyright">
                  Copyright 2024, Houston REALTORS® Information Service, Inc.
                  The information provided is exclusively for consumers’
                  personal, non-commercial use, and may not be used for any
                  purpose other than to identify prospective properties
                  consumers may be interested in purchasing. Information is
                  deemed reliable but not guaranteed. The listing broker’s offer
                  of compensation is made only to participants of the MLS where
                  the listing is filed.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {showMap && (
        <section className="mobile_map">
          <div className="container-fluid">
            <div className="row">
              {propertyTotalData == 0 ||
              typeof propertyTotalData === "undefined" ? (
                <div className="col-lg-6 px-0 mobile_map_float ">
                  {isLoaded ? (
                    <>
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={liveCenter}
                        zoom={7}
                      >
                        <Marker
                          position={{
                            lat: liveLatitude,
                            lng: liveLogintude,
                          }}
                          icon={{
                            url:
                              propertyType == "rental"
                                ? mapMarkerRent
                                : mapMarker,
                            scaledSize: new window.google.maps.Size(40, 40),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(20, 40),
                          }}
                          className="marker_property shadow_map"
                        ></Marker>
                      </GoogleMap>
                    </>
                  ) : (
                    <img src={mapImage} />
                  )}
                </div>
              ) : (
                <div className="col-lg-6 px-0 mobile_map_float ">
                  {isLoaded ? (
                    <>
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={7}
                      >
                        <MarkerClusterer
                          options={{
                            imagePath:
                              "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
                            styles: [
                              {
                                url:
                                  propertyType === "rental"
                                    ? blueFlag
                                    : greenFlag,
                                height: 50,
                                width: 50,
                              },
                            ],
                          }}
                        >
                          {(clusterer) =>
                            propertyData?.map((data) => {
                              return (
                                <Marker
                                  key={data?.id}
                                  position={{
                                    lat: data.coordinates.latitude,
                                    lng: data.coordinates.longitude,
                                  }}
                                  clusterer={clusterer}
                                  onClick={() => {
                                    setSelectedProperty(data);
                                  }}
                                  icon={{
                                    url:
                                      propertyType === "rental"
                                        ? mapMarkerRent
                                        : mapMarker,
                                    scaledSize: new window.google.maps.Size(
                                      40,
                                      40
                                    ),
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(
                                      20,
                                      40
                                    ),
                                  }}
                                  className="marker_property"
                                >
                                  {selectedProperty &&
                                    selectedProperty?.id === data?.id && (
                                      <InfoWindow
                                        position={{
                                          lat: data?.Latitude,
                                          lng: data?.Longitude,
                                        }}
                                        onCloseClick={() =>
                                          setSelectedProperty(null)
                                        }
                                        className="map_pointer_div"
                                      >
                                        <div>
                                          {selectedProperty.images ? (
                                            <img
                                              src={selectedProperty.images[0]}
                                              className="map_pointer_image"
                                              onClick={() => {
                                                setShowPropertyModal(true);
                                                setSelectedPropertyId(
                                                  selectedProperty?.id
                                                );
                                                navigate(
                                                  `/properties/${data.id}`
                                                );
                                              }}
                                            />
                                          ) : (
                                            <img
                                              src={propertyOneImage}
                                              className="map_pointer_image"
                                              onClick={() => {
                                                setShowPropertyModal(true);
                                                setSelectedPropertyId(
                                                  selectedProperty?.id
                                                );
                                                navigate(
                                                  `/properties/${data.id}`
                                                );
                                              }}
                                            />
                                          )}
                                          <div className="aminities_div_two">
                                            <p className="aminities_para">
                                              <div className="aminities_img bed_svg">
                                                <BedImage />{" "}
                                                {selectedProperty?.beds ? (
                                                  <>
                                                    {selectedProperty?.beds} Bed
                                                  </>
                                                ) : (
                                                  "-- Beds"
                                                )}
                                              </div>
                                            </p>
                                            <p className="aminities_para">
                                              <div className="aminities_img">
                                                <BathImage />{" "}
                                                {selectedProperty?.baths
                                                  ?.total ? (
                                                  <>
                                                    {
                                                      selectedProperty?.baths
                                                        ?.total
                                                    }{" "}
                                                    Baths
                                                  </>
                                                ) : (
                                                  "-- Baths"
                                                )}
                                              </div>
                                            </p>
                                            <p className="aminities_para">
                                              <div
                                                className="aminities_img"
                                                style={{
                                                  height: "10px;!important",
                                                }}
                                              >
                                                <SizeImage />{" "}
                                                {/* {selectedProperty?.lotSize?.sqft ? (
                                          <>
                                            {selectedProperty?.lotSize?.sqft} Sq
                                            Ft
                                          </>
                                        ) : (
                                          "-- Sq Ft"
                                        )} */}
                                                {selectedProperty?.propertyType ===
                                                  "Rental" ||
                                                selectedProperty?.propertyType ===
                                                  "Single Family Residential" ||
                                                selectedProperty?.propertyType ===
                                                  "Multi-Family" ||
                                                selectedProperty?.propertyType ===
                                                  "Mid/Hi-Rise Condo" ||
                                                selectedProperty?.propertyType ===
                                                  "Townhouse/Condo" ||
                                                selectedProperty?.propertyType ===
                                                  "Twinhome" ? (
                                                  <>
                                                    {selectedProperty?.size > 0
                                                      ? selectedProperty?.size.toLocaleString()
                                                      : "---"}{" "}
                                                    Sq Ft
                                                  </>
                                                ) : null}
                                                {selectedProperty?.propertyType ===
                                                  "Country Homes/Acreage" ||
                                                selectedProperty?.propertyType ===
                                                  "Lots" ? (
                                                  <>
                                                    {selectedProperty?.lotSize
                                                      ?.acres > 0
                                                      ? selectedProperty
                                                          ?.lotSize.acres
                                                      : "---"}{" "}
                                                    acres
                                                  </>
                                                ) : null}
                                              </div>
                                            </p>
                                          </div>
                                          <h2 className="map_pointer_heading onmarker_hover">
                                            <MdOutlineLocationOn className="location_icon_hover" />
                                            {/* {selectedProperty?.address
                                        ?.deliveryLine &&
                                        `${selectedProperty?.address?.deliveryLine} `} */}
                                            {selectedProperty?.address
                                              ?.deliveryLine &&
                                              `${selectedProperty.address.deliveryLine} `}
                                            {selectedProperty?.address?.city &&
                                              `${selectedProperty.address.city} `}
                                            {selectedProperty?.address?.state &&
                                              `${selectedProperty.address.state} `}
                                            {selectedProperty?.address?.zip &&
                                              `${selectedProperty.address.zip}`}
                                          </h2>
                                          <div className="price_div_buy">
                                            <h3 className="property_price map_price">
                                              $
                                              {selectedProperty?.listPrice >
                                              customPropertyPrice
                                                ? `${(
                                                    selectedProperty?.listPrice /
                                                    1000
                                                  ).toFixed(0)}K`
                                                : selectedProperty?.listPrice}
                                            </h3>
                                            <button
                                              className="carousel_btn map_btn"
                                              onClick={() => {
                                                setShowContactModal(true);
                                                setClickButton("contact");
                                              }}
                                            >
                                              Contact Us
                                            </button>
                                          </div>
                                        </div>
                                      </InfoWindow>
                                    )}
                                </Marker>
                              );
                            })
                          }
                        </MarkerClusterer>
                      </GoogleMap>
                    </>
                  ) : (
                    <img src={mapImage} />
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      <div className="extra_map_div">
        <div className="floating_map_div">
          <button
            className="floating_map_btn"
            onClick={() => {
              setShowMap(true);
            }}
          >
            Map
          </button>
          <button
            className="floating_map_btn"
            onClick={() => {
              setShowMap(false);
            }}
          >
            Listing
          </button>
        </div>
      </div>
      {showModal && (
        <Login closeModal={closeModal} openSignupModal={openSignupModal} />
      )}
      {showSignupModal && (
        <Signup closeModal={() => setShowSignupModal(false)} />
      )}

      {showPropertyModal && (
        <PropertyModal
          propertyId={selectedPropertyId}
          closeProperyModal={() => {
            setShowPropertyModal(false);
            setSelectedPropertyId(null);
          }}
          pageType="properties"
        />
      )}
      {showContactModal && (
        <ContactModal
          pointButton={clickButton}
          closeContactModal={() => setShowContactModal(false)}
        />
      )}
    </>
  );
};

export default Properties;

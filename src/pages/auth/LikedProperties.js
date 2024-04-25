import React, { useEffect, useState } from "react";

import { BiSolidLike } from "react-icons/bi";

import BedImage from "../../helper/BedImage";
import BathImage from "../../helper/BathImage";
import SizeImage from "../../helper/SizeImage";
import { BASE_URL } from "../../route/BaseUrl";
import WebsiteLoader from "../../helper/WebsiteLoader";
import PropertyModal from "../propertymodal/PropertyModal";
import ContactModal from "../propertymodal/ContactModal";
import { MdOutlineLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const LikedProperties = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  const [propertyData, setPropertyData] = useState();
  const [totalData, setTotalData] = useState();
  const getLikedPropertiesData = async () => {
    const userDetailsString = localStorage.getItem("userDetails");
    const userDetails = JSON.parse(userDetailsString).token;
    try {
      setLoading(true);
      const requestSavedOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userDetails}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          type: "likes",
        }),
      };

      const response = await fetch(
        `${BASE_URL}/api/property/record-listing`,
        requestSavedOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.json();
        setTotalData(data?.result?.total);
        setPropertyData(data?.result?.listings);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const [clickButton, setClickButton] = useState();

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
  console.log(likedData, "likedData");
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
    } catch (error) {
      console.error(error);
    }
  };

  const saveLikes = async (id) => {
    const userDetailsString = localStorage.getItem("userDetails");
    const userDetails = JSON.parse(userDetailsString)?.token;

    if (!userDetails) {
      setShowModal(true);
    } else {
      const savedPropertiesData = {
        mls_id: id,
      };

      console.log(savedPropertiesData);

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
          console.log(result.message);
        } else {
          console.log(result.message);
          getLikedData();
        }
      } catch (error) {
        console.log("error");
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

      console.log(savedPropertiesData);

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
          console.log(result.message);
        } else {
          console.log(result.message);
          getLikedPropertiesData();
        }
      } catch (error) {
        console.log("error");
      }
    }
    getLikedData();
  };
  useEffect(() => {
    getLikedPropertiesData();
  }, []);
  return (
    <>
      <section>
        {loading && (
          <section className="pre_loader">
            <div>
              <WebsiteLoader />
            </div>
          </section>
        )}

        {totalData == 0 ? (
          <>
            <p className="dont_like_message">You didn't like any property !!</p>
          </>
        ) : (
          <div className="row">
            {propertyData?.map((item) => {
              return (
                <div className="col-lg-4 saved_col_properties">
                  <div
                    className="hot_caraousel"
                    onClick={() => {
                      setShowPropertyModal(true);
                      setSelectedPropertyId(item?.id);
                      navigate(`/properties/${item.id}`);
                    }}
                  >
                    <img
                      src={item?.images[0]}
                      className="saved_properties_image"
                    />
                    <div className="like_div">
                      <div
                        className="like_icon_after"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeLikes(item.id);
                        }}
                      >
                        <BiSolidLike className="like_btn_color_after" />
                      </div>
                    </div>

                    <div className="aminities_div">
                      <p className="aminities_para">
                        <div className="aminities_img bed_svg">
                          <BedImage />{" "}
                          {item?.beds ? <>{item?.beds} Bed</> : "-- Beds"}
                        </div>
                      </p>
                      <p className="aminities_para">
                        <div className="aminities_img">
                          <BathImage />{" "}
                          {item?.baths?.total ? (
                            <>{item?.baths?.total} Baths</>
                          ) : (
                            "-- Baths"
                          )}
                        </div>
                      </p>
                      <p className="aminities_para">
                        <div className="aminities_img">
                          <SizeImage />{" "}
                          {item?.propertyType === "Rental" ||
                          item?.propertyType === "Single Family Residential" ||
                          item?.propertyType === "Multi-Family" ||
                          item?.propertyType === "Mid/Hi-Rise Condo" ||
                          item?.propertyType === "Townhouse/Condo" ||
                          item?.propertyType === "Twinhome" ? (
                            <>
                              {item?.size > 0
                                ? item?.size.toLocaleString()
                                : "---"}{" "}
                              Sq Ft
                            </>
                          ) : null}
                          {item?.propertyType === "Country Homes/Acreage" ||
                          item?.propertyType === "Lots" ? (
                            <>
                              {item?.lotSize?.acres > 0
                                ? item?.lotSize.acres
                                : "---"}{" "}
                              acres
                            </>
                          ) : null}
                        </div>
                      </p>
                    </div>
                    <p className="property_para buy_propery_para">
                      <MdOutlineLocationOn className="location_icon" />
                      {item?.address?.deliveryLine &&
                        `${item.address.deliveryLine} `}
                      {item?.address?.city && `${item.address.city} `}
                      {item?.address?.state && `${item.address.state} `}
                    </p>
                    <div className="price_div mt-3">
                      <h3 className="property_price">${item?.listPrice}</h3>
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
              );
            })}
          </div>
        )}
      </section>
      {showPropertyModal && (
        <PropertyModal
          propertyId={selectedPropertyId}
          closeProperyModal={() => {
            setShowPropertyModal(false);
            setSelectedPropertyId(null);
          }}
          pageType="profile"
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

export default LikedProperties;

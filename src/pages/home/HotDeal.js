import React, { useEffect, useState } from "react";
import hotDeal from "../../images/home/hotdeal.png";
import "../home/home.css";
import propertyOneImage from "../../images/home/property-one.png";
import propertyTwoImage from "../../images/home/property-two.png";
import propertyThreeImage from "../../images/home/property-three.png";
// import bed from "../../images/home/bed.png";
// import bath from "../../images/home/bath.png";
// import square from "../../images/home/square.png";

import BedImage from "../../helper/BedImage";
import BathImage from "../../helper/BathImage";
import SizeImage from "../../helper/SizeImage";

import { MdOutlineLocationOn } from "react-icons/md";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { BiSolidLike } from "react-icons/bi";
import ContactModal from "../propertymodal/ContactModal";
import PropertyModal from "../propertymodal/PropertyModal";
import { BASE_URL } from "../../route/BaseUrl";
import { useNavigate } from "react-router-dom";
import Login from "../auth/Login";
import Signup from "../auth/Signup";

const HotDeal = () => {
  const navigate = useNavigate();
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  //get property data
  const [clickButton, setClickButton] = useState();
  const [hotData, setHotData] = useState();
  const [title, setTitle] = useState("");
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  const getPropertyData = async () => {
    try {
      const requestAvtarOptions = {
        method: "GET",
      };

      let url = `${BASE_URL}/api/property/home-slider-listing/1`;

      const response = await fetch(url, requestAvtarOptions);
      const data = await response.json();
      setHotData(data?.listings?.result?.listings);
      setTitle(data?.details?.listing_name);
    } catch (error) {}
  };
  useEffect(() => {
    getPropertyData();
  }, []);

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
  console.log(
    likedData,
    "hot deal---------------------------------------------"
  );
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
        } else {
          getLikedData();
        }
      } catch (error) {}
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
        } else {
        }
      } catch (error) {}
    }
    getLikedData();
  };
  useEffect(() => {
    getLikedData();
  }, []);

  return (
    <>
      <section
        className="banner_bg"
        style={{ backgroundImage: `url(${hotDeal})` }}
      >
        <div className="container-fluid">
          <div className="row text-center hot_deal">
            <p className="hot_para black-color">View All New Listings</p>
            <h1 className="hot_heading black-color">{title}</h1>
          </div>
        </div>
      </section>
      <section className="caraousel_section">
        <div className="container">
          <div className="row">
            <Slider {...settings}>
              {hotData?.map((data, index) => {
                return (
                  <div className="col-lg-4" key={index}>
                    <div
                      className="hot_caraousel"
                      onClick={() => {
                        setShowPropertyModal(true);
                        setSelectedPropertyId(data?.id);
                        navigate(`/properties/${data.id}`);
                      }}
                    >
                      {data?.images ? (
                        <img src={data.images[0]} className="hotdeal_img" />
                      ) : (
                        <img src={propertyOneImage} className="hotdeal_img" />
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
                      <div className="aminities_div">
                        <p className="aminities_para">
                          <div className="aminities_img bed_svg">
                            <BedImage />{" "}
                            {data?.beds ? <>{data?.beds} Bed</> : "-- Beds"}
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
                            {data?.propertyType === "Country Homes/Acreage" ||
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
                      <h6 className="property_name">
                        <MdOutlineLocationOn className="location_icon_hover" />
                        {data?.address?.deliveryLine &&
                          `${data.address.deliveryLine} `}
                        {data?.address?.city && `${data.address.city} `}
                        {data?.address?.state && `${data.address.state} `}
                        {data?.address?.zip && `${data.address.zip}`}
                      </h6>
                      <div className="price_div">
                        <h3 className="property_price">
                          {`$${data?.listPrice}`.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}
                        </h3>
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
            </Slider>
          </div>
        </div>
      </section>
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

export default HotDeal;

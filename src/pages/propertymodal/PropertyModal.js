import React, { useRef, useEffect, useState } from "react";
import location from "../../images/buy/location.png";
import { BiSolidLike } from "react-icons/bi";
import close from "../../images/auth/close.png";
import { Button } from "react-bootstrap";
import SimilarHomes from "./SimilarHomes";
import HomesForYou from "./HomesForYou";
import bed from "../../images/home/bed.png";
import bath from "../../images/home/bath.png";
import square from "../../images/home/square.png";
import Slider from "react-slick";
import ContactModal from "./ContactModal";
import { BASE_URL } from "../../route/BaseUrl";
import WebsiteLoader from "../../helper/WebsiteLoader";
import { GoogleMap, Marker } from "@react-google-maps/api";
import mapMarker from "../../images/buy/map-marker.svg";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useNavigate, useParams } from "react-router-dom";
import likeImage from "../../images/buy/like.svg";
import shareImage from "../../images/buy/share.svg";
import saveImage from "../../images/buy/save.svg";
import { CiSaveDown2 } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineLike } from "react-icons/ai";
import { CgEditBlackPoint } from "react-icons/cg";
import NeighbourHoodDetails from "./NeighbourHoodDetails";
import BedImage from "../../helper/BedImage";
import BathImage from "../../helper/BathImage";
import SizeImage from "../../helper/SizeImage";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import PreQualifiedContact from "./PreQualifiedContact";
import har from "../../images/buy/logo-blue-svg.png";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import { CiLinkedin } from "react-icons/ci";
import { CiLink } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";

const PropertyModal = ({ propertyId, closeProperyModal, pageType }) => {
  const shareUrl = `http://3.22.241.230:3001/properties/${propertyId}`;
  const title = "Propfyi";

  const [clickButton, setClickButton] = useState();
  console.log(propertyId, "property ID ");
  const { singlePropertyId } = useParams();
  console.log(
    singlePropertyId,
    "proerty id--------------------------------------"
  );
  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);
  const [singlePropertyData, setSinglePropertyData] = useState();
  console.log(singlePropertyData?.features?.Bathrooms, "singleProapertyData");

  const [showModal, setShowModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const openSignupModal = () => {
    setShowSignupModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  //get single property data
  const [loading, setLoading] = useState();
  const getSinglePropertyData = async () => {
    const userDetailsString = localStorage.getItem("userDetails");
    const userDetails = JSON.parse(userDetailsString)?.token;

    try {
      setLoading(true);
      let requestAvtarOptions;
      if (!userDetails) {
        requestAvtarOptions = {
          method: "GET",
          // headers: {
          //   Authorization: `Bearer ${userDetails}`,
          // },
        };
      } else {
        requestAvtarOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userDetails}`,
          },
        };
      }
      const response = await fetch(
        `${BASE_URL}/api/property/details/${singlePropertyId}`,
        requestAvtarOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.json();
        console.log(
          data?.propertyDetails?.result?.listings[0]?.features,
          "features"
        );

        setIsPropertySaved(data?.mls_saved_records);
        setSinglePropertyData(data?.propertyDetails?.result?.listings[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  //for map
  const containerStyle = {
    width: "100%",
    height: "50vh",
  };
  const center = {
    lat: singlePropertyData?.coordinates?.latitude,
    lng: singlePropertyData?.coordinates?.longitude,
  };

  const [images, setImages] = useState([]);
  useEffect(() => {
    if (singlePropertyData?.images) {
      const propertyImages = singlePropertyData.images?.map((imageUrl) => ({
        original: imageUrl,
        thumbnail: imageUrl,

        thumbnailHeight: "60px",
        thumbnailWidth: "250px",
      }));

      setImages(propertyImages);
    }
  }, [singlePropertyData]);
  useEffect(() => {
    getSinglePropertyData();
  }, []);

  const buttonData = [
    {
      name: "What's Special",
      targetId: "what-speacial",
    },
    {
      name: "Neighborhood Details",
      targetId: "neighborhood-details",
    },
    {
      name: "Facts & Features",
      targetId: "fact-feature",
    },
    {
      name: "School Near By",
      targetId: "school-near-by",
    },
    {
      name: "Similar Property",
      targetId: "similar-property",
    },
  ];
  const handleButtonClick = (targetId) => {
    const targetDiv = document.getElementById(targetId);
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  //Save Properties
  const [isPropertySaved, setIsPropertySaved] = useState(false);
  const savedProperties = async () => {
    const userDetailsString = localStorage.getItem("userDetails");
    const userDetails = JSON.parse(userDetailsString)?.token;

    if (!userDetails) {
      // toast.warning("Please login First");
      setShowModal(true);
    } else {
      const savedPropertiesData = {
        mls_id: propertyId,
      };

      //console.log(savedPropertiesData);

      const savedPropertiesOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userDetails}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(savedPropertiesData).toString(),
      };
      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}/api/property/save-property`,
          savedPropertiesOptions
        );
        const result = await response.json();
        if (result.result == "failed") {
          console.log(result.message);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log("error");
      } finally {
        setLoading(false);
      }
      getSinglePropertyData();
    }
  };

  //Remove Properties
  const removedProperties = async () => {
    const userDetailsString = localStorage.getItem("userDetails");
    const userDetails = JSON.parse(userDetailsString)?.token;

    if (!userDetails) {
      // toast.warning("Please login first");
      setShowModal(true);
    } else {
      const savedPropertiesData = {
        mls_id: propertyId,
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
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}/api/property/remove-save-property`,
          savedPropertiesOptions
        );
        const result = await response.json();
        if (result.result == "failed") {
          console.log(result.message);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log("error");
      } finally {
        setLoading(false);
      }
      getSinglePropertyData();
    }
  };

  //saved like
  const saveLikes = async () => {
    const userDetailsString = localStorage.getItem("userDetails");
    const userDetails = JSON.parse(userDetailsString)?.token;

    if (!userDetails) {
      // toast.warning("Please login First");
      setShowModal(true);
    } else {
      const savedPropertiesData = {
        mls_id: propertyId,
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
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}/api/property/like-property`,
          savedPropertiesOptions
        );
        const result = await response.json();
        if (result.result == "failed") {
          console.log(result.message);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log("error");
      } finally {
        setLoading(false);
      }
      getSinglePropertyData();
    }
  };

  //remove like
  const removeLikes = async () => {
    const userDetailsString = localStorage.getItem("userDetails");
    const userDetails = JSON.parse(userDetailsString)?.token;

    if (!userDetails) {
      // toast.warning("Please login First");
      setShowModal(true);
    } else {
      const savedPropertiesData = {
        mls_id: propertyId,
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
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}/api/property/remove-like-property`,
          savedPropertiesOptions
        );
        const result = await response.json();
        if (result.result == "failed") {
          console.log(result.message);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log("error");
      } finally {
        setLoading(false);
      }
      getSinglePropertyData();
    }
  };

  const [showPreQualified, setShowPreQualified] = useState(false);
  const [socialShare, setSocialShare] = useState(false);
  const shareDivRef = useRef(null);
  const handleClickOutside = (event) => {
    if (socialShare && !shareDivRef.current.contains(event.target)) {
      setSocialShare(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [socialShare]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const path = document.querySelector(
        ".image-gallery-thumbnails-bottom.fullscreen .image-gallery-svg path"
      );

      path?.setAttribute("d", "M 10,10 L 20,20 M 10,20 L 20,10");
    }, 100);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <section className="modal_section">
        {loading && (
          <section className="pre_loader">
            <div>
              <WebsiteLoader />
            </div>
          </section>
        )}
        <img
          src={close}
          className="close_btn_property hide_desktop"
          onClick={() => {
            //closeProperyModal();
            navigate(`/properties`);
          }}
        />
        <div className="container-fluid property_modal zero-padding">
          <div className="row property_first_row">
            <div className="col-lg-7 ">
              <div className="property_main_div">
                <ImageGallery items={images} />
                <div className="save_properties">
                  <div></div>
                  <div className="save_sub_div">
                    <AiOutlineLike
                      onClick={() => {
                        if (isPropertySaved?.is_liked == 1) {
                          removeLikes();
                        } else {
                          saveLikes();
                        }
                      }}
                      className={
                        isPropertySaved.is_liked
                          ? "save_img_btn_save"
                          : "save_img_btn"
                      }
                    />

                    <CiSaveDown2
                      onClick={() => {
                        if (isPropertySaved?.is_saved == 1) {
                          removedProperties();
                        } else {
                          savedProperties();
                        }
                      }}
                      className={
                        isPropertySaved.is_saved
                          ? "save_img_btn_save"
                          : "save_img_btn"
                      }
                    />

                    <img
                      src={shareImage}
                      onClick={(e) => {
                        setSocialShare(true);
                        e.stopPropagation();
                      }}
                      className="share_new_btn"
                    />
                    {socialShare && (
                      <div className="share_div" ref={shareDivRef}>
                        <ul>
                          <li
                            onClick={() => {
                              toast.success("Url copied sucessfully");
                              const shareUrl = `http://3.22.241.230:3001/properties/${singlePropertyData?.id}`;
                              navigator.clipboard
                                .writeText(shareUrl)
                                .then(() => {
                                  console.log("URL copied ");
                                })
                                .catch((error) => {
                                  console.log("Failed to copy URL: ", error);
                                });
                            }}
                          >
                            <CiLink className="soical_share_icon" />
                            Copy Link
                          </li>
                        </ul>
                        <ul className="second_social_ul">
                          <TwitterShareButton url={shareUrl} quote={title}>
                            <li>
                              <CiTwitter className="soical_share_icon" />
                              Share on Twitter
                            </li>
                          </TwitterShareButton>
                          <FacebookShareButton url={shareUrl} quote={title}>
                            <li>
                              <CiFacebook className="soical_share_icon" />
                              Share on Facebook
                            </li>
                          </FacebookShareButton>
                          <LinkedinShareButton url={shareUrl} quote={title}>
                            <li>
                              {" "}
                              <CiLinkedin className="soical_share_icon" />
                              Share on Linkdln
                            </li>
                          </LinkedinShareButton>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 property_modal_close">
              <img
                src={close}
                className="close_btn_property hide_mobile"
                onClick={() => {
                  // closeProperyModal();
                  navigate(`/properties`);
                }}
              />
              {/* <h2 className="single_property_heading">
                {singlePropertyData?.id}
              </h2> */}
              <p className="single_property_price">
                {`$${singlePropertyData?.listPrice}`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                )}
              </p>
              <div className="location_div">
                <img src={location} className="location_img" />
                <p className="location_para">
                  {singlePropertyData?.address?.deliveryLine &&
                    `${singlePropertyData.address.deliveryLine} `}
                  {singlePropertyData?.address?.city &&
                    `${singlePropertyData.address.city} `}
                  {singlePropertyData?.address?.state &&
                    `${singlePropertyData.address.state} `}
                  {singlePropertyData?.address?.zip &&
                    `${singlePropertyData.address.zip}`}
                </p>
              </div>
              <div className="aminities_div_modal">
                <p className="day_p single_property_aminities">
                  <div className="aminities_img_modal single_property_aminities_img bed_svg">
                    <BedImage />{" "}
                    {singlePropertyData?.beds ? (
                      <>{singlePropertyData?.beds} Bed</>
                    ) : (
                      "-- Beds"
                    )}
                  </div>
                </p>
                <p className="day_p single_property_aminities ">
                  <div className="aminities_img_modal single_property_aminities_img">
                    <BathImage />{" "}
                    {singlePropertyData?.baths?.total ? (
                      <>{singlePropertyData?.baths?.total} Baths</>
                    ) : (
                      "-- Baths"
                    )}
                  </div>
                </p>
                <p className="day_p single_property_aminities">
                  <div className="aminities_img_modal single_property_aminities_img">
                    <SizeImage />{" "}
                    {/* {singlePropertyData?.lotSize?.sqft ? (
                      <>{singlePropertyData?.lotSize?.sqft} Sq Ft</>
                    ) : (
                      "-- Sq Ft"
                    )} */}
                    {singlePropertyData?.propertyType === "Rental" ||
                    singlePropertyData?.propertyType ===
                      "Single Family Residential" ||
                    singlePropertyData?.propertyType === "Multi-Family" ||
                    singlePropertyData?.propertyType === "Mid/Hi-Rise Condo" ||
                    singlePropertyData?.propertyType === "Townhouse/Condo" ||
                    singlePropertyData?.propertyType === "Twinhome" ? (
                      <>
                        {singlePropertyData?.size > 0
                          ? singlePropertyData?.size.toLocaleString()
                          : "---"}{" "}
                        Sq Ft
                      </>
                    ) : null}
                    {singlePropertyData?.propertyType ===
                      "Country Homes/Acreage" ||
                    singlePropertyData?.propertyType === "Lots" ? (
                      <>
                        {singlePropertyData?.lotSize?.acres > 0
                          ? singlePropertyData?.lotSize.acres
                          : "---"}{" "}
                        acres
                      </>
                    ) : null}
                  </div>
                </p>
              </div>
              <div className="tags_div">
                <span className="tags_p">
                  Built in {singlePropertyData?.yearBuilt}
                </span>
                <span className="tags_p">
                  {singlePropertyData?.listingType}
                </span>
                <span className="tags_p">
                  {singlePropertyData?.size
                    ? `$ ${(
                        singlePropertyData?.listPrice / singlePropertyData?.size
                      )
                        .toFixed(0)
                        .toLocaleString()}/sqft`
                    : "$ --- / sqft"}
                </span>
                <span className="tags_p">
                  {singlePropertyData?.propertyType}
                </span>
                <span className="tags_p">
                  {singlePropertyData?.lotSize?.sqft ? (
                    <>{singlePropertyData?.lotSize?.sqft} SqFt lot</>
                  ) : (
                    "--SqFt lot"
                  )}
                </span>
              </div>
              <div className="location_btn_div mt-3">
                <button
                  className="location_btn gradient_btn mobile_font"
                  onClick={() => {
                    setShowContactModal(true);
                    setClickButton("contact");
                  }}
                >
                  Contact Us
                </button>
                <button
                  className="location_btn blue_btn mobile_font"
                  onClick={() => {
                    setShowContactModal(true);
                    setClickButton("request");
                  }}
                >
                  Schedule a tour
                </button>
              </div>
              <div className="main_est_div">
                <div className="est_div">
                  <p className="est_p">Est. $ 3, 992/mo </p>
                  <p
                    className="get_p"
                    onClick={() => {
                      setShowPreQualified(true);
                    }}
                  >
                    Get Pre-qualified
                  </p>

                  {/* <a
                    href="https://myloan.minutemortgage.com/becker@propfyi.com"
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >

                  </a> */}
                </div>
              </div>
            </div>
          </div>
          <hr className="hr" />
          <div className="row property_second_row">
            <div className="col-lg-12 tab_col">
              <Slider {...settings}>
                {buttonData?.map((item, index) => {
                  return (
                    <>
                      <Button
                        key={index}
                        className="property_scroll_btn"
                        onClick={() => handleButtonClick(item.targetId)}
                      >
                        {item.name}
                      </Button>
                    </>
                  );
                })}
              </Slider>
            </div>
          </div>
          <div className="row property_second_row" id="what-speacial">
            <div className="col-lg-12">
              <h2 className="speacial_heading">What's Special</h2>
              <p className="speacial_para">
                {singlePropertyData?.description ? (
                  <>{singlePropertyData?.description}</>
                ) : (
                  ""
                )}
              </p>

              <p className="speacial_para_one">
                <strong>Listed by:</strong>{" "}
                {singlePropertyData?.listingAgent?.name}
              </p>
              <p className="speacial_para_one" style={{ marginBottom: "20px" }}>
                <strong>Source: </strong> MLS#: {singlePropertyData?.id}
                <img src={har} className="har_logo" />
              </p>
            </div>

            <hr className="hr" />
          </div>

          <div className="row  property_second_row" id="fact-feature">
            <div className="col-lg-12">
              <h2 className="speacial_heading">Facts & features</h2>
            </div>
          </div>

          {singlePropertyData?.features &&
            Object.entries(singlePropertyData?.features).map(
              ([category, values]) => (
                <div key={category}>
                  <div className="row">
                    <div className="col-lg-12 interior">
                      <p className="interior_p">{category}</p>
                    </div>
                  </div>

                  <div className="row  property_second_row">
                    <div className="col-lg-12 feature_div">
                      {values.map((value, index) => (
                        <ul className="ul_style" key={index}>
                          <li className="bed_li">
                            <CgEditBlackPoint className="angle_icon" /> {value}
                          </li>
                        </ul>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}
          <div id="neighborhood-details">
            <NeighbourHoodDetails
              latCoordinates={singlePropertyData?.coordinates?.latitude}
              longCoordinates={singlePropertyData?.coordinates?.longitude}
              city={singlePropertyData?.address?.city}
              state={singlePropertyData?.address?.state}
            />
          </div>
          <div className="row" id="school-near-by">
            <div className="col-lg-12 homes">
              <p className="interior_p">Schools Near By</p>
            </div>
          </div>

          <SimilarHomes
            latCoordinates={singlePropertyData?.coordinates?.latitude}
            longCoordinates={singlePropertyData?.coordinates?.longitude}
          />
          <div className="row" id="similar-property">
            <div className="col-lg-12 homes">
              <p className="interior_p">Similar Property</p>
            </div>
          </div>
          <HomesForYou
            latCoordinates={singlePropertyData?.coordinates?.latitude}
            longCoordinates={singlePropertyData?.coordinates?.longitude}
            listingType={singlePropertyData?.listingType}
            propertyType={singlePropertyData?.propertyType}
          />
          <p className="copyright_modal">
            Copyright 2024, Houston REALTORS® Information Service, Inc. The
            information provided is exclusively for consumers’ personal,
            non-commercial use, and may not be used for any purpose other than
            to identify prospective properties consumers may be interested in
            purchasing. Information is deemed reliable but not guaranteed. The
            listing broker’s offer of compensation is made only to participants
            of the MLS where the listing is filed.
          </p>
        </div>
      </section>

      {showModal && (
        <Login closeModal={closeModal} openSignupModal={openSignupModal} />
      )}
      {showSignupModal && (
        <Signup closeModal={() => setShowSignupModal(false)} />
      )}
      {showContactModal && (
        <ContactModal
          singlePropertyId={propertyId}
          closeContactModal={() => setShowContactModal(false)}
          pointButton={clickButton}
        />
      )}

      {showPreQualified && (
        <PreQualifiedContact
          singlePropertyId={propertyId}
          closeModal={() => setShowPreQualified(false)}
        />
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

export default PropertyModal;

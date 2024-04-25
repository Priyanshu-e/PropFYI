import React, { useEffect, useState } from "react";
import propertyOneImage from "../../images/home/property-one.png";
import propertyTwoImage from "../../images/home/property-two.png";
import propertyThreeImage from "../../images/home/property-three.png";
import bed from "../../images/home/bed.png";
import bath from "../../images/home/bath.png";
import square from "../../images/home/square.png";

import BedImage from "../../helper/BedImage";
import BathImage from "../../helper/BathImage";
import SizeImage from "../../helper/SizeImage";
import { MdOutlineLocationOn } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { BiSolidLike } from "react-icons/bi";
import { BASE_URL } from "../../route/BaseUrl";
import ContactModal from "./ContactModal";
import PropertyModal from "./PropertyModal";
const HomesForYou = ({
  latCoordinates,
  longCoordinates,
  listingType,
  propertyType,
}) => {
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [clickButton, setClickButton] = useState();
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
  const [nearByData, setNearByData] = useState();
  const getNearByData = async () => {
    try {
      const requestAvtarOptions = {
        method: "GET",
      };

      let url = `${BASE_URL}/api/property/nearby-properties?radius=${latCoordinates},${longCoordinates}&in_radius=25&limit=5&limit=5&listingType=${listingType}&propertyType=${propertyType}`;

      const response = await fetch(url, requestAvtarOptions);
      const data = await response.json();
      console.log(data?.similarData?.result?.listings, "ksjnksad");
      setNearByData(data?.similarData?.result?.listings);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getNearByData();
  }, [latCoordinates, longCoordinates, listingType, propertyType]);
  return (
    <>
      <section className="mb-3">
        <div className="container">
          <div className="row">
            <Slider {...settings}>
              {nearByData?.map((data) => {
                return (
                  <div className="col-lg-4">
                    <div
                      className="hot_caraousel"
                      onClick={() => {
                        setShowPropertyModal(true);
                        setSelectedPropertyId(data?.id);
                      }}
                    >
                      {data?.images ? (
                        <img src={data.images[0]} className="hotdeal_img" />
                      ) : (
                        <img src={propertyOneImage} className="hotdeal_img" />
                      )}
                      <div className="like_div">
                        <div className="like_icon">
                          <BiSolidLike className="like_btn_color" />
                        </div>
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
                        {/* <p className="aminities_para">
                          <img src={bed} className="aminities_img" />
                          {data?.beds ? <>{data?.beds} Bed</> : "-- Beds"}
                        </p>
                        <p className="aminities_para">
                          <img src={bath} className="aminities_img" />
                          {data?.baths?.total ? (
                            <>{data?.baths?.total} Baths</>
                          ) : (
                            "-- Baths"
                          )}
                        </p>
                        <p className="aminities_para">
                          <img src={square} className="aminities_img" />
                          {data?.lotSize?.sqft ? (
                            <>{data?.lotSize?.sqft} Sq Ft</>
                          ) : (
                            "-- Sq Ft"
                          )}
                        </p> */}
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

export default HomesForYou;

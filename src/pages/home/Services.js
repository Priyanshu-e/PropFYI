import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Rent from "../../images/home/rent.png";
import Buy from "../../images/home/buy.png";
import Sale from "../../images/home/sale.png";
import { useSelector } from "react-redux";
import { fetchHomeData } from "../../redux/slices/homePageDataSlice";

const Services = () => {


  const websiteSettingData = useSelector(
    (state) => state?.websiteSetting?.data?.data[0]
  );

  const homePageData = useSelector((state) => state?.homePage?.data?.data);

  const serviceData = [
    {
      id: "1",
      image: homePageData?.feature_icon_2 ? homePageData?.feature_icon_2 : Buy,
      name: homePageData?.feature_3_title
        ? homePageData?.feature_3_title
        : "Buy a home",
      paragraph: homePageData?.feature_small_content_1
        ? homePageData?.feature_small_content_3
        : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      button: homePageData?.feature_cta_3
        ? homePageData?.feature_cta_3
        : "Browse Homes",
      anchor: `${websiteSettingData?.footer_home_links[1]?.home_link}?pageNumber=1&location=&pageSize=10&property_type=sale`
    },
    {
      id: "2",
      image: homePageData?.feature_icon_3 ? homePageData?.feature_icon_3 : Sale,
      name: homePageData?.feature_2_title
        ? homePageData?.feature_2_title
        : "Sell a home ",
      paragraph: homePageData?.feature_small_content_2
        ? homePageData?.feature_small_content_2
        : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      button: homePageData?.feature_cta_2
        ? homePageData?.feature_cta_2
        : "See Your Option",
      anchor: `${websiteSettingData?.footer_home_links[0]?.home_link}`
    },
    {
      id: "3",
      image: homePageData?.feature_icon_1 ? homePageData?.feature_icon_1 : Rent,
      name: homePageData?.feature_1_title
        ? homePageData?.feature_1_title
        : "Rent a home",
      paragraph: homePageData?.feature_small_content_1
        ? homePageData?.feature_small_content_1
        : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      button: homePageData?.feature_cta_1
        ? homePageData?.feature_cta_1
        : "Find Rentals",
      anchor: homePageData?.feature_cta_link_1
        ? homePageData?.feature_cta_link_1
        : `${websiteSettingData?.footer_home_links[1]?.home_link}?pageNumber=1&location=&pageSize=10&property_type=rental`
    },
  ];

  return (
    <>
      <section className="service_section">
        <div className="container">
          <div className="row">
            {serviceData.map((item) => {
              return (
                <div className="col-lg-4" key={item.id}>
                  <div className="service_div">
                    <div className="id_div">
                      <p>{item.id}</p>
                    </div>
                    <img src={item.image} className="service_img" />
                    <h3 className="service_heading">{item.name}</h3>
                    <p className="service_para">{item.paragraph}</p>
                    <NavLink
                      to={item.anchor}
                      className="carousel_btn mt-3 services_home_a "
                    >
                      {item.button}
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;

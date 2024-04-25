import React from "react";
import staticsBanner from "../../images/home/statics_banner.png";
import happy from "../../images/home/happy.png";
import branches from "../../images/home/branches.png";
import property from "../../images/home/property.png";
import house from "../../images/home/house.png";
import { useSelector } from "react-redux";

const Statics = () => {
  const homePageData = useSelector((state) => state?.homePage?.data?.data);

  const staticsData = [
    {
      image: homePageData?.stats_1_icon ? homePageData?.stats_1_icon : happy,
      heading: homePageData?.stats_counter_1
        ? `${homePageData.stats_counter_1}`
        : "435K",
      para: homePageData?.stats_title_1
        ? homePageData?.stats_title_1
        : "Happy Customers",
    },
    {
      image: homePageData?.stats_2_icon ? homePageData?.stats_2_icon : branches,
      heading: homePageData?.stats_counter_2
        ? homePageData?.stats_counter_2
        : "100",
      para: homePageData?.stats_title_2
        ? homePageData?.stats_title_2
        : "Branches Around",
    },
    {
      image: homePageData?.stats_3_icon ? homePageData?.stats_3_icon : property,
      heading: homePageData?.stats_counter_3
        ? `${homePageData?.stats_counter_3}`
        : "135M +",
      para: homePageData?.stats_title_3
        ? homePageData?.stats_title_3
        : "Total Properties",
    },
    {
      image: homePageData?.stats_4_icon ? homePageData?.stats_4_icon : house,
      heading: homePageData?.stats_counter_4
        ? `${homePageData?.stats_counter_4}`
        : "120k",
      para: homePageData?.stats_title_4
        ? homePageData?.stats_title_4
        : "Built House",
    },
  ];

  return (
    <>
      <section
        className="static_section"
        style={{ backgroundImage: `url(${staticsBanner})` }}
      >
        <div className="container">
          <div className="row">
            {staticsData.map((item, index) => {
              return (
                <div className="col-lg-3" key={index}>
                  <div className="static_div">
                    <p className="text-center">
                      <img src={item.image} className="statics_img" />
                    </p>
                    <h2 className="statics_heading">{item.heading}</h2>
                    <p className="statics_para">{item.para}</p>
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

export default Statics;

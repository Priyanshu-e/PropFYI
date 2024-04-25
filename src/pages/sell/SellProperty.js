import React, { useEffect, useState } from "react";
import "./sell.css";
import sellBanner from "../../images/sell/sell_banner.jpg";
import house from "../../images/sell/home.png";
import rightAgent from "../../images/sell/pick_agent.svg";
import yourHome from "../../images/sell/your_home.svg";
import homeValue from "../../images/sell/home_value.svg";
import propfyiSelling from "../../images/sell/propfyi_selling.svg";
import { BASE_URL } from "../../route/BaseUrl";
import WebsiteLoader from "../../helper/WebsiteLoader";
import SellForm from "./SellForm";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const SellProperty = () => {
  const navigate = useNavigate();
  const [saleData, setSaleData] = useState();
  const [loading, setLoading] = useState();
  const [sellerGuidedata, setSellerGuideData] = useState();
  const [sellQuestion, setSellQuestions] = useState();

  const websiteSettingData = useSelector(
    (state) => state?.websiteSetting?.data?.data[0]
  );

  const getSellPageData = async () => {
    try {
      setLoading(true);
      const requestGetOptions = {
        method: "GET",
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
      };
      const res = await fetch(
        `${BASE_URL}/api/website/get-sellpage`,
        requestGetOptions
      );
      const data = await res.json();

      setSaleData(data?.data);
      setSellerGuideData(data?.data?.homepage_seller_guides);
      setSellQuestions(data?.data?.sell_questions);
      console.log(
        data?.data?.homepage_seller_guides,
        "sell data--------------------------"
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const firstSection = [
    {
      mainImage: saleData?.sec_2_1_image ? saleData?.sec_2_1_image : rightAgent,
      sellingImage: propfyiSelling,
      title: saleData?.sec_2_1_sub_title,
      description: saleData?.sec_2_1_description,
      sell_card: "agent",
      button: "Get started",
    },
    {
      mainImage: saleData?.sec_2_2_image ? saleData?.sec_2_2_image : yourHome,
      sellingImage: propfyiSelling,
      title: saleData?.sec_2_2_sub_title,
      description: saleData?.sec_2_2_description,
      sell_card: "offers",
      button: "Connect with lender",
    },
    // {
    //   mainImage: saleData?.sec_2_3_image,
    //   sellingImage: propfyiSelling,
    //   title: saleData?.sec_2_3_sub_title,
    //   description: saleData?.sec_2_3_description,
    //   sell_card: "selling",
    // },
  ];

  useEffect(() => {
    getSellPageData();
  }, []);

  //Sell Form
  const [showSellForm, setShowSellForm] = useState({
    showForm: false,
    sellCard: null,
  });

  const [firstQuestion, setFirstQuestion] = useState(true);
  const [secondQuestion, setSecondQuestion] = useState(false);
  const [thirdQuestion, setThirdQuestion] = useState(false);
  const [fourthQuestion, setFourthQuestion] = useState(false);
  const [activeDiv, setActiveDiv] = useState(1);

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
        className="sell_section mobile_padding"
        style={{ backgroundImage: `url(${saleData?.sec_1_image})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="blog_banner_heading sell_page_banner_heading">
                {saleData?.sec_1_title}
              </h1>
              <p className="blog_section_para sell_page_banner_para">
                {saleData?.sec_1_sub_title}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sell_second_section">
        <div className="container">
          <div className="row">
            {firstSection?.map((item) => {
              return (
                <div className="col-lg-12">
                  <div className="row sell_second_row  mt-4">
                    <div className="col-lg-3">
                      <img src={item.mainImage} className="house_img" />
                    </div>
                    <div className="col-lg-1 no_width"></div>

                    <div className="col-lg-8">
                      <img src={item.sellingImage} />
                      <h2 className="house_heading">{item.title}</h2>
                      <p className="house_para">{item.description}</p>
                      <button
                        className="carousel_btn sell_btn"
                        onClick={() => {
                          if (item.button == "Get started") {
                            setShowSellForm({
                              showForm: true,
                              sellCard: item.sell_card,
                            });
                          } else {
                            navigate("/mortgage");
                          }
                        }}
                      >
                        {item.button}{" "}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* <section className="sell_last_section ">
        <div className="container">
          <div className="row">
            <h1 className="seller_guide">Seller guide</h1>
            {sellerGuidedata?.map((item) => {
              return (
                <div
                  className="col-lg-3 sell_col"
                  onClick={() => {
                    alert("answer");
                  }}
                >
                  <div className="sell_last_div">
                    <p className="sell_last_para">{item.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section> */}

      <section className="sell_last_section hide_sell_mobile">
        <div className="container">
          <div className="row">
            <h1 className="seller_guide">Seller guide</h1>

            <div
              className="col-lg-3 sell_col"
              onClick={() => {
                setActiveDiv(1);
                setFirstQuestion(true);
                setSecondQuestion(false);
                setThirdQuestion(false);
                setFourthQuestion(false);
              }}
            >
              <div
                className={`sell_last_div ${
                  activeDiv === 1 ? "sell_last_div_active" : ""
                }`}
              >
                <p
                  className={`sell_last_para ${
                    activeDiv === 1 ? "sell_last_para_active" : ""
                  }`}
                >
                  Should I sell my property now?{" "}
                </p>
              </div>
            </div>
            <div
              className="col-lg-3 sell_col"
              onClick={() => {
                setActiveDiv(2);
                setFirstQuestion(false);
                setSecondQuestion(true);
                setThirdQuestion(false);
                setFourthQuestion(false);
              }}
            >
              <div
                className={`sell_last_div ${
                  activeDiv === 2 ? "sell_last_div_active" : ""
                }`}
              >
                <p
                  className={`sell_last_para ${
                    activeDiv === 2 ? "sell_last_para_active" : ""
                  }`}
                >
                  Determining Your Property’s Worth?
                </p>
              </div>
            </div>
            <div
              className="col-lg-3 sell_col"
              onClick={() => {
                setActiveDiv(3);
                setFirstQuestion(false);
                setSecondQuestion(false);
                setThirdQuestion(true);
                setFourthQuestion(false);
              }}
            >
              <div
                className={`sell_last_div ${
                  activeDiv === 3 ? "sell_last_div_active" : ""
                }`}
              >
                <p
                  className={`sell_last_para ${
                    activeDiv === 3 ? "sell_last_para_active" : ""
                  }`}
                >
                  How to maximize your property exposure?
                </p>
              </div>
            </div>
            <div
              className="col-lg-3 sell_col"
              onClick={() => {
                setActiveDiv(4);
                setFirstQuestion(false);
                setSecondQuestion(false);
                setThirdQuestion(false);
                setFourthQuestion(true);
              }}
            >
              <div
                className={`sell_last_div ${
                  activeDiv === 4 ? "sell_last_div_active" : ""
                }`}
              >
                <p
                  className={`sell_last_para ${
                    activeDiv === 4 ? "sell_last_para_active" : ""
                  }`}
                >
                  How Can I Leverage my Equity to Purchase a New Property and
                  Maximize My Net Worth?
                </p>
              </div>
            </div>
          </div>

          {firstQuestion && (
            <div className="row">
              <div className="col-lg-12 sell_question_col">
                <p>
                  In today’s dynamic real estate market, timing is crucial when
                  considering selling your property. Here’s why now might be the
                  perfect moment to make that move:
                </p>
                <p>
                  1. High Demand: There’s currently a surge in buyer activity,
                  with many actively searching for properties. This increased
                  demand often leads to competitive bidding wars, driving
                  property prices up.
                </p>
                <p>
                  2. Low Inventory: Inventory levels are dwindling in many
                  areas, resulting in fewer properties available for sale. This
                  scarcity can work in your favor, attracting more attention to
                  your property.
                </p>
                <p>
                  3. Maximize Profit: Selling now allows you to capitalize on
                  the current market conditions and potentially maximize your
                  profit.
                </p>
                <p>
                  By selling your property now, you can take advantage of the
                  high demand, low inventory, and favorable market conditions to
                  secure a lucrative deal. Don’t miss out on this opportune
                  moment to sell your property for optimal returns.
                </p>
              </div>
            </div>
          )}
          {secondQuestion && (
            <div className="row">
              <div className="col-lg-12 sell_question_col">
                <p>
                  Determining the value of your property is a crucial step when
                  considering selling. While various factors influence your
                  property’s worth, turning to a reliable source for accurate
                  information is essential. Here’s why Propfyi real estate
                  agents are your best reference:
                </p>
                <p>
                  1. Market Expertise: Propfyi agents possess in-depth knowledge
                  of local real estate markets. They stay updated on current
                  trends, pricing dynamics, and neighborhood developments,
                  providing valuable insights into your property’s worth.
                </p>
                <p>
                  2. Data-driven Analysis: Propfyi utilizes advanced tools and
                  data analytics to assess your property’s value accurately.
                  Their comprehensive approach considers factors such as
                  comparable sales, property condition, and market demand to
                  determine a fair and competitive price.
                </p>
                <p>
                  3. Personalized Guidance: Propfyi agents offer personalized
                  guidance throughout the valuation process. They take the time
                  to understand your unique property features, market
                  preferences, and selling goals, ensuring a tailored pricing
                  strategy that aligns with your objectives.
                </p>
                <p>
                  By partnering with Propfyi real estate agents, you gain access
                  to unparalleled expertise, data-driven analysis, and
                  personalized guidance to determine your property’s worth
                  accurately. Trust Propfyi for a seamless and successful
                  selling experience.
                </p>
              </div>
            </div>
          )}
          {thirdQuestion && (
            <div className="row">
              <div className="col-lg-12 sell_question_col">
                <p>
                  When it comes to selling your property, maximizing exposure to
                  potential buyers is key to achieving a successful sale. With
                  Propfyi, you have two powerful options to ensure your property
                  gets the attention it deserves:
                </p>
                <p>
                  1.For Sale by Owner (FSBO): If you prefer a hands-on approach,
                  Propfyi offers a user-friendly platform for listing your
                  property as FSBO. You’ll have full control over the selling
                  process while benefiting from Propfyi’s extensive network and
                  marketing tools to reach a wide audience of buyers.
                </p>
                <p>
                  2. Propfyi Real Estate Agent: Alternatively, enlist the
                  expertise of a Propfyi real estate agent to handle the sale on
                  your behalf. Their professional guidance, market knowledge,
                  and negotiation skills will streamline the selling process.
                  Plus, your property will be listed on multiple platforms,
                  including the MLS (Multiple Listing Service), maximizing
                  exposure to potential buyers.
                </p>

                <p>
                  Whether you choose FSBO or enlist a Propfyi agent, you’ll
                  benefit from increased property exposure, ensuring your
                  listing reaches a wide pool of interested buyers. Trust
                  Propfyi to help you navigate the selling process seamlessly
                  and effectively.
                </p>
              </div>
            </div>
          )}
          {fourthQuestion && (
            <div className="row">
              <div className="col-lg-12 sell_question_col">
                <p>
                  Unlocking the equity from selling your property to purchase a
                  new one can be a smart financial move, and with Propfyi’s
                  expert guidance, it’s easier than ever. Here’s how Propfyi can
                  help you navigate this process:
                </p>
                <p>
                  1. Equity Evaluation: Propfyi’s real estate experts will
                  conduct a thorough evaluation of your property’s equity,
                  helping you understand how much you can leverage towards your
                  new purchase.
                </p>
                <p>
                  2. Market Insights: With Propfyi’s in-depth market insights,
                  you’ll gain valuable information about potential properties to
                  maximize your investment.
                </p>
                <p>
                  2. Connect with Lenders: Propfyi will connect you with trusted
                  lenders who can provide information on various financing
                  options available to you, ensuring you make informed decisions
                  that align with your financial goals.
                </p>
                <p>
                  2. Maximize Net Worth: By leveraging equity effectively and
                  making strategic property investments, Propfyi will guide you
                  towards maximizing your net worth over time.
                </p>

                <p>
                  With Propfyi’s expertise and access to top lenders, you can
                  confidently leverage your property’s equity to purchase your
                  next dream home or investment property while maximizing your
                  financial potential. Trust Propfyi to be your partner in
                  achieving your real estate goals.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="sell_last_section hide_sell_desktop">
        <div className="container">
          <div className="row">
            <h1 className="seller_guide">Seller guide</h1>

            <div
              className="col-lg-3 sell_col"
              onClick={() => {
                setActiveDiv(1);
                setFirstQuestion(true);
                setSecondQuestion(false);
                setThirdQuestion(false);
                setFourthQuestion(false);
              }}
            >
              <div
                className={`sell_last_div ${
                  activeDiv === 1 ? "sell_last_div_active" : ""
                }`}
              >
                <p
                  className={`sell_last_para ${
                    activeDiv === 1 ? "sell_last_para_active" : ""
                  }`}
                >
                  Should I sell my property now?{" "}
                </p>
              </div>
              {firstQuestion && (
                <div className="row">
                  <div className="col-lg-12 sell_question_col">
                    <p>
                      In today’s dynamic real estate market, timing is crucial
                      when considering selling your property. Here’s why now
                      might be the perfect moment to make that move:
                    </p>
                    <p>
                      1. High Demand: There’s currently a surge in buyer
                      activity, with many actively searching for properties.
                      This increased demand often leads to competitive bidding
                      wars, driving property prices up.
                    </p>
                    <p>
                      2. Low Inventory: Inventory levels are dwindling in many
                      areas, resulting in fewer properties available for sale.
                      This scarcity can work in your favor, attracting more
                      attention to your property.
                    </p>
                    <p>
                      3. Maximize Profit: Selling now allows you to capitalize
                      on the current market conditions and potentially maximize
                      your profit.
                    </p>
                    <p>
                      By selling your property now, you can take advantage of
                      the high demand, low inventory, and favorable market
                      conditions to secure a lucrative deal. Don’t miss out on
                      this opportune moment to sell your property for optimal
                      returns.
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div
              className="col-lg-3 sell_col"
              onClick={() => {
                setActiveDiv(2);
                setFirstQuestion(false);
                setSecondQuestion(true);
                setThirdQuestion(false);
                setFourthQuestion(false);
              }}
            >
              <div
                className={`sell_last_div ${
                  activeDiv === 2 ? "sell_last_div_active" : ""
                }`}
              >
                <p
                  className={`sell_last_para ${
                    activeDiv === 2 ? "sell_last_para_active" : ""
                  }`}
                >
                  Determining Your Property’s Worth?
                </p>
              </div>

              {secondQuestion && (
                <div className="row">
                  <div className="col-lg-12 sell_question_col">
                    <p>
                      Determining the value of your property is a crucial step
                      when considering selling. While various factors influence
                      your property’s worth, turning to a reliable source for
                      accurate information is essential. Here’s why Propfyi real
                      estate agents are your best reference:
                    </p>
                    <p>
                      1. Market Expertise: Propfyi agents possess in-depth
                      knowledge of local real estate markets. They stay updated
                      on current trends, pricing dynamics, and neighborhood
                      developments, providing valuable insights into your
                      property’s worth.
                    </p>
                    <p>
                      2. Data-driven Analysis: Propfyi utilizes advanced tools
                      and data analytics to assess your property’s value
                      accurately. Their comprehensive approach considers factors
                      such as comparable sales, property condition, and market
                      demand to determine a fair and competitive price.
                    </p>
                    <p>
                      3. Personalized Guidance: Propfyi agents offer
                      personalized guidance throughout the valuation process.
                      They take the time to understand your unique property
                      features, market preferences, and selling goals, ensuring
                      a tailored pricing strategy that aligns with your
                      objectives.
                    </p>
                    <p>
                      By partnering with Propfyi real estate agents, you gain
                      access to unparalleled expertise, data-driven analysis,
                      and personalized guidance to determine your property’s
                      worth accurately. Trust Propfyi for a seamless and
                      successful selling experience.
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div
              className="col-lg-3 sell_col"
              onClick={() => {
                setActiveDiv(3);
                setFirstQuestion(false);
                setSecondQuestion(false);
                setThirdQuestion(true);
                setFourthQuestion(false);
              }}
            >
              <div
                className={`sell_last_div ${
                  activeDiv === 3 ? "sell_last_div_active" : ""
                }`}
              >
                <p
                  className={`sell_last_para ${
                    activeDiv === 3 ? "sell_last_para_active" : ""
                  }`}
                >
                  How to maximize your property exposure?
                </p>
              </div>

              {thirdQuestion && (
                <div className="row">
                  <div className="col-lg-12 sell_question_col">
                    <p>
                      When it comes to selling your property, maximizing
                      exposure to potential buyers is key to achieving a
                      successful sale. With Propfyi, you have two powerful
                      options to ensure your property gets the attention it
                      deserves:
                    </p>
                    <p>
                      1.For Sale by Owner (FSBO): If you prefer a hands-on
                      approach, Propfyi offers a user-friendly platform for
                      listing your property as FSBO. You’ll have full control
                      over the selling process while benefiting from Propfyi’s
                      extensive network and marketing tools to reach a wide
                      audience of buyers.
                    </p>
                    <p>
                      2. Propfyi Real Estate Agent: Alternatively, enlist the
                      expertise of a Propfyi real estate agent to handle the
                      sale on your behalf. Their professional guidance, market
                      knowledge, and negotiation skills will streamline the
                      selling process. Plus, your property will be listed on
                      multiple platforms, including the MLS (Multiple Listing
                      Service), maximizing exposure to potential buyers.
                    </p>

                    <p>
                      Whether you choose FSBO or enlist a Propfyi agent, you’ll
                      benefit from increased property exposure, ensuring your
                      listing reaches a wide pool of interested buyers. Trust
                      Propfyi to help you navigate the selling process
                      seamlessly and effectively.
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div
              className="col-lg-3 sell_col"
              onClick={() => {
                setActiveDiv(4);
                setFirstQuestion(false);
                setSecondQuestion(false);
                setThirdQuestion(false);
                setFourthQuestion(true);
              }}
            >
              <div
                className={`sell_last_div ${
                  activeDiv === 4 ? "sell_last_div_active" : ""
                }`}
              >
                <p
                  className={`sell_last_para ${
                    activeDiv === 4 ? "sell_last_para_active" : ""
                  }`}
                >
                  How Can I Leverage my Equity to Purchase a New Property and
                  Maximize My Net Worth?
                </p>
              </div>

              {fourthQuestion && (
                <div className="row">
                  <div className="col-lg-12 sell_question_col">
                    <p>
                      Unlocking the equity from selling your property to
                      purchase a new one can be a smart financial move, and with
                      Propfyi’s expert guidance, it’s easier than ever. Here’s
                      how Propfyi can help you navigate this process:
                    </p>
                    <p>
                      1. Equity Evaluation: Propfyi’s real estate experts will
                      conduct a thorough evaluation of your property’s equity,
                      helping you understand how much you can leverage towards
                      your new purchase.
                    </p>
                    <p>
                      2. Market Insights: With Propfyi’s in-depth market
                      insights, you’ll gain valuable information about potential
                      properties to maximize your investment.
                    </p>
                    <p>
                      2. Connect with Lenders: Propfyi will connect you with
                      trusted lenders who can provide information on various
                      financing options available to you, ensuring you make
                      informed decisions that align with your financial goals.
                    </p>
                    <p>
                      2. Maximize Net Worth: By leveraging equity effectively
                      and making strategic property investments, Propfyi will
                      guide you towards maximizing your net worth over time.
                    </p>

                    <p>
                      With Propfyi’s expertise and access to top lenders, you
                      can confidently leverage your property’s equity to
                      purchase your next dream home or investment property while
                      maximizing your financial potential. Trust Propfyi to be
                      your partner in achieving your real estate goals.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {showSellForm.showForm && (
        <SellForm
          closeSellForm={() => setShowSellForm(false)}
          questionData={sellQuestion}
          sellCard={showSellForm.sellCard}
        />
      )}
    </>
  );
};

export default SellProperty;

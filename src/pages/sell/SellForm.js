import React, { useEffect, useState } from "react";
import close from "../../images/auth/close.png";
import searchIcon from "../../images/home/search.png";
import right from "../../images/sell/right.svg";
import Autocomplete from "react-google-autocomplete";
import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BASE_URL } from "../../route/BaseUrl";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

import user from "../../images/buy/user.png";

import {
  fetchFirstQuestion,
  fetchSecondQuestion,
  fetchThirdQuestion,
} from "../../redux/slices/sellQuestionSlice";

const SellForm = ({ closeSellForm, sellCard }) => {
  const websiteSettingData = useSelector(
    (state) => state?.websiteSetting?.data?.data[0]
  );
  const [showThankYou, setShowThankYou] = useState(false);
  const [showLocation, setShowLocation] = useState(true);
  const [showFirstQuestion, setShowFirstQuestion] = useState(false);
  const [showSecondQuestion, setShowSecondQuestion] = useState(false);
  const [showThirdtQuestion, setShowThirdQuestion] = useState(false);
  const [selectedFirstAnswer, setSelectedFirstAnswer] = useState(null);
  const [selectedSecondAnswer, setSelectedSecondAnswer] = useState(null);
  const [selectedThirdAnswer, setSelectedThirdAnswer] = useState(null);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  //sell form submit
  const [searchValue, setSearchValue] = useState();
  const dispatch = useDispatch();
  const questionData = useSelector((state) => state.sellForm.questionData);

  useEffect(() => {
    if (showFirstQuestion) {
      dispatch(fetchFirstQuestion());
    } else if (showSecondQuestion) {
      dispatch(fetchSecondQuestion());
    } else if (showThirdtQuestion) {
      dispatch(fetchThirdQuestion());
    }
  }, [showFirstQuestion, showSecondQuestion, fetchThirdQuestion]);
  const handleFirstQuestionAnswer = (selectedAnswer) => {
    setSelectedFirstAnswer(selectedAnswer);
    setShowFirstQuestion(false);
    setShowSecondQuestion(true);
  };

  const handleSecondQuestionAnswer = (selectedAnswer) => {
    setSelectedSecondAnswer(selectedAnswer);
    setShowSecondQuestion(false);
    setShowThirdQuestion(true);
  };

  const handleThirdQuestionAnswer = (selectedAnswer) => {
    setSelectedThirdAnswer(selectedAnswer);
    setShowThirdQuestion(false);
    setShowUserDetail(true);
  };
  const submitData = async () => {
    const sellData = {
      sell_card: sellCard,
      question_response: {
        "What's the address of the home you want to sell?": searchValue,
        "How soon are u looking to sell": selectedFirstAnswer,
        "how much do you think your home will sell for?": selectedSecondAnswer,
        "what kind of home are you looking to sell?": selectedThirdAnswer,
      },
      name: name,
      email: email,
      phone: phone,
    };
    console.log(sellData);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sellData),
    };
    try {
      const response = await fetch(
        `${BASE_URL}/api/website/sell-enquiries`,
        requestOptions
      );
      const result = await response.json();

      if (result.status == "success") {
        setShowUserDetail(false);
        setShowThankYou(true);
        console.log(result.message);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const strongRegex = new RegExp(
    "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
  );
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
    <>
      <section className="sell_modal_section">
        <img
          src={close}
          className="sell_page_form_close hide_desktop"
          onClick={() => {
            closeSellForm();
          }}
        />
        <div>
          <div className="container-fluid zero-padding">
            <div className="row sell_page_modal">
              {showLocation && (
                <div className="col-lg-12 content_sell_form">
                  <img
                    src={close}
                    className="sell_page_form_close hide_mobile"
                    onClick={() => {
                      closeSellForm();
                    }}
                  />
                  <div className="content_div">
                    <div className="question_div">
                      <h2 className="question_heading">
                        What's the address of the home you want to sell?
                        <div className="sell_search_div">
                          <img src={searchIcon} className="search_icon" />

                          {/* <Autocomplete
                            apiKey="AIzaSyBJ79HBANEvKnm6Jin3sxjD2E29tena1Ic"
                            onPlaceSelected={(place) => {
                              setSearchValue(place?.formatted_address);
                            }}
                            placeholder="Property address"
                            className="sell_location_input"
                            options={{
                              types: ["(cities)"],
                              componentRestrictions: { country: "us" },
                            }}
                          /> */}
                          <input
                            id="address-input"
                            type="text"
                            placeholder="start searching..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="sell_location_input"
                          />

                          <button
                            className="input_btn sell_location"
                            onClick={() => {
                              if (!searchValue) {
                                toast.warning("please enter the location");
                              } else {
                                setShowLocation(false);
                                setShowFirstQuestion(true);
                              }
                            }}
                          >
                            Continue
                          </button>
                        </div>
                      </h2>
                    </div>
                    <div></div>
                  </div>
                </div>
              )}

              {showFirstQuestion && questionData && questionData.length > 0 && (
                <div className="col-lg-12 content_sell_form">
                  <img
                    src={close}
                    className="sell_page_form_close hide_mobile"
                    onClick={() => {
                      closeSellForm();
                    }}
                  />
                  <div className="content_div">
                    <div className="question_div">
                      <h2 className="question_heading">
                        {questionData[0].question}
                      </h2>
                    </div>
                    <div>
                      <div className="answer_div mt-4">
                        {questionData[0].seller_options?.map((answer) => {
                          return (
                            <>
                              <button
                                className="answer_btn"
                                onClick={() =>
                                  handleFirstQuestionAnswer(answer?.option)
                                }
                              >
                                {answer?.option}
                              </button>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {showSecondQuestion && (
                <div className="col-lg-12 content_sell_form">
                  <img
                    src={close}
                    className="sell_page_form_close hide_mobile"
                    onClick={() => {
                      closeSellForm();
                    }}
                  />
                  <div className="content_div">
                    <div className="question_div">
                      <h2 className="question_heading">
                        {questionData.question}
                      </h2>
                    </div>
                    <div>
                      <div className="answer_div mt-4">
                        {questionData.seller_options?.map((answer) => {
                          return (
                            <>
                              <button
                                className="answer_btn"
                                onClick={() =>
                                  handleSecondQuestionAnswer(answer.option)
                                }
                              >
                                {answer?.option}
                              </button>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {showThirdtQuestion && (
                <div className="col-lg-12 content_sell_form">
                  <img
                    src={close}
                    className="sell_page_form_close hide_mobile"
                    onClick={() => {
                      closeSellForm();
                    }}
                  />
                  <div className="content_div">
                    <div className="question_div">
                      <h2 className="question_heading">
                        {questionData.question}
                      </h2>
                    </div>
                    <div>
                      <div className="answer_div mt-4">
                        {questionData.seller_options?.map((answer) => {
                          return (
                            <>
                              <button
                                className="answer_btn"
                                onClick={() =>
                                  handleThirdQuestionAnswer(answer.option)
                                }
                              >
                                {answer?.option}
                              </button>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {showUserDetail && (
                <div className="col-lg-12 content_sell_form">
                  <img
                    src={close}
                    className="sell_page_form_close hide_mobile"
                    onClick={() => {
                      closeSellForm();
                    }}
                  />
                  <div className="content_div user_submit">
                    <div className="question_div">
                      <h2 className="question_heading">
                        Let's pick the right Agent for you
                      </h2>
                      <div className="input_sale mt-5">
                        <FaUser style={{ color: "#C96F3B" }} />
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="sale_input"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="input_sale">
                        <FaPhoneAlt style={{ color: "#C96F3B" }} />
                        <input
                          type="text"
                          placeholder="Phone"
                          className="sale_input"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className="input_sale">
                        <MdEmail
                          style={{ color: "#C96F3B", fontSize: "20px" }}
                        />
                        <input
                          type="text"
                          placeholder="Email"
                          className="sale_input"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="input_sale_btn">
                        <button
                          className="carousel_btn sell_form_sumbit"
                          onClick={() => {
                            if (!name || !phone || !email) {
                              toast.warning("Enter the require fileds");
                            } else if (phone.length < 10 || phone.length > 12) {
                              toast.warning("Please enter the valid phone");
                            } else if (!strongRegex.test(email)) {
                              toast.warning("Please enter the valid email");
                            } else {
                              submitData();
                            }
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              )}
              {showThankYou && (
                <div className="col-lg-12 content_sell_form">
                  <img
                    src={close}
                    className="sell_page_form_close hide_mobile"
                    onClick={() => {
                      closeSellForm();
                    }}
                  />
                  <div className="content_div user_submit thank_you_sell">
                    <div>
                      <img src={right} class="zoom-in-out" />
                      <h2 className="application_submitted mt-3">
                        Application Submitted
                      </h2>
                      <p className="para_agent">
                        Our Agent will call you shortly
                      </p>

                      <div className="thankyou_user">
                        <div>
                          <img src={user} className="user_img" />
                        </div>
                        <div className="user_th_text">
                          {/* <p className="user_talk"></p> */}
                          <p className="user_agent">
                            <b>Ready to text now ?</b>:
                            <a
                              href={`tel:${websiteSettingData?.phone}`}
                              className="footer_anchor"
                            >
                              {websiteSettingData?.phone
                                ? websiteSettingData?.phone
                                : "+123-123-1234"}
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
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

export default SellForm;

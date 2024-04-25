import React, { useState } from "react";
import "./propertymodal.css";
import nameImage from "../../images/auth/name.png";
import otpImage from "../../images/auth/otp.png";
import emailIcon from "../../images/auth/email.png";
import user from "../../images/buy/user.png";
import close from "../../images/auth/close.png";
import { BASE_URL } from "../../route/BaseUrl";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const ContactModal = ({ closeContactModal, singlePropertyId, pointButton }) => {
  const websiteSettingData = useSelector(
    (state) => state?.websiteSetting?.data?.data[0]
  );
  const strongRegex = new RegExp(
    "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
  );
  const [showContact, setShowContact] = useState(
    pointButton === "contact" ? true : false
  );
  const [showRequest, setShowRequest] = useState(
    pointButton === "request" ? true : false
  );

  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();

  const contactAgent = async () => {
    const contactData = {
      name: name,
      email: email,
      phone: phone,
      message: message,
      source_page: "Cotnact Agent",
      mls_id: singlePropertyId,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    };
    try {
      const response = await fetch(
        `${BASE_URL}/api/website/register-contact-enquiry`,
        requestOptions
      );
      const result = await response.json();
      if (result.status == "failed") {
      } else {
        toast.success("Our agent will contact to you soon");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      }
    } catch (error) {
      toast.warning("Error:", error);
    }
  };
  const requestAgent = async () => {
    const contactData = {
      time: `${date} ${time}`,
      name: name,
      email: email,
      phone: phone,
      message: message,
      source_page: "Request a Agent",
      mls_id: singlePropertyId,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    };
    try {
      const response = await fetch(
        `${BASE_URL}/api/website/register-contact-enquiry`,
        requestOptions
      );
      const result = await response.json();
      if (result.status == "failed") {
      } else {
        toast.success("Our agent will contact to you soon");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setDate("");
        setTime("");
      }
    } catch (error) {
      toast.warning("Error:", error);
    }
  };
  return (
    <section className="modal_section">
      <img
        src={close}
        className="close_btn_modal hide_desktop"
        onClick={() => {
          closeContactModal();
        }}
      />
      <div className="container  zero-padding">
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <div className="contact_input_div contact_div_padding">
              <img
                src={close}
                className="close_btn_modal hide_mobile  "
                onClick={() => {
                  closeContactModal();
                }}
              />
              <div className="radio_div">
                <p
                  className={`radio_para ${
                    showContact ? "active_radio_para" : ""
                  }`}
                  onClick={() => {
                    setShowContact(true);
                    setShowRequest(false);
                  }}
                >
                  Contact Agent
                </p>
                <p
                  className={`radio_para ${
                    showRequest ? "active_radio_para" : ""
                  }`}
                  onClick={() => {
                    setShowContact(false);
                    setShowRequest(true);
                  }}
                >
                  Request A Tour
                </p>
              </div>

              {showContact && (
                <div className="form_padding">
                  <div className="input_div_signup">
                    <img src={nameImage} className="email" />
                    <input
                      type="text"
                      placeholder="Name"
                      className="login_input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="input_div_signup">
                    <img src={otpImage} className="email" />
                    <input
                      type="text"
                      placeholder="Phone"
                      className="login_input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="input_div_signup">
                    <img src={emailIcon} className="email" />
                    <input
                      type="text"
                      placeholder="Email"
                      className="login_input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="textarea contact_textarea">
                    <input
                      type="text"
                      placeholder="Add Message"
                      className="login_input "
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <div className="modal_checkbox_div">
                    <input type="checkbox" className="modal_checkbox" checked />
                    <label className="contact_modal_checkbox">
                      I have read and agree to the
                      <span className="modal_span_checkbox">
                        {" "}
                        terms of service
                      </span>
                    </label>
                  </div>
                  <button
                    className="carousel_btn modal_contact"
                    onClick={() => {
                      if (!name || !phone || !email || !message) {
                        toast.warning("Enter the requie field");
                      } else if (phone.length < 10 || phone.length > 12) {
                        toast.warning("Please enter the valid phone");
                      } else if (!strongRegex.test(email)) {
                        toast.warning("Please enter the valid email");
                      } else {
                        contactAgent();
                      }
                    }}
                  >
                    Contact Agent
                  </button>
                  <div className="contact_agent_div">
                    <div>
                      <img src={user} className="user_img" />
                    </div>
                    <div>
                      <p className="user_agent">
                        <b>Ready to text now ?</b>:{" "}
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
                  <p className="contact_modal_para">
                    By pressing Contact agent, you agree that Propfyi Group and
                    its affiliates, and real estate professionals may call/text
                    you about your inquiry, which may involve use of automated
                    means and prerecorded/artificial voices. You don't need to
                    consent as a condition of buying any property, goods or
                    services. Message/data rates may apply. You also agree to
                    our Terms of Use. Propfyi does not endorse any real estate
                    professionals. We may share information about your recent
                    and future site activity with your agent to help them
                    understand what you're looking for in a home.
                  </p>
                </div>
              )}
              {showRequest && (
                <div className="form_padding">
                  <div className="input_div_signup">
                    <input
                      type="time"
                      className="time_div"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                  <div className="input_div_signup">
                    <input
                      type="date"
                      className="date_div"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className="input_div_signup">
                    <img src={nameImage} className="email" />
                    <input
                      type="text"
                      placeholder="Name"
                      className="login_input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="input_div_signup">
                    <img src={otpImage} className="email" />
                    <input
                      type="text"
                      placeholder="Phone"
                      className="login_input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="input_div_signup">
                    <img src={emailIcon} className="email" />
                    <input
                      type="text"
                      placeholder="Email"
                      className="login_input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="textarea contact_textarea">
                    <input
                      type="text"
                      placeholder="Add Message"
                      className="login_input "
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <div className="modal_checkbox_div">
                    <input type="checkbox" className="modal_checkbox" checked />
                    <label className="contact_modal_checkbox">
                      I have read and agree to the
                      <span className="modal_span_checkbox">
                        {" "}
                        terms of service
                      </span>
                    </label>
                  </div>
                  <button
                    className="carousel_btn modal_contact"
                    onClick={() => {
                      if (
                        !name ||
                        !phone ||
                        !email ||
                        !message ||
                        !time ||
                        !date
                      ) {
                        toast.warning("Enter the requie field");
                      } else if (phone.length < 10 || phone.length > 12) {
                        toast.warning("Please enter the valid phone");
                      } else if (!strongRegex.test(email)) {
                        toast.warning("Please enter the valid email");
                      } else {
                        requestAgent();
                      }
                    }}
                  >
                    Contact Agent
                  </button>
                  <div className="contact_agent_div">
                    <div>
                      <img src={user} className="user_img" />
                    </div>
                    <div>
                      <p className="user_agent">
                        <b>Ready to text now ?</b>:{" "}
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
                  <p className="contact_modal_para">
                    By pressing Contact agent, you agree that Propfyi Group and
                    its affiliates, and real estate professionals may call/text
                    you about your inquiry, which may involve use of automated
                    means and prerecorded/artificial voices. You don't need to
                    consent as a condition of buying any property, goods or
                    services. Message/data rates may apply. You also agree to
                    our Terms of Use. Propfyi does not endorse any real estate
                    professionals. We may share information about your recent
                    and future site activity with your agent to help them
                    understand what you're looking for in a home.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
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
    </section>
  );
};

export default ContactModal;

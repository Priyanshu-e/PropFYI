import React, { useState } from "react";
import "./propertymodal.css";
import nameImage from "../../images/auth/name.png";
import otpImage from "../../images/auth/otp.png";
import emailIcon from "../../images/auth/email.png";
import user from "../../images/buy/user.png";
import close from "../../images/auth/close.png";
import { BASE_URL } from "../../route/BaseUrl";
import { toast, ToastContainer } from "react-toastify";

const PreQualifiedContact = ({ closeModal, singlePropertyId }) => {
  const strongRegex = new RegExp(
    "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
  );

  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();

  const preQualified = async () => {
    const contactData = {
      name: name,
      email: email,
      phone: phone,
      source_page: "mortgage",
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
        console.log(result);
      } else {
        console.log("submitted");
        setName("");
        setEmail("");
        setPhone("");
      }
    } catch (error) {
      toast.warning("Error:", error);
    }
    closeModal();

    window.open(
      "https://myloan.minutemortgage.com/becker@propfyi.com",
      "_blank"
    );
  };

  return (
    <section className="modal_section">
      <img
        src={close}
        className="close_btn_modal_pre hide_desktop"
        onClick={() => {
          closeModal();
        }}
      />
      <div className="container  zero-padding">
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <div className="contact_input_div_pre contact_div_padding">
              <img
                src={close}
                className="close_btn_modal_pre hide_mobile  "
                onClick={() => {
                  closeModal();
                }}
              />

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

                <button
                  className="carousel_btn modal_contact"
                  onClick={() => {
                    if (!name || !phone || !email) {
                      toast.warning("Enter the requie field");
                    } else if (phone.length < 10 || phone.length > 12) {
                      toast.warning("Please enter the valid phone");
                    } else if (!strongRegex.test(email)) {
                      toast.warning("Please enter the valid email");
                    } else {
                      preQualified();
                    }
                  }}
                >
                  Get Started
                </button>
                <p className="mt-4">
                  <b> Disclaimer</b> :Third-party lenders are independent
                  entities. PropFYI holds no responsibility for interactions or
                  transactions conducted with any third-party lenders.
                </p>
              </div>
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

export default PreQualifiedContact;
